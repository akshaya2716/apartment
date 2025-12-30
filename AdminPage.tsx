import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- High-Fidelity Inline SVG Icons ---
const Icons = {
  Om: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10,10-4.47,10-10S17.53,2,12,2ZM15.42,16.5c-1.39,.61-3.15,.88-4.75,.43-1.6-.45-2.85-1.57-3.41-3.04-.1-.28,.04-.58,.32-.68s.58,.04,.68,.32c.44,1.15,1.42,2.02,2.67,2.37,1.25,.35,2.62,.14,3.71-.34,.26-.11,.57,.01,.68,.27s-.01,.57-.27,.68Zm-1.85-4.43c-.22-.16-.3-.46-.14-.68,.54-.76,.85-1.68,.85-2.67,0-2.61-2.12-4.72-4.72-4.72s-4.72,2.11-4.72,4.72c0,.99,.31,1.91,.85,2.67,.16,.22,.1,.52-.14,.68-.22,.16-.52,.1-.68-.14-.68-.95-1.07-2.11-1.07-3.21,0-3.19,2.58-5.77,5.77-5.77s5.77,2.58,5.77,5.77c0,1.1-.39,2.26-1.07,3.21-.16,.24-.46,.3-.68,.14Zm-4.14,2.27c-.28,0-.5-.22-.5-.5,0-.55,.45-1,1-1s1,.45,1,1-.45,1-1,1c-.17,0-.33-.09-.41-.22-.05-.08-.09-.18-.09-.28,0-.28,.22-.5,.5-.5s.5,.22,.5,.5c0,.1-.04,.2-.09,.28-.08,.13-.24,.22-.41,.22Z"/>
    </svg>
  ),
  Building: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M9 21V9l3-4 3 4v12"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 13h.01"/><path d="M15 13h.01"/><path d="M9 17h.01"/><path d="M15 17h.01"/></svg>
  ),
  Loader: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  RotateCcw: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
  ),
  Eye: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  PlusCircle: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
  ),
  Layout: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
  ),
  History: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Check: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ShieldCheck: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Bell: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  Send: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
  )
};

const SUPABASE_URL = "https://rbzwxlfdtrheykgnksfm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiend4bGZkdHJoZXlrZ25rc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzQ1OTgsImV4cCI6MjA3MjMxMDU5OH0.NbrYY9Ou_LFjduCeUcw0QJCz9Q481BkHCG6OekGjNHU";
const MAINTENANCE_AMOUNT = 1200;

const BLOCKS = ["A", "B"] as const;
const FLOORS = [5, 4, 3, 2, 1] as const; 
const FLATS_PER_FLOOR = 8;
const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const MANUAL_MODES = ["Cash", "PhonePe (Direct)", "Google Pay (Direct)", "Bank Transfer"];

type PaymentRecord = {
  id?: string;
  flat_key: string;
  month_key: string;
  status: 'paid' | 'unpaid';
  payment_mode?: string;
  created_at?: string;
  receipt_id?: string;
  amount?: number;
};

type StagedUpdate = {
  status: 'paid' | 'unpaid';
  mode: string | null;
  amount: number;
};

type Notice = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

function generateFlats(): any[] {
  const result: any[] = [];
  BLOCKS.forEach(block => {
    FLOORS.forEach(floor => {
      const flats: string[] = [];
      for (let i = 1; i <= FLATS_PER_FLOOR; i++) {
        flats.push(`${floor}${i.toString().padStart(2, "0")}`);
      }
      result.push({ block, floor, flats });
    });
  });
  return result;
}

const flatsData = generateFlats();

