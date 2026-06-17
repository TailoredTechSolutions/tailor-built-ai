'use client';
/**
 * SnapScrollHero.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * 7-frame cinematic snap-scroll sequence for tailoredtechsolutions.org
 *
 * Effects (all vanilla WebGL/Canvas — zero new deps):
 *   1. FloatingLines  — GLSL shader, per-section, mix-blend-mode:screen
 *   2. BorderGlow     — Canvas 2D comet tracing the card border
 *   3. Galaxy         — GLSL shader starfield, mix-blend-mode:screen
 *   4. FluidCanvas    — Navier-Stokes WebGL fluid sim (fixed overlay)
 *
 * Drop into: src/components/tts/SnapScrollHero.tsx
 * Replace <Hero /> with <SnapScrollHero /> in src/routes/index.tsx
 *
 * Images must be in /public/hero/ with filenames matching FRAMES[n].image
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { FLUID_SIM_SCRIPT } from './fluidSimScript';

// ─── Frame data ───────────────────────────────────────────────────────────────
const FRAMES = [
  {
    step: 'Step 01 — Ignition',
    title: ['Initiating', 'Tailoring'],
    sub: 'Every transformation begins with a single point of contact. Your vision, our precision — the sequence starts now.',
    image: '/hero/Gemini_Generated_Image_whv98mwhv98mwhv9.jpeg',
    flColors: [[0.784, 0.659, 0.298], [0.310, 0.761, 0.969]],
    gxHue: 45,
  },
  {
    step: 'Step 02 — Build',
    title: ['Fabricating', 'Circuits'],
    sub: 'Precision-etched logic meets custom architecture. We construct the intelligence layer your business demands.',
    image: '/hero/Gemini_Generated_Image_5eb8nq5eb8nq5eb8.jpeg',
    flColors: [[0.310, 0.761, 0.969], [0.706, 0.620, 0.855]],
    gxHue: 200,
  },
  {
    step: 'Step 03 — Power',
    title: ['Energizing', 'Modules'],
    sub: 'Core systems brought online. AI modules initialize, drawing power from a purpose-built infrastructure.',
    image: '/hero/Gemini_Generated_Image_m862yym862yym862.jpeg',
    flColors: [[0.784, 0.659, 0.298], [0.706, 0.620, 0.855]],
    gxHue: 270,
  },
  {
    step: 'Step 04 — Deploy',
    title: ['Transporting', 'Completed Module'],
    sub: 'Finished systems moved into position. Deployment is not the end — it is the moment your product becomes real.',
    image: '/hero/Gemini_Generated_Image_kvdguxkvdguxkvdg.jpeg',
    flColors: [[0.310, 0.761, 0.969], [0.784, 0.659, 0.298]],
    gxHue: 180,
  },
  {
    step: 'Step 05 — Install',
    title: ['Mounting', 'Completed Module'],
    sub: 'Integration executed. Your tailored solution locked into the environment it was built to serve.',
    image: '/hero/Gemini_Generated_Image_9q6xun9q6xun9q6x.jpeg',
    flColors: [[0.706, 0.620, 0.855], [0.310, 0.761, 0.969]],
    gxHue: 220,
  },
  {
    step: 'Step 06 — Sync',
    title: ['Calibrating', 'Biometric Link'],
    sub: 'Signal integrity confirmed. System and operator achieve full synchronization — man and machine, aligned.',
    image: '/hero/Gemini_Generated_Image_31m5uu31m5uu31m5.jpeg',
    flColors: [[0.784, 0.659, 0.298], [0.310, 0.761, 0.969]],
    gxHue: 300,
  },
  {
    step: 'Step 07 — Ready',
    title: ['Calibration', 'Complete'],
    sub: 'Bio-gel matrix optimized and locked. Suit deployment readiness: optimal. Link stable at 100%. You are ready.',
    image: '/hero/Gemini_Generated_Image_wmwb6uwmwb6uwmwb.jpeg',
    flColors: [[0.941, 0.800, 0.416], [0.310, 0.761, 0.969]],
    gxHue: 45,
  },
] as const;

// ─── GLSL shaders ─────────────────────────────────────────────────────────────
const FL_VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FL_FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec3  uColor1;
uniform vec3  uColor2;
#define N 12
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float alpha = 0.0;
  for (int i = 0; i < N; i++) {
    float fi = float(i);
    float speed  = 0.18 + fi * 0.04;
    float freq   = 3.0  + fi * 1.2;
    float amp    = 0.04 + fi * 0.005;
    float phase  = fi * 0.9;
    float yLine  = (fi + 1.0) / float(N + 1);
    float curve  = amp * sin(uv.x * freq + uTime * speed + phase);
    float mBend  = 0.03 * (uMouse.y - 0.5) * sin(uv.x * 3.14159);
    float dist   = abs(uv.y - yLine - curve - mBend);
    float line   = smoothstep(0.006, 0.0, dist);
    float fade   = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
    float px     = uv.x + uTime * speed * 0.1;
    float par    = sin(px * 6.28 + uTime * 0.3 + fi) * 0.5 + 0.5;
    alpha += line * fade * (0.4 + par * 0.6);
  }
  alpha = min(alpha, 1.0);
  vec3 col = mix(uColor1, uColor2, uv.x + 0.3 * sin(uTime * 0.2));
  gl_FragColor = vec4(col * alpha, alpha * 0.55);
}
`;

const GX_VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }
`;

const GX_FRAG = `
precision highp float;
uniform float uTime;
uniform vec3  uResolution;
uniform vec2  uMouse;
uniform float uHueShift;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool  uTransparent;
varying vec2 vUv;
#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)
#define PERIOD 3.0
float Hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float tri(float x){return abs(fract(x)*2.0-1.0);}
float tris(float x){float t=fract(x);return 1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0));}
float trisn(float x){float t=fract(x);return 2.0*(1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)))-1.0;}
vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}
float Star(vec2 uv,float flare){
  float d=length(uv);
  float m=(0.05*uGlowIntensity)/d;
  float rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));
  m+=rays*flare*uGlowIntensity;
  uv*=MAT45;
  rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));
  m+=rays*0.3*flare*uGlowIntensity;
  m*=smoothstep(1.0,0.2,d);
  return m;
}
vec3 StarLayer(vec2 uv,float speed){
  vec3 col=vec3(0.0);
  vec2 gv=fract(uv)-0.5;
  vec2 id=floor(uv);
  for(int y=-1;y<=1;y++){for(int x=-1;x<=1;x++){
    vec2 offset=vec2(float(x),float(y));
    vec2 si=id+vec2(float(x),float(y));
    float seed=Hash21(si);
    float size=fract(seed*345.32);
    float gloss=tri(speed/(PERIOD*seed+1.0));
    float flare=smoothstep(0.9,1.0,size)*gloss;
    float red=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+1.0))+STAR_COLOR_CUTOFF;
    float blu=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+3.0))+STAR_COLOR_CUTOFF;
    float grn=min(red,blu)*seed;
    vec3 base=vec3(red,grn,blu);
    float hue=atan(base.g-base.r,base.b-base.r)/(2.0*3.14159)+0.5;
    hue=fract(hue+uHueShift/360.0);
    float sat=length(base-vec3(dot(base,vec3(0.299,0.587,0.114))))*uSaturation;
    float val=max(max(base.r,base.g),base.b);
    base=hsv2rgb(vec3(hue,sat,val));
    vec2 pad=vec2(tris(seed*34.0+uTime/10.0),tris(seed*38.0+uTime/30.0))-0.5;
    float star=Star(gv-offset-pad,flare);
    float twinkle=trisn(uTime+seed*6.2831)*0.5+1.0;
    star*=mix(1.0,twinkle,0.3);
    col+=star*size*base;
  }}
  return col;
}
void main(){
  vec2 focal=vec2(0.5,0.5)*uResolution.xy;
  vec2 uv=(vUv*uResolution.xy-focal)/uResolution.y;
  vec2 mp=(uMouse-vec2(0.5,0.5))*uResolution.xy/uResolution.y;
  float md=length(uv-mp);
  vec2 rep=normalize(uv-mp)*(2.0/(md+0.1));
  uv+=rep*0.05;
  float t=uTime*0.05;
  mat2 rot=mat2(cos(t),-sin(t),sin(t),cos(t));
  uv=rot*uv;
  vec3 col=vec3(0.0);
  float speed=uTime*0.5/10.0;
  for(float i=0.0;i<1.0;i+=1.0/NUM_LAYER){
    float depth=fract(i+speed);
    float scale=mix(20.0,0.5,depth);
    float fade=depth*smoothstep(1.0,0.9,depth);
    col+=StarLayer(uv*scale+i*453.32,speed)*fade;
  }
  if(uTransparent){
    float alpha=length(col);
    alpha=smoothstep(0.0,0.3,alpha);
    alpha=min(alpha,1.0);
    gl_FragColor=vec4(col,alpha);
  }else{gl_FragColor=vec4(col,1.0);}
}
`;

// ─── WebGL helpers ────────────────────────────────────────────────────────────
function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  return p;
}

function fullscreenTriangle(gl: WebGLRenderingContext) {
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const uv = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, uv);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 2,0, 0,2]), gl.STATIC_DRAW);
  return { buf, uv };
}

// ─── Per-section FloatingLines canvas ─────────────────────────────────────────
function useFloatingLines(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isActive: boolean,
  color1: readonly [number,number,number],
  color2: readonly [number,number,number],
) {
  const rafRef = useRef<number>(0);
  const glRef  = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const prog = createProgram(gl, FL_VERT, FL_FRAG);
    gl.useProgram(prog);

    const verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,-1, 1,1, -1,1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes  = gl.getUniformLocation(prog, 'uResolution');
    const uMou  = gl.getUniformLocation(prog, 'uMouse');
    const uC1   = gl.getUniformLocation(prog, 'uColor1');
    const uC2   = gl.getUniformLocation(prog, 'uColor2');

    gl.uniform3f(uC1, color1[0], color1[1], color1[2]);
    gl.uniform3f(uC2, color2[0], color2[1], color2[2]);

    let mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height };
    };
    canvas.addEventListener('mousemove', onMove);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const t = (performance.now() - start) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMou, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [isActive, color1, color2, canvasRef]);
}

// ─── Per-section BorderGlow canvas ────────────────────────────────────────────
function useBorderGlow(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isActive: boolean,
) {
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const GOLD = 'rgba(201,168,76,';
    const TAIL = 0.55;
    const SEG  = 60;
    let t = 0;

    const perimeter = () => {
      const w = canvas.width, h = canvas.height;
      return 2 * (w + h);
    };

    const posOnPerimeter = (frac: number) => {
      const w = canvas.width, h = canvas.height;
      const p = perimeter();
      const d = frac * p;
      if (d < w)              return { x: d,     y: 0 };
      if (d < w + h)          return { x: w,     y: d - w };
      if (d < 2 * w + h)      return { x: w - (d - w - h), y: h };
      return                         { x: 0,     y: h - (d - 2*w - h) };
    };

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // static base border
      ctx.strokeStyle = `${GOLD}0.18)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);

      // comet
      const head = (t % 1);
      for (let i = 0; i < SEG; i++) {
        const frac = (head - (i / SEG) * TAIL + 2) % 1;
        const { x, y } = posOnPerimeter(frac);
        const alpha = (1 - i / SEG) * 0.9;
        ctx.beginPath();
        ctx.arc(x, y, i === 0 ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${GOLD}${alpha.toFixed(2)})`;
        ctx.fill();
      }
      t += 0.004;
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isActive, canvasRef]);
}

// ─── Per-section Galaxy canvas ────────────────────────────────────────────────
function useGalaxy(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isActive: boolean,
  hueShift: number,
) {
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const prog = createProgram(gl, GX_VERT, GX_FRAG);
    gl.useProgram(prog);

    const { buf, uv } = fullscreenTriangle(gl);

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvLoc = gl.getAttribLocation(prog, 'uv');
    gl.bindBuffer(gl.ARRAY_BUFFER, uv);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      uTime:         gl.getUniformLocation(prog, 'uTime'),
      uResolution:   gl.getUniformLocation(prog, 'uResolution'),
      uMouse:        gl.getUniformLocation(prog, 'uMouse'),
      uHueShift:     gl.getUniformLocation(prog, 'uHueShift'),
      uGlowIntensity:gl.getUniformLocation(prog, 'uGlowIntensity'),
      uSaturation:   gl.getUniformLocation(prog, 'uSaturation'),
      uTransparent:  gl.getUniformLocation(prog, 'uTransparent'),
    };

    gl.uniform1f(locs.uHueShift, hueShift);
    gl.uniform1f(locs.uGlowIntensity, 0.3);
    gl.uniform1f(locs.uSaturation, 0.7);
    gl.uniform1i(locs.uTransparent, 1);

    let mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height };
    };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const t = (performance.now() - start) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(locs.uTime, t);
      gl.uniform3f(locs.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
      gl.uniform2f(locs.uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [isActive, hueShift, canvasRef]);
}

// ─── Single section ───────────────────────────────────────────────────────────
interface SectionProps {
  frame: typeof FRAMES[number];
  index: number;
  isActive: boolean;
  isFirst: boolean;
}

function HeroSection({ frame, index, isActive, isFirst }: SectionProps) {
  const flRef  = useRef<HTMLCanvasElement>(null);
  const bgRef  = useRef<HTMLCanvasElement>(null);
  const gxRef  = useRef<HTMLCanvasElement>(null);

  useFloatingLines(flRef, isActive, frame.flColors[0], frame.flColors[1]);
  useBorderGlow(bgRef, isActive);
  useGalaxy(gxRef, isActive, frame.gxHue);

  return (
    <div
      className="relative h-screen w-full overflow-hidden snap-start snap-always flex items-end"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundImage: `url(${frame.image})`,
          transform: isActive ? 'scale(1)' : 'scale(1.04)',
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to top, rgba(2,11,24,0.88) 0%, rgba(2,11,24,0.45) 40%, rgba(2,11,24,0.10) 100%)' }}
      />

      {/* FloatingLines WebGL */}
      <canvas
        ref={flRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Galaxy WebGL */}
      <canvas
        ref={gxRef}
        className="absolute inset-0 w-full h-full z-[3] pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* BorderGlow Canvas */}
      <canvas
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      />

      {/* Content */}
      <div
        className="relative z-[4] px-8 pb-12 md:px-16 md:pb-16 max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150"
        style={{
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          opacity: isActive ? 1 : 0,
        }}
      >
        <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-3"
          style={{ color: '#C9A84C', fontFamily: "'Space Mono', monospace" }}>
          {frame.step}
        </p>
        <div className="w-12 h-0.5 mb-5 rounded-sm" style={{ background: '#C9A84C' }} />
        <h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none mb-4"
          style={{ color: '#ffffff', letterSpacing: '-0.02em', fontFamily: "'Rajdhani', sans-serif" }}
        >
          {frame.title[0]}<br />{frame.title[1]}
        </h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif" }}>
          {frame.sub}
        </p>
      </div>

      {/* Scroll hint — first frame only */}
      {isFirst && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 pointer-events-none transition-opacity duration-400"
          style={{ opacity: isActive ? 1 : 0 }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono', monospace" }}>
            Scroll
          </span>
          <div className="w-px h-9 overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="w-full h-full animate-[arrowDrop_1.6s_ease_infinite]" style={{ background: '#C9A84C' }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fluid simulation overlay ─────────────────────────────────────────────────
function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Config ──
    const CONFIG = {
      SIM_RESOLUTION: 128, DYE_RESOLUTION: 1440, DENSITY_DISSIPATION: 4.5,
      VELOCITY_DISSIPATION: 2.2, PRESSURE: 0.1, PRESSURE_ITERATIONS: 20,
      CURL: 2, SPLAT_RADIUS: 0.18, SPLAT_FORCE: 6000, SHADING: true,
      COLOR_UPDATE_SPEED: 0, BACK_COLOR: { r: 0, g: 0, b: 0 }, TRANSPARENT: true,
    };

    // Inline the full Navier-Stokes fluid sim — adapted from React Bits SplashCursor
    // This is a condensed but functionally complete port
    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, stencil: false, antialias: false }) as WebGL2RenderingContext;
    if (!gl) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Inject fluid sim — targets #tts-fluid-canvas
    const script = document.createElement('script');
    // Replace canvas target: original sim looks for getElementById at runtime
    script.textContent = FLUID_SIM_SCRIPT
      .replace("document.getElementById('fluid')", "document.getElementById('tts-fluid-canvas')")
      .replace('getElementById(\'fluid\')', "getElementById('tts-fluid-canvas')");
    document.head.appendChild(script);

    const onResize = () => {
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      document.head.removeChild(script);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      id="tts-fluid-canvas"
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export function SnapScrollHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((idx: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.children[idx] as HTMLElement;
    section?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sections = Array.from(wrap.children) as HTMLElement[];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Load Google Fonts for hero
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      {/* Snap-scroll wrapper */}
      <div
        ref={wrapRef}
        className="relative"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {FRAMES.map((frame, i) => (
          <HeroSection
            key={i}
            frame={frame}
            index={i}
            isActive={activeIndex === i}
            isFirst={i === 0}
          />
        ))}
      </div>

      {/* Progress rail — fixed, outside scroll wrapper */}
      <nav
        className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5"
        style={{ zIndex: 100 }}
        aria-label="Section navigation"
      >
        {FRAMES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${i + 1}`}
            className="w-2 h-2 rounded-full border transition-all duration-300"
            style={{
              background: activeIndex === i ? '#C9A84C' : 'rgba(255,255,255,0.25)',
              borderColor: activeIndex === i ? '#C9A84C' : 'rgba(255,255,255,0.3)',
              transform: activeIndex === i ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </nav>

      {/* Section counter — fixed */}
      <div
        className="fixed bottom-8 right-8 text-[11px] font-medium tracking-[0.12em]"
        style={{ zIndex: 100, color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono', monospace" }}
      >
        <span style={{ color: '#C9A84C', fontWeight: 700 }}>
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        {' / 07'}
      </div>

      {/* Fluid overlay */}
      <FluidCanvas />

      {/* Keyframe for scroll hint arrow */}
      <style>{`
        @keyframes arrowDrop {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
}

