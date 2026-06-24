// TerraFarmingDashboard.jsx — Full interactive Terra Farming dashboard
// with clickable video showcase

const { useState, useEffect, useRef } = React;

const T = {
  brownDeep: '#1a0f06', brownMid: '#241608',
  cream: '#f4e9d2', green: '#7ac462',
  tan: '#c9a47a', clay: '#8b5a2b', void: '#0a0502',
  surface: 'rgba(59,36,16,0.5)',
  border: 'rgba(122,196,98,0.2)',
  borderMuted: 'rgba(201,164,122,0.15)',
};

const ROLES = [
  { id: 'farmer', label: 'Farmer', color: T.green },
  { id: 'buyer',  label: 'Buyer',  color: '#60a5fa' },
  { id: 'driver', label: 'Driver', color: '#f59e0b' },
  { id: 'admin',  label: 'Admin',  color: T.tan },
  { id: 'hq',     label: 'HQ',     color: '#a78bfa' },
];

const FEATURES = [
  { id: 'overview',  label: 'Platform Overview', video: 'uploads/mainpage.mp4',             roles: [] },
  { id: 'farmer',    label: 'Farmer Portal',     video: 'uploads/farmer.mp4',               roles: ['farmer'] },
  { id: 'roles',     label: 'Multi-Role',        video: 'uploads/buyer-farmer-driver.mp4',  roles: ['buyer'] },
  { id: 'driver',    label: 'Driver Routes',     video: 'uploads/driver.mp4',               roles: ['driver'] },
  { id: 'admin',     label: 'Admin Panel',       video: 'uploads/admin.mp4',                roles: ['admin', 'hq'] },
  { id: 'market',    label: 'Farm Market',       video: 'uploads/market-farm.mp4',          roles: [] },
  { id: 'checkout',  label: 'Checkout',          video: 'uploads/checkout.mp4',             roles: [] },
];

const NAV_ITEMS = {
  farmer: ['Dashboard', 'My Products', 'Active Orders', 'Deliveries', 'Compliance', 'Revenue'],
  buyer:  ['Dashboard', 'Browse Farms', 'My Orders', 'Track Delivery', 'Subscriptions', 'Invoices'],
  driver: ['Dashboard', 'Route Queue', 'Active Trip', 'Earnings', 'Vehicle', 'History'],
  admin:  ['Dashboard', 'All Users', 'Inventory', 'Commission Engine', 'Reports', 'Settings'],
  hq:     ['Overview', 'Network Map', 'Analytics', 'Compliance', 'Commission', 'Finance'],
};

const STATS = {
  farmer: [{ v: '50+', l: 'Partner Farms' }, { v: '1K+', l: 'Happy Customers' }, { v: '24hr', l: 'Delivery Time' }, { v: '100%', l: 'Organic' }],
  buyer:  [{ v: '38',   l: 'Active Orders' }, { v: '₱12.4K', l: 'Total Spend' }, { v: '4.9', l: 'Avg Rating' }, { v: '3hr', l: 'ETA Today' }],
  driver: [{ v: '7',    l: 'Stops Today' }, { v: '₱820', l: 'Today Earnings' }, { v: '42km', l: 'Route Length' }, { v: '2', l: 'Delivered' }],
  admin:  [{ v: '213',  l: 'Total Users' }, { v: '₱48K', l: 'Weekly GMV' }, { v: '98%', l: 'Fulfillment Rate' }, { v: '12', l: 'Pending Reviews' }],
  hq:     [{ v: '50+',  l: 'Partner Farms' }, { v: '₱280K', l: 'Monthly Revenue' }, { v: '94%', l: 'On-Time Rate' }, { v: '3', l: 'Active Regions' }],
};

