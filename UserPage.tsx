import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- High-Fidelity Inline SVG Icons ---
const Icons = {
  Om: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10,10-4.47,10-10S17.53,2,12,2ZM15.42,16.5c-1.39,.61-3.15,.88-4.75,.43-1.6-.45-2.85-1.57-3.41-3.04-.1-.28,.04-.58,.32-.68s.58,.04,.68,.32c.44,1.15,1.42,2.02,2.67,2.37,1.25,.35,2.62,.14,3.71-.34,.26-.11,.57,.01,.68,.27s-.01,.57-.27,.68Zm-1.85-4.43c-.22-.16-.3-.46-.14-.68,.54-.76,.85-1.68,.85-2.67,0-2.61-2.12-4.72-4.72-4.72s-4.72,2.11-4.72,4.72c0,.99,.31,1.91,.85,2.67,.16,.22,.1,.52-.14,.68-.22,.16-.52,.1-.68-.14-.68-.95-1.07-2.11-1.07-3.21,0-3.19,2.58-5.77,5.77-5.77s5.77,2.58,5.77,5.77c0,1.1-.39,2.26-1.07,3.21-.16,.24-.46,.3-.68,.14Zm-4.14,2.27c-.28,0-.5-.22-.5-.5,0-.55,.45-1,1-1s1,.45,1,1-.45,1-1,1c-.17,0-.33-.09-.41-.22-.05-.08-.09-.18-.09-.28,0-.28,.22-.5,.5-.5s.5,.22,.5,.5c0,.1-.04,.2-.09,.28-.08,.13-.24,.22-.41,.22Z"/>
    </svg>
  ),
  Building: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M9 21V9l3-4 3 4v12"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 13h.01"/><path d="M15 13h.01"/><path d="M9 17h.01"/><path d="M15 17h.01"/></svg>
  ),
  CreditCard: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
  ),
  Smartphone: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
  ),
  CheckCircle: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  ShieldCheck: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Loader: ({ className = "" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  Camera: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
  ),
  Printer: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
  ),
  ArrowLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  Calendar: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  ),
  Bell: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  Layout: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
  )
};

const SUPABASE_URL = "https://rbzwxlfdtrheykgnksfm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiend4bGZkdHJoZXlrZ25rc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzQ1OTgsImV4cCI6MjA3MjMxMDU5OH0.NbrYY9Ou_LFjduCeUcw0QJCz9Q481BkHCG6OekGjNHU";
const MAINTENANCE_AMOUNT = 1200;
const CURRENT_DATE_FOR_TEST = "2025-12";

const BLOCKS = ["A", "B"];
const FLOORS = [1, 2, 3, 4, 5];
const FLATS_PER_FLOOR = 8;

