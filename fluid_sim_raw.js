(function () {

  // Respect reduced-motion before any WebGL init
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ── Config ────────────────────────────────────────────────────────────────
  const CONFIG = {
    SIM_RESOLUTION:       128,
    DYE_RESOLUTION:       1440,
    CAPTURE_RESOLUTION:   512,
    DENSITY_DISSIPATION:  4.5,    // higher = gold wisps fade faster
    VELOCITY_DISSIPATION: 2.2,
    PRESSURE:             0.1,
    PRESSURE_ITERATIONS:  20,
    CURL:                 2,      // reduced for elegant, not chaotic, swirl
    SPLAT_RADIUS:         0.18,
    SPLAT_FORCE:          6000,
    SHADING:              true,
    COLOR_UPDATE_SPEED:   0,      // no color cycling — we use a fixed gold
    RAINBOW_MODE:         false,
    COLOR:                '#C9A84C', // TTS gold
    BACK_COLOR:           { r: 0.008, g: 0.043, b: 0.094 }, // #020B18
    TRANSPARENT:          true,
    PAUSED:               false,
  };

  // ── Canvas & WebGL context ────────────────────────────────────────────────
  const canvas = document.getElementById('fluid-canvas');

  function getWebGLContext(canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    if (!gl) return null;

    let halfFloat, supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);

    function getSupportedFormat(internalFormat, format, type) {
      if (!supportRenderTextureFormat(internalFormat, format, type)) {
        if (internalFormat === gl.R16F)   return getSupportedFormat(gl.RG16F,   gl.RG,   type);
        if (internalFormat === gl.RG16F)  return getSupportedFormat(gl.RGBA16F, gl.RGBA,  type);
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(internalFormat, format, type) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    let formatRGBA, formatRG, formatR;
    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG   = getSupportedFormat(gl.RG16F,   gl.RG,   halfFloatTexType);
      formatR    = getSupportedFormat(gl.R16F,    gl.RED,  halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG   = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR    = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
  }

  const ctx = getWebGLContext(canvas);
  if (!ctx) return; // WebGL not supported — graceful degradation

  const { gl, ext } = ctx;
  if (!ext.supportLinearFiltering) {
    CONFIG.DYE_RESOLUTION = 256;
    CONFIG.SHADING = false;
  }

  // ── Shader utilities ──────────────────────────────────────────────────────
  function compileShader(type, source, keywords) {
    if (keywords) source = keywords.map(k => '#define ' + k + '\n').join('') + source;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function createProgram(vs, fs) {
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    return prog;
  }

  function getUniforms(prog) {
    const u = {};
    const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(prog, i).name;
      u[name] = gl.getUniformLocation(prog, name);
    }
    return u;
  }

  // ── Shader sources ────────────────────────────────────────────────────────
  const baseVS = compileShader(gl.VERTEX_SHADER, `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
    uniform vec2 texelSize;
    void main(){
      vUv=aPosition*0.5+0.5;
      vL=vUv-vec2(texelSize.x,0.0); vR=vUv+vec2(texelSize.x,0.0);
      vT=vUv+vec2(0.0,texelSize.y); vB=vUv-vec2(0.0,texelSize.y);
      gl_Position=vec4(aPosition,0.0,1.0);
    }`);

  const copyFS    = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main(){gl_FragColor=texture2D(uTexture,vUv);}`);
  const clearFS   = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main(){gl_FragColor=value*texture2D(uTexture,vUv);}`);
  const splatFS   = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio;
    uniform vec3 color; uniform vec2 point; uniform float radius;
    void main(){
      vec2 p=vUv-point.xy; p.x*=aspectRatio;
      vec3 splat=exp(-dot(p,p)/radius)*color;
      vec3 base=texture2D(uTarget,vUv).xyz;
      gl_FragColor=vec4(base+splat,1.0);
    }`);

  const advectionFS = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource;
    uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation;
    vec4 bilerp(sampler2D sam,vec2 uv,vec2 tsize){
      vec2 st=uv/tsize-0.5; vec2 iuv=floor(st); vec2 fuv=fract(st);
      vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize);
      vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);
      vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize);
      vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);
      return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);
    }
    void main(){
      #ifdef MANUAL_FILTERING
        vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
        vec4 result=bilerp(uSource,coord,dyeTexelSize);
      #else
        vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;
        vec4 result=texture2D(uSource,coord);
      #endif
      float decay=1.0+dissipation*dt;
      gl_FragColor=result/decay;
    }`, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

  const divergenceFS = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity;
    void main(){
      float L=texture2D(uVelocity,vL).x, R=texture2D(uVelocity,vR).x;
      float T=texture2D(uVelocity,vT).y, B=texture2D(uVelocity,vB).y;
      vec2 C=texture2D(uVelocity,vUv).xy;
      if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x;
      if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y;
      gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);
    }`);

  const curlFS = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity;
    void main(){
      float L=texture2D(uVelocity,vL).y, R=texture2D(uVelocity,vR).y;
      float T=texture2D(uVelocity,vT).x, B=texture2D(uVelocity,vB).x;
      gl_FragColor=vec4(0.5*(R-L-T+B),0.0,0.0,1.0);
    }`);

  const vorticityFS = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity,uCurl;
    uniform float curl,dt;
    void main(){
      float L=texture2D(uCurl,vL).x, R=texture2D(uCurl,vR).x;
      float T=texture2D(uCurl,vT).x, B=texture2D(uCurl,vB).x;
      float C=texture2D(uCurl,vUv).x;
      vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
      force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0;
      vec2 vel=texture2D(uVelocity,vUv).xy;
      vel+=force*dt; vel=min(max(vel,-1000.0),1000.0);
      gl_FragColor=vec4(vel,0.0,1.0);
    }`);

  const pressureFS = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uDivergence;
    void main(){
      float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
      float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
      float div=texture2D(uDivergence,vUv).x;
      gl_FragColor=vec4((L+R+B+T-div)*0.25,0.0,0.0,1.0);
    }`);

  const gradSubFS = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uVelocity;
    void main(){
      float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
      float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
      vec2 vel=texture2D(uVelocity,vUv).xy;
      vel.xy-=vec2(R-L,T-B);
      gl_FragColor=vec4(vel,0.0,1.0);
    }`);

  const displayFSSource = `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uTexture;
    uniform vec2 texelSize;
    vec3 linearToGamma(vec3 c){ c=max(c,vec3(0.0)); return max(1.055*pow(c,vec3(0.416666667))-0.055,vec3(0.0)); }
    void main(){
      vec3 c=texture2D(uTexture,vUv).rgb;
      #ifdef SHADING
        vec3 lc=texture2D(uTexture,vL).rgb, rc=texture2D(uTexture,vR).rgb;
        vec3 tc=texture2D(uTexture,vT).rgb, bc=texture2D(uTexture,vB).rgb;
        float dx=length(rc)-length(lc), dy=length(tc)-length(bc);
        vec3 n=normalize(vec3(dx,dy,length(texelSize)));
        float diffuse=clamp(dot(n,vec3(0.0,0.0,1.0))+0.7,0.7,1.0);
        c*=diffuse;
      #endif
      float a=max(c.r,max(c.g,c.b));
      gl_FragColor=vec4(c,a);
    }`;

  // ── Program wrappers ──────────────────────────────────────────────────────
  function makeProgram(vs, fs) {
    const prog = createProgram(vs, fs);
    return { prog, uniforms: getUniforms(prog), bind() { gl.useProgram(this.prog); } };
  }

  // Material (supports keyword-based shader variants)
  function makeMaterial(vs, fsSource) {
    const programs = {};
    let activeProgram = null;
    let uniforms = {};
    return {
      setKeywords(keywords) {
        const hash = keywords.reduce((h, k) => { for (let i = 0; i < k.length; i++) { h = (h << 5) - h + k.charCodeAt(i); h |= 0; } return h; }, 0);
        if (!programs[hash]) {
          programs[hash] = createProgram(vs, compileShader(gl.FRAGMENT_SHADER, fsSource, keywords));
        }
        if (programs[hash] !== activeProgram) {
          uniforms = getUniforms(programs[hash]);
          activeProgram = programs[hash];
        }
      },
      bind() { gl.useProgram(activeProgram); },
      uniforms,
      get u() { return uniforms; }
    };
  }

  const copyProg    = makeProgram(baseVS, copyFS);
  const clearProg   = makeProgram(baseVS, clearFS);
  const splatProg   = makeProgram(baseVS, splatFS);
  const advProg     = makeProgram(baseVS, advectionFS);
  const divProg     = makeProgram(baseVS, divergenceFS);
  const curlProg    = makeProgram(baseVS, curlFS);
  const vortProg    = makeProgram(baseVS, vorticityFS);
  const pressProg   = makeProgram(baseVS, pressureFS);
  const gradSubProg = makeProgram(baseVS, gradSubFS);
  const displayMat  = makeMaterial(baseVS, displayFSSource);

  // ── Blit (full-screen quad) ───────────────────────────────────────────────
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  function blit(target, clear) {
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    if (clear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  // ── FBO helpers ───────────────────────────────────────────────────────────
  function createFBO(w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return {
      texture, fbo, width: w, height: h,
      texelSizeX: 1/w, texelSizeY: 1/h,
      attach(id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; }
    };
  }

  function createDoubleFBO(w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
      get read()  { return fbo1; }, set read(v)  { fbo1 = v; },
      get write() { return fbo2; }, set write(v) { fbo2 = v; },
      swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; }
    };
  }

  function resizeFBO(target, w, h, internalFormat, format, type, param) {
    const newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProg.bind();
    gl.uniform1i(copyProg.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
  }

  function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
    if (target.width === w && target.height === h) return target;
    target.read  = resizeFBO(target.read,  w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w; target.height = h;
    target.texelSizeX = 1/w; target.texelSizeY = 1/h;
    return target;
  }

  function getResolution(res) {
    let ar = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (ar < 1) ar = 1 / ar;
    const min = Math.round(res);
    const max = Math.round(res * ar);
    return gl.drawingBufferWidth > gl.drawingBufferHeight
      ? { width: max, height: min }
      : { width: min, height: max };
  }

  // ── FBOs ──────────────────────────────────────────────────────────────────
  let dye, velocity, divergence, curlFBO, pressure;

  function initFramebuffers() {
    const simRes  = getResolution(CONFIG.SIM_RESOLUTION);
    const dyeRes  = getResolution(CONFIG.DYE_RESOLUTION);
    const texType = ext.halfFloatTexType;
    const rgba    = ext.formatRGBA;
    const rg      = ext.formatRG;
    const r       = ext.formatR;
    const filter  = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    dye = dye
      ? resizeDoubleFBO(dye,      dyeRes.width,  dyeRes.height,  rgba.internalFormat, rgba.format, texType, filter)
      : createDoubleFBO(           dyeRes.width,  dyeRes.height,  rgba.internalFormat, rgba.format, texType, filter);

    velocity = velocity
      ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filter)
      : createDoubleFBO(           simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filter);

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curlFBO    = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure   = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
  }

  // ── Display material keywords ─────────────────────────────────────────────
  displayMat.setKeywords(CONFIG.SHADING ? ['SHADING'] : []);
  initFramebuffers();

  // ── Color helpers ─────────────────────────────────────────────────────────
  function hexToRGB(hex) {
    let v = hex.replace('#', '');
    if (v.length === 3) v = v[0]+v[0]+v[1]+v[1]+v[2]+v[2];
    return {
      r: (parseInt(v.slice(0,2),16)/255) * 0.15,
      g: (parseInt(v.slice(2,4),16)/255) * 0.15,
      b: (parseInt(v.slice(4,6),16)/255) * 0.15
    };
  }

  function generateColor() {
    return hexToRGB(CONFIG.COLOR);
  }

  // ── Pointer data ──────────────────────────────────────────────────────────
  const pointer = {
    id: -1, texcoordX: 0, texcoordY: 0,
    prevTexcoordX: 0, prevTexcoordY: 0,
    deltaX: 0, deltaY: 0,
    down: false, moved: false,
    color: generateColor()
  };

  const dpr = window.devicePixelRatio || 1;
  function scale(n) { return Math.floor(n * dpr); }

  function resizeCanvas() {
    const w = scale(canvas.clientWidth);
    const h = scale(canvas.clientHeight);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h; return true;
    }
    return false;
  }

  function correctDeltaX(dx) {
    const ar = canvas.width / canvas.height;
    return ar < 1 ? dx * ar : dx;
  }
  function correctDeltaY(dy) {
    const ar = canvas.width / canvas.height;
    return ar > 1 ? dy / ar : dy;
  }
  function correctRadius(r) {
    const ar = canvas.width / canvas.height;
    return ar > 1 ? r * ar : r;
  }

  // ── Splat ─────────────────────────────────────────────────────────────────
  function splat(x, y, dx, dy, color) {
    splatProg.bind();
    gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProg.uniforms.point, x, y);
    gl.uniform3f(splatProg.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProg.uniforms.radius, correctRadius(CONFIG.SPLAT_RADIUS / 100));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  function splatPointer(p) {
    splat(p.texcoordX, p.texcoordY,
          p.deltaX * CONFIG.SPLAT_FORCE,
          p.deltaY * CONFIG.SPLAT_FORCE,
          p.color);
  }

  function clickSplat(p) {
    const c = generateColor();
    c.r *= 10; c.g *= 10; c.b *= 10;
    splat(p.texcoordX, p.texcoordY,
          10 * (Math.random() - 0.5),
          30 * (Math.random() - 0.5), c);
  }

  // ── Simulation step ───────────────────────────────────────────────────────
  function step(dt) {
    gl.disable(gl.BLEND);

    curlProg.bind();
    gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
    blit(curlFBO);

    vortProg.bind();
    gl.uniform2f(vortProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vortProg.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vortProg.uniforms.uCurl,     curlFBO.attach(1));
    gl.uniform1f(vortProg.uniforms.curl,      CONFIG.CURL);
    gl.uniform1f(vortProg.uniforms.dt,        dt);
    blit(velocity.write); velocity.swap();

    divProg.bind();
    gl.uniform2f(divProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divProg.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProg.bind();
    gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProg.uniforms.value,    CONFIG.PRESSURE);
    blit(pressure.write); pressure.swap();

    pressProg.bind();
    gl.uniform2f(pressProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressProg.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressProg.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write); pressure.swap();
    }

    gradSubProg.bind();
    gl.uniform2f(gradSubProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradSubProg.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradSubProg.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write); velocity.swap();

    advProg.bind();
    gl.uniform2f(advProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering)
      gl.uniform2f(advProg.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    const velId = velocity.read.attach(0);
    gl.uniform1i(advProg.uniforms.uVelocity, velId);
    gl.uniform1i(advProg.uniforms.uSource,   velId);
    gl.uniform1f(advProg.uniforms.dt,        dt);
    gl.uniform1f(advProg.uniforms.dissipation, CONFIG.VELOCITY_DISSIPATION);
    blit(velocity.write); velocity.swap();

    if (!ext.supportLinearFiltering)
      gl.uniform2f(advProg.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advProg.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advProg.uniforms.uSource,   dye.read.attach(1));
    gl.uniform1f(advProg.uniforms.dissipation, CONFIG.DENSITY_DISSIPATION);
    blit(dye.write); dye.swap();
  }

  function render() {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
    displayMat.bind();
    if (CONFIG.SHADING) gl.uniform2f(displayMat.u.texelSize, 1/w, 1/h);
    gl.uniform1i(displayMat.u.uTexture, dye.read.attach(0));
    blit(null);
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  let lastTime = Date.now();
  let rafId;

  function loop() {
    rafId = requestAnimationFrame(loop);
    const now = Date.now();
    const dt  = Math.min((now - lastTime) / 1000, 0.016666);
    lastTime  = now;

    if (resizeCanvas()) initFramebuffers();

    if (pointer.moved) {
      pointer.moved = false;
      splatPointer(pointer);
    }

    step(dt);
    render();
  }

  loop();

  // ── Input handlers ────────────────────────────────────────────────────────
  function updateMove(posX, posY) {
    const prev = { x: pointer.texcoordX, y: pointer.texcoordY };
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - prev.x);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - prev.y);
    pointer.moved  = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  }

  let firstMove = false;

  function onMouseMove(e) {
    if (!firstMove) {
      pointer.texcoordX = scale(e.clientX) / canvas.width;
      pointer.texcoordY = 1 - scale(e.clientY) / canvas.height;
      firstMove = true;
    }
    updateMove(scale(e.clientX), scale(e.clientY));
  }

  function onMouseDown(e) {
    pointer.texcoordX = scale(e.clientX) / canvas.width;
    pointer.texcoordY = 1 - scale(e.clientY) / canvas.height;
    pointer.color = generateColor();
    clickSplat(pointer);
  }

  function onTouchStart(e) {
    const t = e.targetTouches[0];
    pointer.texcoordX = scale(t.clientX) / canvas.width;
    pointer.texcoordY = 1 - scale(t.clientY) / canvas.height;
    pointer.color = generateColor();
    clickSplat(pointer);
  }

  function onTouchMove(e) {
    const t = e.targetTouches[0];
    updateMove(scale(t.clientX), scale(t.clientY));
  }

  window.addEventListener('mousemove',  onMouseMove, { passive: true });
  window.addEventListener('mousedown',  onMouseDown, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove',  onTouchMove,  { passive: true });

  // ── Visibility API: pause when tab is hidden ──────────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      lastTime = Date.now();
      loop();
    }
  });

})();