const ROWS = {
  farmer: [
    { id: 'TF-0041', item: 'Highland Bok Choy',       qty: '12kg',    buyer: 'Green Grocer PH', status: 'In Transit', sc: '#60a5fa' },
    { id: 'TF-0039', item: 'Native Free-Range Eggs',  qty: '120 pcs', buyer: 'Casa Amara',      status: 'Delivered',  sc: T.green },
    { id: 'TF-0038', item: 'Sweet Potatoes (Benguet)', qty: '25kg',   buyer: 'Metro Mart',      status: 'Processing', sc: T.tan },
    { id: 'TF-0037', item: 'Organic Pechay',           qty: '8kg',    buyer: 'FreshBox PH',     status: 'Delivered',  sc: T.green },
    { id: 'TF-0036', item: 'Sayote (Chayote)',         qty: '18kg',   buyer: 'LBC Grocery',     status: 'In Transit', sc: '#60a5fa' },
  ],
  buyer: [
    { id: 'TF-0041', item: 'Highland Bok Choy 12kg',  qty: '12kg',    buyer: 'Dela Cruz Farm',  status: 'En Route',  sc: '#60a5fa' },
    { id: 'TF-0039', item: 'Native Free-Range Eggs',  qty: '120 pcs', buyer: 'Benguet Poultry', status: 'Complete',  sc: T.green },
    { id: 'TF-0035', item: 'Organic Tomatoes 5kg',    qty: '5kg',     buyer: 'Kabayan Harvest', status: 'Pending',   sc: T.tan },
  ],
  driver: [
    { id: 'STOP 1',  item: 'Dela Cruz Farm → Metro Mart',  qty: '37kg',   buyer: 'La Trinidad', status: 'Complete', sc: T.green },
    { id: 'STOP 2',  item: 'Benguet Poultry → Casa Amara', qty: '120pcs', buyer: 'Baguio City',  status: 'Active',   sc: '#60a5fa' },
    { id: 'STOP 3',  item: 'Kabayan Harvest → FreshBox',   qty: '25kg',   buyer: 'Sto. Tomas',   status: 'Queued',   sc: T.tan },
  ],
  admin: [
    { id: 'USR-203', item: 'Dela Cruz Farm',    qty: 'Farmer', buyer: 'Verified',    status: 'Active', sc: T.green },
    { id: 'USR-204', item: 'Metro Mart Baguio', qty: 'Buyer',  buyer: 'KYC Pending', status: 'Review', sc: '#f59e0b' },
    { id: 'USR-205', item: 'Juan Rivera',       qty: 'Driver', buyer: 'SEC Compliant', status: 'Active', sc: T.green },
    { id: 'USR-206', item: 'FreshBox PH',       qty: 'Buyer',  buyer: 'Verified',    status: 'Active', sc: T.green },
  ],
  hq: [
    { id: 'REG-01', item: 'Benguet Province', qty: '23 farms', buyer: '₱124K revenue', status: 'Growing',    sc: T.green },
    { id: 'REG-02', item: 'Mt. Province',     qty: '12 farms', buyer: '₱68K revenue',  status: 'Stable',     sc: '#60a5fa' },
    { id: 'REG-03', item: 'Ifugao',           qty: '8 farms',  buyer: '₱41K revenue',  status: 'Onboarding', sc: T.tan },
  ],
};

const TITLES = {
  farmer: 'Farmer Dashboard', buyer: 'Buyer Dashboard',
  driver: 'Driver Dashboard', admin: 'Admin Panel', hq: 'HQ Overview',
};
const SUBTITLES = {
  farmer: 'Highland Benguet · Dela Cruz Farm',
  buyer:  'Metro Mart Baguio · Account #MB-042',
  driver: 'Juan Rivera · Route 7 — La Trinidad → Baguio',
  admin:  'Platform Admin · All Regions',
  hq:     'Headquarters · Nationwide View',
};