export default function App() {
  const [supabase, setSupabase] = useState<any>(null);
  const [view, setView] = useState<"login" | "portal" | "payment" | "security" | "success">("login");
  const [activeTab, setActiveTab] = useState<"dashboard" | "notices">("dashboard");
  
  // Auth State
  const [loginFlat, setLoginFlat] = useState("");
  const [password, setPassword] = useState("");

  // Portal State
  const [block, setBlock] = useState<"A" | "B">("A");
  const [floor, setFloor] = useState(1);
  const [flat, setFlat] = useState("");
  const [billingFilter, setBillingFilter] = useState<"current" | "pending">("current");
  const [selectedMonthToPay, setSelectedMonthToPay] = useState(CURRENT_DATE_FOR_TEST);
  
  // Data States
  const [payments, setPayments] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PhonePe / UPI");
  
  // Security Layer States
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [finalReceiptData, setFinalReceiptData] = useState<any>(null);

  const flatKey = useMemo(() => flat ? `${block}-${flat}` : "", [block, flat]);

  // Init Supabase
  useEffect(() => {
    const init = () => {
      const globalSupabase = (window as any).supabase;
      if (globalSupabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
        setSupabase(globalSupabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      }
    };
    if ((window as any).supabase) init();
    else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = init;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch Payment Data
  useEffect(() => {
    async function fetchRecords() {
      if (!supabase || !flatKey) return;
      setLoading(true);
      const { data } = await supabase.from("maintenance_payments").select("*").eq("flat_key", flatKey);
      setPayments(data || []);
      setLoading(false);
    }
    fetchRecords();
  }, [supabase, flatKey]);

  // Fetch Notices
  useEffect(() => {
    async function fetchNotices() {
      if (!supabase || activeTab !== "notices") return;
      setLoading(true);
      try {
        const { data } = await supabase.from("notices").select("*").order('created_at', { ascending: false });
        setNotices(data || []);
      } catch (err) {
        console.error("Fetch notices error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, [supabase, activeTab]);

  const pendingFromDb = useMemo(() => {
    return payments.filter(p => p.status === 'unpaid' && p.month_key !== CURRENT_DATE_FOR_TEST);
  }, [payments]);

  const isCurrentMonthPaid = useMemo(() => {
    return payments.some(p => p.month_key === CURRENT_DATE_FOR_TEST && p.status === 'paid');
  }, [payments]);

  useEffect(() => {
    if (billingFilter === 'current') {
      setSelectedMonthToPay(CURRENT_DATE_FOR_TEST);
    } else if (pendingFromDb.length > 0) {
      setSelectedMonthToPay(pendingFromDb[0].month_key);
    } else {
      setSelectedMonthToPay("");
    }
  }, [billingFilter, pendingFromDb]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginFlat.includes('-')) {
       const [b, fNum] = loginFlat.split('-');
       setBlock(b.toUpperCase() as any);
       setFlat(fNum);
       setFloor(parseInt(fNum[0]));
       setView("portal");
    } else {
       alert("Please enter ID in format A-101");
    }
  };

  const startPayment = () => setView("payment");
  const proceedToSecurity = () => setView("security");

  const handleSelfieCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelfieImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const finalizeTransaction = async () => {
    if (!supabase || !isConfirmed || !selfieImage) return;
    setIsProcessing(true);
    
    const uniqueReceiptId = `SWARNA-${selectedMonthToPay.replace('-', '')}-${flatKey.replace('-', '')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    try {
      await new Promise(r => setTimeout(r, 2500));
      
      const payload = {
        flat_key: flatKey,
        month_key: selectedMonthToPay,
        status: 'paid',
        payment_mode: paymentMethod,
        receipt_id: uniqueReceiptId,
        amount: MAINTENANCE_AMOUNT,
        selfie_verified: true
      };

      const { error } = await supabase
        .from("maintenance_payments")
        .upsert(payload, { onConflict: 'flat_key,month_key' });

      if (error) throw new Error(error.message);

      setFinalReceiptData({ ...payload, timestamp: new Date().toLocaleString() });
      setView("success");
    } catch (err: any) { 
      console.error("Finalize Transaction Error:", err);
      alert(`Database Error: ${err.message || 'Verification Synchronisation failed.'}`); 
    } finally { 
      setIsProcessing(false); 
    }
  };

  const handlePrint = () => window.print();

  const flatsList = Array.from({ length: FLATS_PER_FLOOR }, (_, i) => `${floor}${(i + 1).toString().padStart(2, "0")}`);

  // --- RENDERING VIEWS ---

  if (view === "login") {
    return (
      <div style={styles.appShell}>
         <div style={styles.loginContainer}>
            <div style={styles.heroOverlay} />
            <div style={styles.loginCard}>
               <div style={styles.loginLogo}><Icons.Om /></div>
               <h1 style={styles.loginTitle}>Swarna residency</h1>
               <p style={styles.loginSub}>Authorized Resident Entrance</p>
               
               <form style={styles.loginForm} onSubmit={handleLogin}>
                  <div style={styles.field}>
                     <label style={styles.label}>Apartment ID (e.g. A-101)</label>
                     <input style={styles.input} placeholder="Enter Block-Flat" value={loginFlat} onChange={e => setLoginFlat(e.target.value)} required />
                  </div>
                  <div style={styles.field}>
                     <label style={styles.label}>Divine Access Key</label>
                     <input style={styles.input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" style={styles.loginBtn}>Verify Identity</button>
               </form>
               <p style={styles.footerText}>Secured by LuxeLiving Ecosystem</p>
            </div>
         </div>
      </div>
    );
  }

  if (view === "security") {
    return (
      <div style={styles.appShell}>
         <div style={styles.loginContainer}>
            <div style={styles.heroOverlay} />
            <div style={styles.securityCard}>
               <h2 style={{color: '#fbce3b', margin: '0 0 10px', fontSize: 28, fontWeight: 900}}>Selfie Verification</h2>
               <p style={{color: '#94a3b8', fontSize: 14, marginBottom: 30}}>Identity validation is mandatory for secure record generation.</p>
               
               <div style={styles.cameraFrame}>
                  {selfieImage ? (
                    <img src={selfieImage} style={styles.selfiePreview} alt="Captured Selfie" />
                  ) : (
                    <div style={styles.cameraPlaceholder}>
                       <Icons.Camera size={48} />
                       <label style={styles.cameraLabel}>
                          Capture ID Selfie
                          <input type="file" accept="image/*" capture="user" style={{display: 'none'}} onChange={handleSelfieCapture} />
                       </label>
                    </div>
                  )}
               </div>

               {selfieImage && (
                 <button style={styles.retakeBtn} onClick={() => setSelfieImage(null)}>Reset Capture</button>
               )}

               <div style={styles.checkboxContainer}>
                  <input type="checkbox" id="legal" checked={isConfirmed} onChange={e => setIsConfirmed(e.target.checked)} style={styles.checkbox}/>
                  <label htmlFor="legal" style={styles.checkboxLabel}>
                    I myself paid the amount and waiting for receipt
                  </label>
               </div>

               <button 
                  style={{...styles.loginBtn, opacity: (isConfirmed && selfieImage) ? 1 : 0.4}} 
                  disabled={!isConfirmed || !selfieImage || isProcessing}
                  onClick={finalizeTransaction}
               >
                  {isProcessing ? <Icons.Loader className="animate-spin" /> : 'Confirm & Generate Slip'}
               </button>
            </div>
         </div>
      </div>
    );
  }

  if (view === "success" && finalReceiptData) {
    return (
      <div style={styles.appShell}>
        <div style={styles.successContainer}>
           <div className="no-print" style={styles.successCard}>
              <Icons.CheckCircle />
              <h1 style={{fontSize: 32, fontWeight: 900, marginTop: 20, color: '#fbce3b'}}>Verified</h1>
              <p style={{color: '#94a3b8', marginTop: 8}}>Payment received. Official receipt issued below.</p>
              
              <div id="receipt-slip" style={styles.receiptSlip}>
                 <div style={styles.receiptHeader}>
                    <div style={styles.receiptLogo}><Icons.Om /></div>
                    <div style={styles.receiptHeaderText}>
                       <h2 style={styles.receiptTitle}>Swarna Residency</h2>
                       <p style={styles.receiptSubtitle}>Maintenance Payment Slip</p>
                    </div>
                 </div>

                 <div style={styles.receiptBody}>
                    <div style={styles.receiptRow}>
                       <span style={styles.receiptLabel}>Receipt ID</span>
                       <span style={styles.receiptValue}>{finalReceiptData.receipt_id}</span>
                    </div>
                    <div style={styles.receiptRow}>
                       <span style={styles.receiptLabel}>Transaction Date</span>
                       <span style={styles.receiptValue}>{finalReceiptData.timestamp}</span>
                    </div>
                    <div style={styles.receiptDivider} />
                    <div style={{...styles.receiptRow, padding: '10px 0'}}>
                       <span style={{...styles.receiptLabel, color: '#94a3b8'}}>Unit Information</span>
                       <span style={{...styles.receiptValue, color: '#fbce3b', fontSize: '24px', fontWeight: '900'}}>{finalReceiptData.flat_key}</span>
                    </div>
                    <div style={styles.receiptRow}>
                       <span style={styles.receiptLabel}>Billing Period</span>
                       <span style={styles.receiptValue}>{finalReceiptData.month_key}</span>
                    </div>
                    <div style={styles.receiptRow}>
                       <span style={styles.receiptLabel}>Payment Method</span>
                       <span style={styles.receiptValue}>{finalReceiptData.payment_mode}</span>
                    </div>
                    <div style={styles.receiptDivider} />
                    <div style={styles.receiptRow}>
                       <span style={{...styles.receiptLabel, fontSize: '15px', color: '#fff'}}>Amount Settled</span>
                       <span style={{...styles.receiptValue, fontSize: '24px', color: '#10b981', fontWeight: '900'}}>₹{finalReceiptData.amount}.00</span>
                    </div>
                 </div>

                 <div style={styles.receiptFooter}>
                    <p style={{fontWeight: 700}}>Om Shanti. Your contribution is appreciated.</p>
                    <p style={{fontSize: '9px', opacity: 0.5, marginTop: '10px'}}>Validated with Resident Selfie Evidence</p>
                 </div>
              </div>

              <div style={styles.successActions}>
                 <button style={styles.printBtn} onClick={handlePrint}><Icons.Printer size={16} /> Print Receipt</button>
                 <button style={styles.primaryBtn} onClick={() => window.location.reload()}>Finish</button>
              </div>
           </div>
        </div>

        {/* PRINT HIDDEN LAYER */}
        <div className="print-only" style={styles.printView}>
             <div style={{border: '1px solid #000', padding: '50px', background: '#fff', color: '#000'}}>
                 <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                    <div style={{fontSize: '24px', fontWeight: '900'}}>SWARNA RESIDENCY</div>
                    <div style={{textAlign: 'right', fontSize: '14px'}}>ID: {finalReceiptData.receipt_id}</div>
                 </div>
                 <hr />
                 <div style={{margin: '40px 0'}}>
                    <div style={{fontSize: '24px', marginBottom: '20px'}}><strong>FLAT UNIT: {finalReceiptData.flat_key}</strong></div>
                    <div style={{marginBottom: '10px', fontSize: '18px'}}>Billing Cycle: {finalReceiptData.month_key}</div>
                    <div style={{marginBottom: '10px', fontSize: '18px'}}>Method: {finalReceiptData.payment_mode}</div>
                    <div style={{marginBottom: '10px', fontSize: '18px'}}>Security: Selfie Verification Complete</div>
                    <div style={{marginBottom: '10px', fontSize: '18px'}}>Date: {finalReceiptData.timestamp}</div>
                 </div>
                 <hr />
                 <div style={{textAlign: 'right', marginTop: '40px'}}>
                    <div style={{fontSize: '32px', fontWeight: '900'}}>Total Paid: ₹{finalReceiptData.amount}.00</div>
                 </div>
             </div>
        </div>

        <style>{`
          @media print { .no-print { display: none !important; } .print-only { display: block !important; } body { background: #fff !important; } }
          .print-only { display: none; }
        `}</style>
      </div>
    );
  }

  if (view === "payment") {
    return (
      <div style={styles.appShell}>
        <div style={styles.paymentGateway}>
           <header style={styles.gatewayHeader}>
              <button onClick={() => setView("portal")} style={styles.backBtn}><Icons.ArrowLeft /></button>
              <span style={{fontWeight: 800, color: '#fff'}}>Divine Gateway</span>
              <Icons.ShieldCheck />
           </header>
           <div style={styles.gatewayBody}>
              <div style={styles.amountBanner}>
                 <p style={{fontSize: 11, opacity: 0.5, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Payment for {selectedMonthToPay}</p>
                 <h2 style={{fontSize: 42, margin: '12px 0', color: '#fbce3b', fontWeight: 900}}>₹{MAINTENANCE_AMOUNT.toLocaleString()}</h2>
              </div>
              <div style={styles.methodList}>
                 {["PhonePe / UPI", "Net Banking", "Credit / Debit Card"].map(m => (
                    <button key={m} style={{...styles.methodBtn, borderColor: paymentMethod === m ? '#fbce3b' : '#1e293b'}} onClick={() => setPaymentMethod(m)}>
                       <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Icons.Smartphone size={18} /><span style={{fontWeight: 700, color: '#fff'}}>{m}</span></div>
                       {paymentMethod === m && <div style={styles.radioActive} />}
                    </button>
                 ))}
              </div>
              <button style={styles.payNowFinal} onClick={proceedToSecurity}>Proceed to Identity Verification</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appShell}>
      <header style={styles.header}>
        <div style={styles.brand}><div style={styles.brandIcon}><Icons.Om /></div><div><span style={styles.brandText}>Swarna Residency</span><span style={styles.brandSubtext}>Divine Resident Portal</span></div></div>
        <div style={styles.statusBadge}><Icons.ShieldCheck /><span>Security Verified</span></div>
      </header>
      <div style={styles.mainLayout}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <p style={styles.sectionLabel}>Navigation</p>
            <div style={styles.navGroup}>
              <button 
                style={{...styles.navBtn, ...(activeTab === 'dashboard' ? styles.navBtnActive : {})}} 
                onClick={() => setActiveTab('dashboard')}
              >
                <Icons.Layout size={18} /> Billing Dashboard
              </button>
              <button 
                style={{...styles.navBtn, ...(activeTab === 'notices' ? styles.navBtnActive : {})}} 
                onClick={() => setActiveTab('notices')}
              >
                <Icons.Bell size={18} /> Notice Board
              </button>
            </div>
          </div>
          <div style={styles.sidebarSection}>
            <p style={styles.sectionLabel}>Unit Identity</p>
            <div style={styles.controlGroup}>
              <div style={styles.field}><label style={styles.label}>Block</label><select style={styles.select} value={block} onChange={e => setBlock(e.target.value as any)}>{BLOCKS.map(b => <option key={b} value={b}>Block {b}</option>)}</select></div>
              <div style={styles.field}><label style={styles.label}>Apartment</label><select style={styles.select} value={flat} onChange={e => setFlat(e.target.value)}><option value="">Select flat...</option>{flatsList.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
            </div>
          </div>
          <div style={styles.amountCard}><p style={styles.sectionLabel}>Maintenance Rate</p><div style={styles.priceValue}>₹{MAINTENANCE_AMOUNT}</div><p style={styles.priceSubtext}>Fixed monthly fee</p></div>
        </aside>
        
        <main style={styles.content}>
          {activeTab === 'dashboard' ? (
            <div style={styles.dashboard}>
               <h2 style={{fontSize: 36, fontWeight: 900, margin: '0 0 40px', color: '#fbce3b', letterSpacing: '-0.02em'}}>Welcome Unit {flatKey}</h2>
               <div style={styles.grid}>
                  <section style={styles.gridSection}>
                     <h3 style={styles.gridLabel}>Billing Selection</h3>
                     <div style={styles.billingCard}>
                        <div style={styles.dropdownSelector}>
                           <label style={styles.label}>Timeline Category</label>
                           <div style={{marginTop: 10}}>
                              <select style={styles.select} value={billingFilter} onChange={e => setBillingFilter(e.target.value as any)}>
                                 <option value="current">Current Month (Dec 2025)</option>
                                 <option value="pending">Past Due Records</option>
                              </select>
                           </div>
                        </div>
                        <div style={{padding: 32}}>
                           <label style={styles.label}>Action Item</label>
                           <div style={{marginTop: 16}}>
                              {billingFilter === 'current' ? (
                                 isCurrentMonthPaid ? (
                                    <div style={styles.paidNotice}>✅ Maintenance for Dec 2025 is already Verified.</div>
                                 ) : (
                                    <div style={styles.dueRow}>
                                       <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                                          <Icons.Calendar size={20} className="text-gold" />
                                          <span style={{fontWeight: 800, fontSize: 16, color: '#fff'}}>Dec 2025 Due</span>
                                       </div>
                                       <button style={styles.primaryBtn} onClick={startPayment}>Pay Now</button>
                                    </div>
                                 )
                              ) : (
                                 pendingFromDb.length === 0 ? (
                                    <p style={{color: '#64748b', fontSize: 15, textAlign: 'center', padding: '30px 0'}}>No past due records found in the ledger.</p>
                                 ) : (
                                    <div style={styles.pendingList}>
                                       {pendingFromDb.map(p => (
                                          <div key={p.month_key} style={styles.dueRow}>
                                             <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                                                <Icons.Calendar size={20} style={{color: '#ef4444'}} />
                                                <span style={{fontWeight: 800, color: '#fff'}}>{p.month_key}</span>
                                             </div>
                                             <button style={styles.primaryBtn} onClick={() => { setSelectedMonthToPay(p.month_key); startPayment(); }}>Pay Now</button>
                                          </div>
                                       ))}
                                    </div>
                                 )
                              )}
                           </div>
                        </div>
                     </div>
                  </section>
                  <section style={styles.gridSection}>
                     <h3 style={styles.gridLabel}>Personal Activity</h3>
                     <div style={styles.historyBox}>
                        {loading ? <div style={{textAlign: 'center', padding: 40}}><Icons.Loader className="text-gold" /></div> : 
                          payments.length === 0 ? <p style={{color: '#64748b', textAlign: 'center', padding: 40}}>No transaction records.</p> :
                          payments.map(p => (
                             <div key={p.id} style={styles.historyRow}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                   <span style={{fontWeight: 800, fontSize: 15, color: '#fff'}}>{p.month_key}</span>
                                   <span style={{fontSize: 10, color: '#4b5563', textTransform: 'uppercase', marginTop: 2}}>{p.payment_mode || 'Admin Entry'}</span>
                                </div>
                                <span style={{...styles.statusTag, color: p.status === 'unpaid' ? '#ef4444' : '#10b981'}}>{p.status}</span>
                             </div>
                          ))
                        }
                     </div>
                  </section>
               </div>
            </div>
          ) : (
            <div style={styles.dashboard}>
              <h2 style={{fontSize: 36, fontWeight: 900, margin: '0 0 40px', color: '#fbce3b', letterSpacing: '-0.02em'}}>Official Notices</h2>
              <div style={styles.noticeList}>
                {loading ? (
                  <div style={{textAlign: 'center', padding: 50}}><Icons.Loader className="text-gold" /></div>
                ) : notices.length === 0 ? (
                  <div style={styles.emptyNotices}>
                    <Icons.Bell size={64} />
                    <p>No notices have been posted yet.</p>
                  </div>
                ) : (
                  notices.map(notice => (
                    <div key={notice.id} style={styles.noticeCard}>
                      <div style={styles.noticeHeader}>
                        <div style={styles.noticeDate}>
                          {new Date(notice.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div style={styles.noticeTag}>OFFICIAL</div>
                      </div>
                      <h3 style={styles.noticeTitle}>{notice.title}</h3>
                      <p style={styles.noticeContentText}>{notice.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .text-gold { color: #fbce3b; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: { height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column", background: "#000", color: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  header: { height: 72, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #141414", backgroundColor: "rgba(0,0,0,0.95)" },
  brand: { display: "flex", alignItems: "center", gap: 18 },
  brandIcon: { width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #fbce3b, #b45309)', color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 },
  brandText: { fontSize: 18, fontWeight: 900, color: '#fbce3b' },
  brandSubtext: { fontSize: 10, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em' },
  statusBadge: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: '20px', background: '#050505', border: '1px solid #1e293b', color: '#10b981', fontSize: '11px', fontWeight: 800 },
  mainLayout: { flex: 1, display: "flex", overflow: "hidden" },
  sidebar: { width: 320, padding: "32px 24px", borderRight: "1px solid #141414", background: "#000", display: "flex", flexDirection: "column", gap: 28 },
  sidebarSection: { display: 'flex', flexDirection: 'column', gap: 18 },
  sectionLabel: { fontSize: 10, fontWeight: 900, textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.2em" },
  
  navGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  navBtn: { background: 'transparent', border: '1px solid transparent', padding: '14px 20px', borderRadius: '16px', color: '#64748b', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, fontSize: '14px', fontWeight: 700, transition: 'all 0.2s' },
  navBtnActive: { background: 'rgba(251, 206, 59, 0.05)', borderColor: 'rgba(251, 206, 59, 0.2)', color: '#fbce3b' },

  controlGroup: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 12, fontWeight: 700, color: '#94a3b8' },
  select: { width: '100%', background: '#050505', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px', color: '#fff', fontSize: '14px', fontWeight: 600, outline: 'none' },
  amountCard: { background: '#050505', padding: '28px', borderRadius: '24px', border: '1px solid #1e293b', textAlign: 'center' },
  priceValue: { fontSize: '32px', fontWeight: 900, color: '#fbce3b', margin: '6px 0' },
  priceSubtext: { fontSize: '11px', color: '#4b5563', fontWeight: 600 },
  
  content: { flex: 1, padding: "50px", overflowY: "auto", background: 'radial-gradient(circle at 0% 0%, #08112b 0%, #000 100%)' },
  dashboard: { maxWidth: 1000, margin: '0 auto', animation: 'fade-in 0.8s ease-out' },
  grid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40 },
  gridSection: { display: 'flex', flexDirection: 'column', gap: 20 },
  gridLabel: { fontSize: 14, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' },
  billingCard: { background: '#050505', borderRadius: '32px', border: '1px solid #1e293b', overflow: 'hidden' },
  dropdownSelector: { padding: '24px 32px 0 32px', borderBottom: '1px solid #141414', paddingBottom: '24px' },
  dueRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '20px 24px', borderRadius: '20px', border: '1px solid #1e293b' },
  paidNotice: { padding: '30px', textAlign: 'center', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.05)', borderRadius: '20px', fontSize: 15 },
  pendingList: { display: 'flex', flexDirection: 'column', gap: 14 },
  historyBox: { background: '#050505', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' },
  historyRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #141414' },
  statusTag: { fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' },
  primaryBtn: { background: '#fbce3b', color: '#000', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '13px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 20px rgba(251, 206, 59, 0.2)' },
  
  // Notice View Styles
  noticeList: { display: 'flex', flexDirection: 'column', gap: 20 },
  noticeCard: { background: '#050505', border: '1px solid #1e293b', padding: '32px', borderRadius: '32px', transition: 'transform 0.3s' },
  noticeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  noticeDate: { fontSize: '10px', color: '#4b5563', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' },
  noticeTag: { padding: '4px 10px', borderRadius: '8px', background: '#fbce3b22', color: '#fbce3b', fontSize: '9px', fontWeight: 900 },
  noticeTitle: { fontSize: '22px', fontWeight: 900, color: '#fff', margin: '0 0 12px' },
  noticeContentText: { fontSize: '15px', color: '#94a3b8', lineHeight: 1.6, margin: 0 },
  emptyNotices: { textAlign: 'center', padding: '80px 0', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 },

  // Login Styles
  loginContainer: { height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, #0c1a40 0%, #000 85%)', opacity: 0.9 },
  loginCard: { position: 'relative', zIndex: 1, background: '#050505', padding: '60px', borderRadius: '48px', border: '1px solid #1e293b', width: '460px', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', animation: 'fade-in 1.2s ease-out' },
  loginLogo: { width: 100, height: 100, borderRadius: 28, background: 'linear-gradient(135deg, #fbce3b, #b45309)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', boxShadow: '0 0 40px rgba(251, 206, 59, 0.3)' },
  loginTitle: { fontSize: 36, fontWeight: 900, color: '#fbce3b', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.04em' },
  loginSub: { color: '#94a3b8', fontSize: 16, fontWeight: 600, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' },
  loginForm: { marginTop: 40, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 24 },
  input: { width: '100%', background: '#000', border: '1px solid #1e293b', padding: '18px', borderRadius: '16px', color: '#fff', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s', fontWeight: 600 },
  loginBtn: { width: '100%', padding: '20px', borderRadius: '16px', border: 'none', background: '#fbce3b', color: '#000', fontSize: '16px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 12px 30px rgba(251, 206, 59, 0.2)', transition: 'all 0.3s' },

  // Security View
  securityCard: { position: 'relative', zIndex: 1, background: '#050505', padding: '50px', borderRadius: '48px', border: '1px solid #fbce3b', width: '520px', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', animation: 'fade-in 0.5s ease-out' },
  cameraFrame: { width: '100%', height: '320px', background: '#000', borderRadius: '32px', border: '2px dashed #1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  selfiePreview: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: '#4b5563' },
  cameraLabel: { cursor: 'pointer', color: '#fbce3b', fontSize: '15px', fontWeight: '700', textDecoration: 'underline' },
  retakeBtn: { background: 'transparent', border: 'none', color: '#ef4444', fontWeight: '800', marginBottom: '24px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' },
  checkboxContainer: { display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', marginBottom: '32px', padding: '0 10px' },
  checkbox: { width: '22px', height: '22px', accentColor: '#fbce3b' },
  checkboxLabel: { fontSize: '13px', color: '#94a3b8', fontWeight: '600', cursor: 'pointer', lineHeight: 1.4 },

  // Payment Gateway
  paymentGateway: { maxWidth: 500, margin: '60px auto', background: '#050505', borderRadius: '40px', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', animation: 'fade-in 0.4s ease-out' },
  gatewayHeader: { padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #141414', background: '#0c111d' },
  backBtn: { background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' },
  gatewayBody: { padding: '40px' },
  amountBanner: { textAlign: 'center', marginBottom: 40 },
  methodList: { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 },
  methodBtn: { background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '18px 24px', borderRadius: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s' },
  radioActive: { width: 12, height: 12, borderRadius: '50%', background: '#fbce3b', boxShadow: '0 0 15px #fbce3b' },
  payNowFinal: { width: '100%', background: '#fbce3b', color: '#000', border: 'none', padding: '22px', borderRadius: '18px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(251, 206, 59, 0.2)' },
  
  // Success Slip View
  successContainer: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' },
  successCard: { textAlign: 'center', maxWidth: 540, padding: '50px', background: '#050505', borderRadius: '48px', border: '1px solid #1e293b', animation: 'fade-in 0.6s ease-out' },
  successActions: { display: 'flex', gap: '16px', marginTop: '30px', justifyContent: 'center' },
  printBtn: { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px 24px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },

  receiptSlip: { background: '#080808', border: '1px solid #1e293b', borderRadius: '24px', padding: '30px', marginTop: '30px', textAlign: 'left', position: 'relative' },
  receiptHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #141414', paddingBottom: '20px', marginBottom: '20px' },
  receiptLogo: { width: '40px', height: '40px', background: '#fbce3b', color: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  receiptHeaderText: { textAlign: 'right' },
  receiptTitle: { margin: 0, fontSize: '18px', color: '#fff', fontWeight: '900' },
  receiptSubtitle: { margin: 0, fontSize: '10px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '1px' },
  receiptBody: { display: 'flex', flexDirection: 'column', gap: '14px' },
  receiptRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  receiptLabel: { fontSize: '12px', color: '#4b5563', fontWeight: '600' },
  receiptValue: { fontSize: '13px', color: '#fff', fontWeight: '700' },
  receiptDivider: { height: '1px', background: '#141414', margin: '5px 0' },
  receiptFooter: { marginTop: '30px', textAlign: 'center', fontSize: '12px', color: '#4b5563', borderTop: '1px dashed #1e293b', paddingTop: '20px' },
  
  printView: { padding: '40px' },
  footerText: { fontSize: 10, color: '#4b5563', marginTop: 24, textTransform: 'uppercase', letterSpacing: '0.1em' }
};