export default function App() {
  const [supabase, setSupabase] = useState<any>(null);
  const [view, setView] = useState<"home" | "admin" | "history" | "manual" | "notices">("home");
  const [block, setBlock] = useState<"A" | "B">("A");
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("12");
  
  const [statusAction, setStatusAction] = useState<"paid" | "unpaid">("unpaid");
  const [selectedToUpdate, setSelectedToUpdate] = useState<{ [key: string]: StagedUpdate }>({});
  const [selectedToUndo, setSelectedToUndo] = useState<string[]>([]);
  
  const [mSelectedFlat, setMSelectedFlat] = useState("");
  const [mSelectedBlock, setMSelectedBlock] = useState<"A" | "B">("A");
  const [unpaidMonths, setUnpaidMonths] = useState<any[]>([]);
  const [stagedManualMonths, setStagedManualMonths] = useState<string[]>([]);
  const [manualMode, setManualMode] = useState("Cash");

  const [notices, setNotices] = useState<Notice[]>([]);
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const [loading, setLoading] = useState(true);
  const [recordsInDb, setRecordsInDb] = useState<{ [key: string]: PaymentRecord }>({});
  const [hoveredInfo, setHoveredInfo] = useState<PaymentRecord | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const [histBlock, setHistBlock] = useState<"A" | "B">("A");
  const [histFlat, setHistFlat] = useState("");
  const [histYear, setHistYear] = useState("2025");
  const [histPayments, setHistPayments] = useState<PaymentRecord[]>([]);
  const [histLoading, setHistLoading] = useState(false);

  const monthKey = `${year}-${month}`;

  const activeBlockSections = useMemo(() => flatsData.filter(s => s.block === block), [block]);
  const totalUnitsCount = useMemo(() => activeBlockSections.length * FLATS_PER_FLOOR, [activeBlockSections]);
  const currentBlockRecords = useMemo(() => Object.values(recordsInDb).filter(r => r.flat_key.startsWith(block)), [recordsInDb, block]);
  const currentBlockPaidCount = currentBlockRecords.filter(r => r.status === 'paid').length;
  const collectionRate = useMemo(() => totalUnitsCount > 0 ? Math.round((currentBlockPaidCount / totalUnitsCount) * 100) : 0, [currentBlockPaidCount, totalUnitsCount]);

  useEffect(() => {
    const initClient = () => {
      const globalSupabase = (window as any).supabase;
      if (globalSupabase) {
        setSupabase(globalSupabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      } else { setLoading(false); }
    };
    if ((window as any).supabase) initClient();
    else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = initClient;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    async function fetchExisting() {
      if (!supabase || view !== "admin") return;
      setLoading(true);
      try {
        const { data, error } = await supabase.from("maintenance_payments").select("*").eq("month_key", monthKey);
        if (error) throw error;
        const mapped = (data || []).reduce((acc: any, row: PaymentRecord) => { acc[row.flat_key] = row; return acc; }, {});
        setRecordsInDb(mapped);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchExisting();
    setSelectedToUpdate({});
    setSelectedToUndo([]);
  }, [supabase, monthKey, view]);

  useEffect(() => {
    if (!supabase || !mSelectedFlat || view !== "manual") return;
    const fetchUnpaidRecords = async () => {
      setLoading(true);
      setStagedManualMonths([]);
      const flatKey = `${mSelectedBlock}-${mSelectedFlat}`;
      try {
        const { data, error } = await supabase
          .from("maintenance_payments")
          .select("month_key, status")
          .eq("flat_key", flatKey)
          .eq("status", "unpaid");
        if (error) throw error;
        const list = (data || []).map(r => {
          const [y, m] = r.month_key.split('-');
          return {
            key: r.month_key,
            year: y,
            month: m,
            label: `${new Date(parseInt(y), parseInt(m)-1).toLocaleString('default', { month: 'long' })} ${y}`
          };
        });
        setUnpaidMonths(list.sort((a, b) => b.key.localeCompare(a.key)));
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchUnpaidRecords();
  }, [mSelectedFlat, mSelectedBlock, supabase, view]);

  useEffect(() => {
    async function fetchNotices() {
      if (!supabase || view !== "notices") return;
      setLoading(true);
      try {
        const { data, error } = await supabase.from("notices").select("*").order('created_at', { ascending: false });
        if (error) throw error;
        setNotices(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchNotices();
  }, [supabase, view]);

  useEffect(() => {
    async function fetchFlatHistory() {
      if (!supabase || !histFlat || view !== "history") return;
      setHistLoading(true);
      try {
        const { data, error } = await supabase.from("maintenance_payments").select("*").eq("flat_key", `${histBlock}-${histFlat}`);
        if (error) throw error;
        setHistPayments(data || []);
      } catch (err) { console.error(err); } finally { setHistLoading(false); }
    }
    fetchFlatHistory();
  }, [supabase, histBlock, histFlat, view]);

  function toggleFlatFacade(flat: string) {
    const flatKey = `${block}-${flat}`;
    const dbRec = recordsInDb[flatKey];
    if (dbRec) {
      setSelectedToUndo(prev => prev.includes(flatKey) ? prev.filter(f => f !== flatKey) : [...prev, flatKey]);
      return;
    }
    if (selectedToUpdate[flatKey]) {
      const newUpdate = { ...selectedToUpdate };
      delete newUpdate[flatKey];
      setSelectedToUpdate(newUpdate);
    } else {
      setSelectedToUpdate(prev => ({
        ...prev,
        [flatKey]: { 
          status: statusAction, 
          mode: statusAction === 'paid' ? 'Admin Staged' : null,
          amount: statusAction === 'paid' ? MAINTENANCE_AMOUNT : 0
        }
      }));
    }
  }

  async function batchSaveFacade() {
    if (!supabase) return;
    setLoading(true);
    try {
      if (Object.keys(selectedToUpdate).length > 0) {
        const rows = Object.keys(selectedToUpdate).map(key => ({
          flat_key: key,
          month_key: monthKey,
          status: selectedToUpdate[key].status,
          payment_mode: selectedToUpdate[key].status === 'paid' ? selectedToUpdate[key].mode : null,
          amount: selectedToUpdate[key].status === 'paid' ? selectedToUpdate[key].amount : 0,
          receipt_id: selectedToUpdate[key].status === 'paid' ? `SR-BULK-${Date.now()}-${key}` : null
        }));
        await supabase.from("maintenance_payments").upsert(rows);
      }
      if (selectedToUndo.length > 0) {
        for (const flatKey of selectedToUndo) {
          await supabase.from("maintenance_payments").delete().match({ flat_key: flatKey, month_key: monthKey });
        }
      }
      alert("Database Refreshed.");
      window.location.reload();
    } catch (err) { alert("Process error."); } finally { setLoading(false); }
  }

  const handleManualSync = async () => {
    if (!stagedManualMonths.length || !supabase) return;
    setLoading(true);
    const flatKey = `${mSelectedBlock}-${mSelectedFlat}`;
    const rows = stagedManualMonths.map(mKey => ({
      flat_key: flatKey,
      month_key: mKey,
      status: 'paid',
      payment_mode: manualMode,
      amount: MAINTENANCE_AMOUNT,
      receipt_id: `SR-MAN-${Date.now()}-${mKey}-${mSelectedFlat}`
    }));
    try {
      const { error } = await supabase.from("maintenance_payments").upsert(rows, { onConflict: 'flat_key,month_key' });
      if (error) throw error;
      alert(`Success! Updated ${stagedManualMonths.length} cycles.`);
      setUnpaidMonths(prev => prev.filter(m => !stagedManualMonths.includes(m.key)));
      setStagedManualMonths([]);
    } catch (err) { alert("Sync failed."); } finally { setLoading(false); }
  };

  const postNotice = async () => {
    if (!supabase || !newNotice.content) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("notices").insert([{ title: newNotice.title || "Announcement", content: newNotice.content }]);
      if (error) throw error;
      alert("Announcement Published!");
      setNewNotice({ title: '', content: '' });
      setShowNoticeForm(false);
      const { data } = await supabase.from("notices").select("*").order('created_at', { ascending: false });
      setNotices(data || []);
    } catch (err) { alert("Publication failed."); } finally { setLoading(false); }
  };

  const flatListManual = useMemo(() => {
    const list = [];
    FLOORS.forEach(f => { for (let i = 1; i <= FLATS_PER_FLOOR; i++) { list.push(`${f}${i.toString().padStart(2, "0")}`); } });
    return list;
  }, []);

  const yearlyAuditMap = useMemo(() => {
    return histPayments.filter(p => p.month_key.startsWith(histYear)).reduce((acc, curr) => {
      const m = curr.month_key.split('-')[1];
      acc[m] = curr;
      return acc;
    }, {} as Record<string, PaymentRecord>);
  }, [histPayments, histYear]);

  if (view === "home") {
    return (
      <div style={styles.homeShell}>
        <div style={styles.homeContent}>
          <div style={styles.homeBrand}><div style={styles.homeLogo}><Icons.Om /></div><h1 style={styles.homeTitle}>Swarna Residency</h1><p style={styles.homeSub}>Admin Portal</p></div>
          <div style={styles.homeGrid} className="responsive-home-grid">
            <button onClick={() => setView('admin')} style={styles.homeCard}><Icons.Layout size={32}/><h3 style={styles.cardH3}>Building View</h3><p style={styles.cardP}>Visual dashboard for monthly dues.</p></button>
            <button onClick={() => setView('manual')} style={styles.homeCard}><Icons.PlusCircle size={32}/><h3 style={styles.cardH3}>Debt Recovery</h3><p style={styles.cardP}>Process bulk arrears and payments.</p></button>
            <button onClick={() => setView('history')} style={styles.homeCard}><Icons.History size={32}/><h3 style={styles.cardH3}>Ledger</h3><p style={styles.cardP}>Unit-wise transactional timeline.</p></button>
            <button onClick={() => setView('notices')} style={styles.homeCard}><Icons.Bell size={32}/><h3 style={styles.cardH3}>Notices</h3><p style={styles.cardP}>Manage community announcements.</p></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appShell}>
      {hoveredInfo && (
        <div style={{...styles.tooltip, top: tooltipPos.y - 140, left: tooltipPos.x - 110}} className="hide-on-mobile">
           <p style={styles.tooltipTitle}>Transaction Details</p>
           <div style={styles.tooltipRow}><Icons.Building size={14} /> <span>Unit {hoveredInfo.flat_key}</span></div>
           <div style={styles.tooltipRow}><Icons.Loader size={14} /> <span>{hoveredInfo.payment_mode || 'System Log'}</span></div>
           <div style={styles.tooltipRow}><Icons.History size={14} /> <span>{hoveredInfo.created_at ? new Date(hoveredInfo.created_at).toLocaleDateString() : '---'}</span></div>
        </div>
      )}

      <header style={styles.topBar}>
        <div style={styles.brandGroup} onClick={() => setView('home')}><div style={styles.logoWrapper}><Icons.Om /></div><h1 style={styles.brandTitle} className="hide-on-mobile">Swarna Residency</h1></div>
        <div style={styles.viewSwitch} className="mobile-view-switch">
          <button onClick={() => setView('admin')} style={{...styles.switchBtn, ...(view === 'admin' ? styles.switchBtnActive : {})}}>Facade</button>
          <button onClick={() => setView('manual')} style={{...styles.switchBtn, ...(view === 'manual' ? styles.switchBtnActive : {})}}>Recov</button>
          <button onClick={() => setView('history')} style={{...styles.switchBtn, ...(view === 'history' ? styles.switchBtnActive : {})}}>Ledger</button>
          <button onClick={() => setView('notices')} style={{...styles.switchBtn, ...(view === 'notices' ? styles.switchBtnActive : {})}}>Notic</button>
        </div>
      </header>

      <div style={styles.layoutBody} className="responsive-layout">
        <main style={styles.mainWorkspace} className="responsive-main">
          {view === "admin" && (
            <div style={styles.buildingContainer}>
              <div style={styles.buildingHeader} className="responsive-flex-column">
                <div style={styles.blockSwitch}>
                  <button onClick={() => setBlock("A")} style={{...styles.blockTab, ...(block === "A" ? styles.blockTabActiveA : {})}}>BLOCK A</button>
                  <button onClick={() => setBlock("B")} style={{...styles.blockTab, ...(block === "B" ? styles.blockTabActiveB : {})}}>BLOCK B</button>
                </div>
                <div style={styles.legendMinimal} className="mobile-mt-20">
                   <div style={styles.legendItem}><span style={{...styles.dot, background: '#10b981', boxShadow: '0 0 12px #10b981'}}/> Paid</div>
                   <div style={styles.legendItem}><span style={{...styles.dot, background: '#ef4444', boxShadow: '0 0 12px #ef4444'}}/> Unpaid</div>
                   <div style={styles.legendItem}><span style={{...styles.dot, background: '#d4af37', boxShadow: '0 0 12px #d4af37'}}/> Staged</div>
                </div>
              </div>
              <div style={styles.facade} className="responsive-facade">
                {activeBlockSections.map(section => (
                  <div key={section.floor} style={styles.floorRow} className="responsive-floor-row">
                    <div style={styles.floorIndicator}><span style={styles.floorNum}>{section.floor}</span></div>
                    <div style={styles.unitsGrid} className="responsive-units-grid">
                      {section.flats.map((flat: string) => {
                        const flatKey = `${block}-${flat}`;
                        const dbRec = recordsInDb[flatKey];
                        const staged = selectedToUpdate[flatKey];
                        const isUndo = selectedToUndo.includes(flatKey);
                        let unitStyle = styles.unit;
                        let borderColor = 'rgba(212, 175, 55, 0.1)';

                        if (dbRec) {
                          if (isUndo) { unitStyle = styles.unitUndo; borderColor = 'rgba(255, 255, 255, 0.1)'; }
                          else if (dbRec.status === 'paid') { unitStyle = styles.unitAdminPaid; borderColor = '#10b981'; }
                          else { unitStyle = styles.unitUnpaid; borderColor = '#ef4444'; }
                        } else if (staged) {
                          unitStyle = staged.status === 'paid' ? styles.unitStagedPaid : styles.unitStagedUnpaid;
                          borderColor = '#d4af37';
                        }

                        return (
                          <button 
                            key={flatKey} 
                            style={{...unitStyle, border: `1px solid ${borderColor}`, boxShadow: `0 0 10px ${borderColor}22`}} 
                            onClick={() => toggleFlatFacade(flat)} 
                            onMouseEnter={(e) => dbRec && (setHoveredInfo(dbRec), setTooltipPos({ x: e.clientX, y: e.clientY }))} 
                            onMouseLeave={() => setHoveredInfo(null)}
                          >
                            <span style={styles.unitLabel}>{flat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "manual" && (
            <div style={styles.manualTerminalLayout} className="responsive-flex-column">
              <div style={styles.manualSidebar} className="responsive-full-width">
                <h2 style={styles.sectionTitle}>Recovery Console</h2>
                <div style={styles.formGroup}>
                  <label style={styles.fieldLabel}>Select Block</label>
                  <div style={styles.blockRow}>{BLOCKS.map(b => (<button key={b} onClick={() => setMSelectedBlock(b)} style={{...styles.blockBtn, ...(mSelectedBlock === b ? styles.blockBtnActive : {})}}>{b}</button>))}</div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.fieldLabel}>Flat Number</label>
                  <select style={styles.selectInput} value={mSelectedFlat} onChange={e => setMSelectedFlat(e.target.value)}><option value="">Pick Unit</option>{flatListManual.map(f => <option key={f} value={f}>{f}</option>)}</select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.fieldLabel}>Payment Mode</label>
                  <select style={styles.selectInput} value={manualMode} onChange={e => setManualMode(e.target.value)}>{MANUAL_MODES.map(m => <option key={m} value={m}>{m}</option>)}</select>
                </div>
                {stagedManualMonths.length > 0 && (
                  <div style={styles.actionSection} className="mobile-mt-20">
                    <div style={styles.summaryCard}>
                      <p style={styles.summaryLabel}>Debt to Clear</p>
                      <h3 style={styles.summaryValue}>₹{(stagedManualMonths.length * MAINTENANCE_AMOUNT).toLocaleString()}</h3>
                      <p style={styles.summarySub}>{stagedManualMonths.length} Months Selected</p>
                    </div>
                    <button style={styles.syncBtn} onClick={handleManualSync} disabled={loading}>{loading ? <Icons.Loader size={20} /> : <><Icons.ShieldCheck /> Process Dues</>}</button>
                  </div>
                )}
              </div>
              <div style={styles.manualContent} className="responsive-full-width">
                {!mSelectedFlat ? (<div style={styles.emptyState}><Icons.Building size={64} opacity={0.3} /><h3>Choose a unit to fetch arrears</h3></div>) 
                : loading && unpaidMonths.length === 0 ? (<div style={styles.emptyState}><Icons.Loader size={48} className="animate-spin" /></div>) 
                : unpaidMonths.length === 0 ? (<div style={styles.allClearState}><Icons.Check size={48} /><h3>No Arrears</h3></div>) 
                : (<div style={styles.monthListContainer}>
                    <div style={styles.listHeader} className="responsive-flex-column"><h4 style={styles.listTitle}>Select months to mark as PAID</h4><button style={styles.selectAllBtn} className="mobile-mt-10" onClick={() => setStagedManualMonths(unpaidMonths.map(m => m.key))}>Check All</button></div>
                    <div style={styles.monthGrid} className="responsive-grid-1">
                      {unpaidMonths.map(item => {
                        const isStaged = stagedManualMonths.includes(item.key);
                        return (
                          <div key={item.key} style={{...styles.monthCard, ...(isStaged ? styles.monthCardStaged : {})}} onClick={() => setStagedManualMonths(prev => prev.includes(item.key) ? prev.filter(k => k !== item.key) : [...prev, item.key])}>
                            <div style={{...styles.checkbox, ...(isStaged ? styles.checkboxActive : {})}}>{isStaged && <Icons.Check size={14} />}</div>
                            <div style={styles.monthInfo}><span style={styles.monthName}>{item.label}</span><span style={styles.monthAmount}>₹{MAINTENANCE_AMOUNT}</span></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>)}
              </div>
            </div>
          )}

          {view === "notices" && (
            <div style={styles.noticeBoardLayout} className="responsive-flex-column">
              <div style={styles.noticeSidebar} className="responsive-full-width">
                <h2 style={styles.sectionTitle}>Announcements</h2>
                <button style={styles.addNoticeBtn} onClick={() => setShowNoticeForm(true)}><Icons.PlusCircle size={20} /> Create New</button>
              </div>
              <div style={styles.noticeContent} className="responsive-full-width">
                {showNoticeForm && (
                  <div style={styles.noticeFormCard}>
                    <input style={styles.noticeTitleInput} placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} />
                    <textarea style={styles.noticeTextArea} placeholder="Message body..." value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} />
                    <div style={styles.formActions}><button style={styles.cancelBtn} onClick={() => setShowNoticeForm(false)}>Cancel</button><button style={styles.postBtn} onClick={postNotice} disabled={loading}>{loading ? <Icons.Loader size={16} /> : <Icons.Send size={16}/>}</button></div>
                  </div>
                )}
                <div style={styles.noticeFeed}>{notices.map(notice => (
                  <div key={notice.id} style={styles.noticeCard}>
                    <div style={styles.noticeDate}>{new Date(notice.created_at).toLocaleDateString()}</div>
                    <h3 style={styles.noticeHeading}>{notice.title}</h3>
                    <p style={styles.noticePara}>{notice.content}</p>
                  </div>
                ))}</div>
              </div>
            </div>
          )}

          {view === "history" && (
            <div style={styles.historyWorkspace}>
               <h2 style={styles.sectionTitle}>Timeline</h2>
               <div style={styles.historySelectionDeck} className="responsive-flex-column">
                  <div style={styles.hField} className="responsive-full-width"><label style={styles.hLabel}>Block</label><select style={styles.hSelect} value={histBlock} onChange={e => setHistBlock(e.target.value as any)}><option value="A">Block A</option><option value="B">Block B</option></select></div>
                  <div style={styles.hField} className="responsive-full-width"><label style={styles.hLabel}>Unit</label><select style={styles.hSelect} value={histFlat} onChange={e => setHistFlat(e.target.value)}><option value="">Pick Unit</option>{flatListManual.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
                  <div style={styles.hField} className="responsive-full-width"><label style={styles.hLabel}>Year</label><select style={styles.hSelect} value={histYear} onChange={e => setHistYear(e.target.value)}>{YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}</select></div>
               </div>
               <div style={styles.ledgerGrid} className="responsive-grid-1">
                  {MONTHS.map(m => {
                    const record = yearlyAuditMap[m];
                    return (
                      <div key={m} style={{...styles.ledgerCard, border: record ? (record.status === 'paid' ? '1px solid #10b98144' : '1px solid #ef444444') : '1px solid rgba(212,175,55,0.05)'}}>
                         <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{...styles.statusBadge, background: record ? (record.status === 'paid' ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.03)', color: record ? '#fff' : 'rgba(255,255,255,0.2)'}}>{record ? record.status : 'Pending'}</div>
                            {record && record.status === 'paid' && <Icons.Eye size={12}/>}
                         </div>
                         <h4 style={styles.ledgerMonth}>{new Date(0, parseInt(m)-1).toLocaleString('en', {month: 'long'})}</h4>
                         <p style={{fontSize: 11, opacity: 0.3, margin: 0}}>{record?.payment_mode || '---'}</p>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}
        </main>

        {view === "admin" && (
          <aside style={styles.commandPanel} className="responsive-admin-panel">
            <div style={styles.panelSection}>
               <label style={styles.panelLabel}>Status Mode</label>
               <div style={styles.modeSwitcher}>
                  <button onClick={() => setStatusAction('paid')} style={{...styles.modeBtn, ...(statusAction === 'paid' ? styles.actPaid : {})}}>PAID</button>
                  <button onClick={() => setStatusAction('unpaid')} style={{...styles.modeBtn, ...(statusAction === 'unpaid' ? styles.actUnpaid : {})}}>UNPAID</button>
               </div>
            </div>
            <div style={styles.panelSection}>
               <label style={styles.panelLabel}>Timeline Selection</label>
               <div style={styles.periodPicker}>
                  <div style={styles.yearStrip}>{YEARS.map(y => (<button key={y} onClick={() => setYear(y.toString())} style={{...styles.yearPick, ...(year === y.toString() ? styles.yearPickActive : {})}}>{y}</button>))}</div>
                  <div style={styles.monthMosaic}>{MONTHS.map(m => (<button key={m} onClick={() => setMonth(m)} style={{...styles.monthPick, ...(month === m ? styles.monthPickActive : {})}}>{new Date(0, parseInt(m)-1).toLocaleString('en', {month: 'short'})}</button>))}</div>
               </div>
            </div>
            <div style={styles.panelStats}>
               <div style={styles.statLine}><span>Block Progress</span> <span style={{color: '#d4af37', fontWeight: 900}}>{collectionRate}%</span></div>
               <div style={styles.miniProgress}><div style={{...styles.miniProgressFill, width: `${collectionRate}%`}} /></div>
            </div>
            <button style={styles.resetBtn} onClick={() => { setSelectedToUpdate({}); setSelectedToUndo([]); }}><Icons.RotateCcw size={12}/> Reset Changes</button>
          </aside>
        )}
      </div>

      {(Object.keys(selectedToUpdate).length > 0 || selectedToUndo.length > 0) && (
        <div style={styles.syncBar} className="mobile-sync-bar">
          <p className="hide-on-mobile" style={{fontWeight: 800, margin: 0}}>{Object.keys(selectedToUpdate).length + selectedToUndo.length} staged updates</p>
          <button style={styles.syncBtnMain} onClick={batchSaveFacade} disabled={loading}>{loading ? 'Applying...' : 'Apply Records'}</button>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d4af3722; border-radius: 10px; }
        textarea, input, select { outline: none; border: 1px solid rgba(212,175,55,0.1); transition: all 0.3s; }
        textarea:focus, input:focus, select:focus { border-color: #d4af37 !important; background: rgba(212,175,55,0.05); }
        button:hover { filter: brightness(1.2); }

        /* RESPONSIVE OVERRIDES */
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
          .responsive-layout { flex-direction: column !important; overflow-y: auto !important; }
          .responsive-main { padding: 20px !important; overflow-y: visible !important; }
          .responsive-admin-panel { width: 100% !important; border-left: none !important; border-top: 1px solid rgba(212,175,55,0.1) !important; order: -1; }
          .responsive-home-grid { grid-template-columns: 1fr !important; }
          .responsive-units-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 8px !important; }
          .responsive-facade { gap: 10px !important; }
          .responsive-floor-row { gap: 15px !important; }
          .responsive-flex-column { flex-direction: column !important; align-items: flex-start !important; }
          .responsive-full-width { width: 100% !important; }
          .responsive-grid-1 { grid-template-columns: 1fr !important; }
          .mobile-mt-20 { margin-top: 20px !important; }
          .mobile-mt-10 { margin-top: 10px !important; }
          .mobile-view-switch { width: 100%; justify-content: space-around; }
          .mobile-sync-bar { width: 90% !important; bottom: 20px !important; padding: 12px 24px !important; justify-content: center !important; }
          .topBar { padding: 0 15px !important; }
          .appShell { height: auto !important; min-height: 100vh !important; overflow-y: auto !important; }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  homeShell: { height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  homeContent: { textAlign: 'center', maxWidth: 1000, padding: 40, animation: 'fade-in 1s' },
  homeBrand: { marginBottom: 60 },
  homeLogo: { width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #b45309)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' },
  homeTitle: { fontSize: 36, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' },
  homeSub: { fontSize: 13, color: '#d4af37', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 12, fontWeight: 700 },
  homeGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' },
  homeCard: { padding: 30, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(212, 175, 55, 0.1)', backdropFilter: 'blur(20px)', borderRadius: 36, cursor: 'pointer', textAlign: 'left', transition: 'all 0.4s', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: '#fff' },
  cardH3: { fontSize: 20, fontWeight: 800, margin: '20px 0 10px', color: '#d4af37' },
  cardP: { fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5, margin: 0 },

  appShell: { height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column", background: "#000", color: "#f8fafc", fontFamily: "system-ui" },
  topBar: { height: 84, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(212, 175, 55, 0.15)", background: "#000", zIndex: 100 },
  brandGroup: { display: "flex", alignItems: "center", gap: 16, cursor: 'pointer' },
  logoWrapper: { width: 36, height: 36, borderRadius: 10, background: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' },
  brandTitle: { fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.01em' },
  viewSwitch: { display: 'flex', background: 'rgba(212, 175, 55, 0.05)', padding: 5, borderRadius: 18, border: '1px solid rgba(212, 175, 55, 0.1)' },
  switchBtn: { padding: '10px 18px', border: 'none', background: 'transparent', color: 'rgba(255, 255, 255, 0.3)', fontSize: 11, fontWeight: 800, borderRadius: 14, cursor: 'pointer', transition: 'all 0.3s' },
  switchBtnActive: { background: '#d4af37', color: '#000', fontWeight: 900, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
  
  layoutBody: { flex: 1, display: "flex", overflow: "hidden" },
  mainWorkspace: { flex: 1, padding: 40, overflowY: 'auto', background: 'radial-gradient(circle at center, #0a0a0a 0%, #000 100%)' },
  buildingContainer: { maxWidth: 1100, margin: '0 auto' },
  buildingHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 },
  blockSwitch: { display: 'flex', gap: 12 },
  blockTab: { padding: '12px 28px', borderRadius: 16, border: '1px solid rgba(212, 175, 55, 0.1)', background: 'rgba(255, 255, 255, 0.02)', color: 'rgba(255, 255, 255, 0.4)', fontSize: 11, fontWeight: 900, cursor: 'pointer' },
  blockTabActiveA: { background: 'rgba(37, 99, 235, 0.1)', color: '#3b82f6', borderColor: 'rgba(37, 99, 235, 0.4)', boxShadow: '0 0 15px rgba(37, 99, 235, 0.2)' },
  blockTabActiveB: { background: 'rgba(147, 51, 234, 0.1)', color: '#a855f7', borderColor: 'rgba(147, 51, 234, 0.4)', boxShadow: '0 0 15px rgba(147, 51, 234, 0.2)' },
  legendMinimal: { display: 'flex', gap: 20 },
  dot: { width: 8, height: 8, borderRadius: '50%' },
  legendItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'rgba(255, 255, 255, 0.3)', fontWeight: 800, textTransform: 'uppercase' },
  facade: { display: 'flex', flexDirection: 'column', gap: 14 },
  floorRow: { display: 'flex', gap: 32, alignItems: 'center' },
  floorIndicator: { width: 44, textAlign: 'center' },
  floorNum: { fontSize: 24, fontWeight: 900, color: 'rgba(212, 175, 55, 0.05)' },
  unitsGrid: { flex: 1, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12 },
  unit: { 
    height: 72, borderRadius: 18, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(212, 175, 55, 0.1)', color: 'rgba(255, 255, 255, 0.2)', cursor: 'pointer', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', 
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  unitLabel: { fontSize: 15, fontWeight: 900, zIndex: 1 },
  unitAdminPaid: { background: 'rgba(16, 185, 129, 0.05)', color: '#10b981' },
  unitUnpaid: { background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444' },
  unitStagedPaid: { background: '#10b981', color: '#fff', border: 'none', transform: 'scale(1.1)', zIndex: 10, boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)' },
  unitStagedUnpaid: { background: '#ef4444', color: '#fff', border: 'none', transform: 'scale(1.1)', zIndex: 10, boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)' },
  unitUndo: { background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.1)', opacity: 0.6, textDecoration: 'line-through' },
  
  commandPanel: { width: 320, background: '#000', borderLeft: '1px solid rgba(212, 175, 55, 0.1)', padding: 32, display: 'flex', flexDirection: 'column', gap: 40, overflowY: 'auto' },
  panelSection: { display: 'flex', flexDirection: 'column', gap: 14 },
  panelLabel: { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#d4af37', opacity: 0.5, letterSpacing: '0.1em' },
  modeSwitcher: { display: 'flex', background: 'rgba(212, 175, 55, 0.05)', padding: 5, borderRadius: 16, border: '1px solid rgba(212, 175, 55, 0.1)' },
  modeBtn: { flex: 1, padding: 12, border: 'none', background: 'transparent', color: 'rgba(255, 255, 255, 0.3)', fontSize: 10, fontWeight: 900, borderRadius: 12, cursor: 'pointer' },
  actPaid: { background: '#10b981', color: '#fff', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' },
  actUnpaid: { background: '#ef4444', color: '#fff', boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' },
  periodPicker: { display: 'flex', gap: 16, height: 220 },
  yearStrip: { flex: 0.4, overflowY: 'auto' },
  yearPick: { width: '100%', padding: '14px 0', border: 'none', background: 'transparent', color: 'rgba(255, 255, 255, 0.1)', fontSize: 16, fontWeight: 800, cursor: 'pointer', textAlign: 'left' },
  yearPickActive: { color: '#d4af37', fontSize: 32, textShadow: '0 0 10px rgba(212, 175, 55, 0.4)' },
  monthMosaic: { flex: 0.6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 },
  monthPick: { padding: 12, borderRadius: 12, border: '1px solid rgba(212, 175, 55, 0.1)', background: 'rgba(255, 255, 255, 0.02)', color: 'rgba(255, 255, 255, 0.3)', fontSize: 10, fontWeight: 900, cursor: 'pointer' },
  monthPickActive: { background: '#d4af37', color: '#000', borderColor: '#d4af37' },
  panelStats: { background: 'rgba(212, 175, 55, 0.03)', padding: 24, borderRadius: 28, border: '1px solid rgba(212, 175, 55, 0.1)' },
  statLine: { display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#d4af37' },
  miniProgress: { height: 6, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, overflow: 'hidden', marginTop: 12 },
  miniProgressFill: { height: '100%', background: '#d4af37', boxShadow: '0 0 10px #d4af37' },
  resetBtn: { padding: 16, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'transparent', color: 'rgba(255, 255, 255, 0.3)', fontSize: 12, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },

  manualTerminalLayout: { display: 'flex', gap: 32, height: '100%' },
  manualSidebar: { width: 340, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 36, border: '1px solid rgba(212, 175, 55, 0.1)', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 },
  sectionTitle: { fontSize: 26, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', textShadow: '0 0 20px rgba(255,255,255,0.1)' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  fieldLabel: { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#d4af37', opacity: 0.5 },
  blockRow: { display: 'flex', gap: 12 },
  blockBtn: { flex: 1, padding: '12px', borderRadius: 14, border: '1px solid rgba(212, 175, 55, 0.1)', background: 'rgba(255, 255, 255, 0.02)', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 800, fontSize: 12, cursor: 'pointer' },
  blockBtnActive: { background: '#d4af37', borderColor: '#d4af37', color: '#000' },
  selectInput: { padding: '16px', background: 'transparent', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: 16, color: '#fff', fontSize: 14, fontWeight: 700 },
  actionSection: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20 },
  summaryCard: { background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', border: '1px solid #10b981', padding: 24, borderRadius: 24, textAlign: 'center' },
  summaryLabel: { fontSize: 11, color: '#10b981', fontWeight: 800, textTransform: 'uppercase' },
  summaryValue: { fontSize: 32, fontWeight: 900, color: '#fff', margin: '6px 0' },
  summarySub: { fontSize: 12, opacity: 0.4 },
  syncBtn: { background: '#d4af37', border: 'none', padding: '20px', borderRadius: 18, color: '#000', fontWeight: 900, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
  manualContent: { flex: 1, background: 'rgba(255, 255, 255, 0.01)', borderRadius: 36, border: '1px solid rgba(212, 175, 55, 0.05)', padding: 40, overflowY: 'auto' },
  emptyState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.1)', textAlign: 'center', gap: 20 },
  allClearState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#10b981', textAlign: 'center', gap: 20 },
  monthListContainer: { animation: 'fade-in 0.6s' },
  listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  listTitle: { fontSize: 16, fontWeight: 800, color: 'rgba(255, 255, 255, 0.3)', margin: 0 },
  selectAllBtn: { background: 'transparent', border: 'none', color: '#d4af37', fontSize: 12, fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' },
  monthGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  monthCard: { background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(212, 175, 55, 0.1)', padding: '24px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 18, cursor: 'pointer', transition: 'all 0.3s' },
  monthCardStaged: { background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#fff', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
  checkbox: { width: 22, height: 22, borderRadius: 8, border: '2px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { background: '#10b981', border: 'none', color: '#fff' },
  monthInfo: { display: 'flex', flexDirection: 'column' },
  monthName: { fontSize: 15, fontWeight: 800 },
  monthAmount: { fontSize: 12, opacity: 0.4 },

  noticeBoardLayout: { display: 'flex', gap: 32, height: '100%' },
  noticeSidebar: { width: 320, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 36, border: '1px solid rgba(212, 175, 55, 0.1)', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 },
  noticeContent: { flex: 1, background: 'rgba(255, 255, 255, 0.01)', borderRadius: 36, border: '1px solid rgba(212, 175, 55, 0.05)', padding: 40, overflowY: 'auto' },
  addNoticeBtn: { background: '#d4af37', color: '#000', padding: '16px', borderRadius: 16, border: 'none', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
  noticeFormCard: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: 32, borderRadius: 28, marginBottom: 40, animation: 'fade-in 0.4s' },
  noticeTitleInput: { width: '100%', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 14, padding: '16px', color: '#fff', fontSize: 16, marginBottom: 16, fontWeight: 800 },
  noticeTextArea: { width: '100%', height: 160, background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 14, padding: '16px', color: '#fff', fontSize: 16, resize: 'none', lineHeight: 1.6 },
  formActions: { display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 },
  cancelBtn: { padding: '10px 24px', borderRadius: 12, background: 'transparent', color: 'rgba(255, 255, 255, 0.3)', border: 'none', cursor: 'pointer', fontWeight: 800 },
  postBtn: { padding: '14px 32px', borderRadius: 14, background: '#fff', color: '#000', border: 'none', fontWeight: 900, cursor: 'pointer' },
  noticeFeed: { display: 'flex', flexDirection: 'column', gap: 24 },
  noticeCard: { background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(212, 175, 55, 0.1)', padding: 32, borderRadius: 32 },
  noticeHeading: { fontSize: 22, fontWeight: 900, color: '#d4af37', margin: '4px 0 16px', letterSpacing: '-0.01em' },
  noticePara: { fontSize: 16, color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7, margin: 0 },
  noticeDate: { fontSize: 11, color: '#d4af37', opacity: 0.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' },

  historyWorkspace: { animation: 'fade-in 0.8s' },
  historySelectionDeck: { display: 'flex', gap: 24, background: 'rgba(255, 255, 255, 0.02)', padding: '32px', borderRadius: 36, border: '1px solid rgba(212, 175, 55, 0.1)', marginBottom: 44, marginTop: 24 },
  hField: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10 },
  hLabel: { fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#d4af37', opacity: 0.5 },
  hSelect: { background: 'transparent', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '16px', borderRadius: 16, color: '#fff', fontSize: 15, fontWeight: 700 },
  ledgerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 },
  ledgerCard: { background: 'rgba(255, 255, 255, 0.02)', padding: 32, borderRadius: 32, border: '1px solid rgba(212, 175, 55, 0.05)' },
  ledgerMonth: { fontSize: 22, fontWeight: 900, margin: '14px 0 8px', color: '#fff' },
  statusBadge: { display: 'inline-block', padding: '6px 14px', borderRadius: 12, fontSize: 10, fontWeight: 900, textTransform: 'uppercase' },

  syncBar: { position: 'fixed', bottom: 44, left: '50%', transform: 'translateX(-50%)', background: 'rgba(212, 175, 55, 0.1)', color: '#fff', padding: '18px 48px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 64, boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)', zIndex: 1000, backdropFilter: 'blur(40px)', border: '1px solid rgba(212, 175, 55, 0.3)' },
  syncBtnMain: { padding: '14px 40px', borderRadius: 100, background: '#d4af37', color: '#000', border: 'none', fontWeight: 900, fontSize: 14, cursor: 'pointer' },
  tooltip: { position: 'fixed', width: 280, background: 'rgba(10, 10, 10, 0.95)', border: '1px solid #d4af37', borderRadius: 28, padding: 24, zIndex: 2000, pointerEvents: 'none', backdropFilter: 'blur(20px)', boxShadow: '0 20px 48px rgba(0,0,0,0.8)' },
  tooltipTitle: { fontSize: 12, fontWeight: 900, textTransform: 'uppercase', color: '#d4af37', marginBottom: 16 },
  tooltipRow: { display: 'flex', alignItems: 'center', gap: 14, fontSize: 15, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 12 }
};