/* ── Video Lightbox ─────────────────────────────── */
function VideoModal({ feat, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(2,5,2,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(92vw, 1100px)',
          display: 'flex', flexDirection: 'column', gap: 0,
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(122,196,98,0.25)',
          boxShadow: '0 0 80px rgba(122,196,98,0.12), 0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px',
          background: T.brownDeep,
          borderBottom: '1px solid rgba(201,164,122,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="assets/logos/terra-logo.png" alt="Terra" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: '0.65rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', color: T.green,
            }}>Terra Farming</span>
            <span style={{
              fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: T.clay,
            }}>— {feat.label}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(139,90,43,0.3)', border: '1px solid rgba(201,164,122,0.2)',
              color: T.tan, fontSize: 15, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          >×</button>
        </div>
        {/* Video */}
        <div style={{ background: '#000', aspectRatio: '16/9' }}>
          <video
            ref={videoRef}
            src={feat.video}
            autoPlay
            controls
            playsInline
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Feature strip card ─────────────────────────── */
function FeatureCard({ feat, isActive, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
        padding: '5px 11px 5px 7px', borderRadius: 8, cursor: 'pointer',
        background: isActive || hov ? 'rgba(122,196,98,0.12)' : 'rgba(59,36,16,0.5)',
        border: `1px solid ${isActive ? 'rgba(122,196,98,0.4)' : hov ? 'rgba(122,196,98,0.2)' : 'rgba(201,164,122,0.12)'}`,
        transition: 'all 0.15s',
      }}
    >
      {/* Play button circle */}
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: isActive ? T.green : hov ? 'rgba(122,196,98,0.3)' : 'rgba(139,90,43,0.4)',
        border: `1px solid ${isActive ? T.green : 'rgba(122,196,98,0.25)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}>
        <span style={{
          fontSize: 7, marginLeft: 1,
          color: isActive ? T.void : T.green,
        }}>▶</span>
      </div>
      <span style={{
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: '0.72rem', fontWeight: isActive ? 600 : 400,
        color: isActive ? T.green : hov ? T.cream : T.tan,
        whiteSpace: 'nowrap', transition: 'all 0.15s',
      }}>{feat.label}</span>
    </button>
  );
}

/* ── Main Component ─────────────────────────────── */
function TerraFarmingDashboard() {
  const [activeRole, setActiveRole] = useState('farmer');
  const [activeNav,  setActiveNav]  = useState(0);
  const [modalFeat,  setModalFeat]  = useState(null);

  const role     = ROLES.find(r => r.id === activeRole);
  const navItems = NAV_ITEMS[activeRole];
  const stats    = STATS[activeRole];
  const rows     = ROWS[activeRole];

  // Which feature card is highlighted for this role
  const activeFeatId = FEATURES.find(f => f.roles.includes(activeRole))?.id ?? null;

  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
    setActiveNav(0);
    // Auto-open the video for this role
    const feat = FEATURES.find(f => f.roles.includes(roleId));
    if (feat) setModalFeat(feat);
  };

  return (
    <>
      {modalFeat && <VideoModal feat={modalFeat} onClose={() => setModalFeat(null)} />}

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: T.void, fontFamily: "'Geist', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>

        {/* ── Topbar ─────────────────────────────── */}
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: T.brownDeep, borderBottom: `1px solid ${T.borderMuted}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="assets/logos/terra-logo.png" alt="Terra" style={{ width: 26, height: 26, objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontWeight: 800, color: T.cream, fontSize: '0.9rem' }}>
              Terra <span style={{ color: T.green }}>Farming</span>
            </span>
          </div>

          {/* Role switcher */}
          <div style={{ display: 'flex', gap: 3, background: 'rgba(59,36,16,0.6)', borderRadius: 8, padding: 3, border: `1px solid ${T.borderMuted}` }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => handleRoleChange(r.id)} style={{
                padding: '5px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', fontWeight: 600, fontFamily: "'Geist', system-ui, sans-serif",
                background: activeRole === r.id ? r.color : 'transparent',
                color: activeRole === r.id ? '#0a0502' : T.tan,
                transition: 'all 0.15s',
              }}>
                {r.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.green, boxShadow: `0 0 8px ${T.green}` }}></div>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: T.tan, textTransform: 'uppercase' }}>Live</span>
          </div>
        </div>

        {/* ── Body ───────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Sidebar */}
          <div style={{ width: 188, flexShrink: 0, background: T.brownDeep, borderRight: `1px solid ${T.borderMuted}`, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.clay, padding: '0 14px 10px' }}>
              {role.label} Menu
            </div>
            {navItems.map((item, i) => (
              <div key={item} onClick={() => setActiveNav(i)} style={{
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                background: i === activeNav ? 'rgba(122,196,98,0.12)' : 'transparent',
                color: i === activeNav ? T.green : T.tan,
                fontSize: '0.8rem', fontWeight: i === activeNav ? 600 : 400,
                borderLeft: i === activeNav ? `2px solid ${T.green}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {item}
              </div>
            ))}

            {/* Video CTA in sidebar */}
            <div style={{ marginTop: 'auto', padding: '12px 8px 0' }}>
              <button
                onClick={() => {
                  const feat = FEATURES.find(f => f.roles.includes(activeRole)) || FEATURES[0];
                  setModalFeat(feat);
                }}
                style={{
                  width: '100%', padding: '8px 0', borderRadius: 8, cursor: 'pointer',
                  background: 'rgba(122,196,98,0.1)', border: '1px solid rgba(122,196,98,0.25)',
                  color: T.green, fontSize: '0.72rem', fontWeight: 600,
                  fontFamily: "'Geist', system-ui, sans-serif",
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 9 }}>▶</span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── Feature Video Strip ──────────────── */}
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.clay, marginBottom: 8 }}>
                Feature Demos — click to watch
              </div>
              <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
                <div style={{ display: 'flex', gap: 6, minWidth: 'min-content' }}>
                  {FEATURES.map(feat => (
                    <FeatureCard
                      key={feat.id}
                      feat={feat}
                      isActive={feat.id === activeFeatId}
                      onClick={() => setModalFeat(feat)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Header */}
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.green, marginBottom: 4 }}>
                Case Study · Agriculture Intelligence
              </div>
              <h2 style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontSize: '1.5rem', fontWeight: 800, color: T.cream, lineHeight: 1.1, margin: 0 }}>
                {TITLES[activeRole]}
              </h2>
              <div style={{ fontSize: '0.8rem', color: T.tan, marginTop: 4 }}>{SUBTITLES[activeRole]}</div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 12 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ flex: 1, background: 'rgba(59,36,16,0.4)', border: `1px solid ${T.borderMuted}`, borderRadius: 12, padding: '14px 18px' }}>
                  <div style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontSize: '1.6rem', fontWeight: 800, color: i === 0 ? role.color : T.cream, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.tan, marginTop: 5 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div style={{ background: 'rgba(59,36,16,0.3)', border: `1px solid ${T.borderMuted}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: `1px solid ${T.borderMuted}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontWeight: 700, color: T.cream, fontSize: '0.88rem' }}>{navItems[activeNav]}</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 9999, background: `${role.color}18`, color: role.color, border: `1px solid ${role.color}40` }}>
                  {rows.length} records
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.borderMuted}` }}>
                    {['ID', 'Item', 'Qty / Type', 'Details', 'Status'].map(h => (
                      <th key={h} style={{ padding: '9px 18px', textAlign: 'left', fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.clay, fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid rgba(201,164,122,0.08)` : 'none' }}>
                      <td style={{ padding: '11px 18px', fontFamily: "'Geist Mono', monospace", fontSize: 11, color: T.tan }}>{row.id}</td>
                      <td style={{ padding: '11px 18px', fontSize: '0.8rem', color: T.cream, fontWeight: 500 }}>{row.item}</td>
                      <td style={{ padding: '11px 18px', fontSize: '0.78rem', color: T.tan }}>{row.qty}</td>
                      <td style={{ padding: '11px 18px', fontSize: '0.78rem', color: T.tan }}>{row.buyer}</td>
                      <td style={{ padding: '11px 18px' }}>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 9999, background: `${row.sc}18`, color: row.sc, border: `1px solid ${row.sc}40` }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tag strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['100% Organic', 'Same-Day Delivery', 'Quality Guaranteed', 'Real-Time Tracking', 'DA Registered', 'SEC Compliant', 'KYC Verified'].map(tag => (
                <span key={tag} style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 9999, background: `${T.green}10`, color: T.green, border: `1px solid ${T.green}30` }}>{tag}</span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

window.TerraFarmingDashboard = TerraFarmingDashboard;
