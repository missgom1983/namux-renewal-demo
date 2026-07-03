/* NAMUH X 리뉴얼 — App
   실제 GNB(검정 바, 5개 메뉴) + 메가메뉴로 개별 화면 선택 → 단독 보기.
   앵커 링크 없음. */
(function () {
  const { useState } = React;
  const { ScreenViewer, FullscreenModal } = window;
  const { GNB, SCREENS } = window.DEMO_DATA;

  function Logo({ size = 22, color = "#fff" }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "flex-start", fontFamily: "var(--font-display)", fontWeight: 700, color, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ fontSize: size }}>NAMUH</span>
        <span style={{ fontSize: size * 0.5, color: "var(--ws-mint)", marginLeft: 2, marginTop: -1 }}>X</span>
      </span>);

  }
  function Icon({ d }) {
    return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{d}</svg>;
  }

  function subFor(id) {
    return SCREENS[id].type === "concept" ? "신규 · 기획 단계" : "AS-IS ↔ TO-BE";
  }

  /* ---- 메가메뉴 한 줄 ---- */
  function MegaRow({ label, node, screen, desc, pre, small, selected, onSelect, setOpen }) {
    const clickable = !!screen;
    const on = clickable && screen === selected;
    return (
      <button disabled={!clickable} onClick={() => {if (clickable) {onSelect(screen);setOpen(null);}}}
      style={{
        display: "block", width: "100%", textAlign: "left", border: "none", fontFamily: "inherit",
        padding: small ? "6px 9px" : "7px 10px", borderRadius: 8, cursor: clickable ? "pointer" : "default",
        background: on ? "var(--mint-50)" : "transparent"
      }}
      onMouseEnter={(e) => {if (clickable && !on) e.currentTarget.style.background = "var(--gray-50)";}}
      onMouseLeave={(e) => {if (clickable && !on) e.currentTarget.style.background = "transparent";}}>
        <span style={{ fontSize: small ? 13 : 14, fontWeight: small ? 600 : 700, letterSpacing: "-0.01em",
          color: small ? clickable ? "var(--text-body)" : "var(--text-muted)" : "var(--text-strong)" }}>{node || label}</span>
        {desc && <span style={{ display: "block", marginTop: 2, fontSize: 11.5, fontStyle: "italic", color: "#8E97B4", lineHeight: 1.45 }}>
          {pre && <span style={{ color: "var(--error)", fontStyle: "italic" }}>{pre} </span>}{desc}</span>}
      </button>);

  }

  function MegaItem({ it, selected, onSelect, setOpen }) {
    const node =
    <span>{it.label}
        {it.xmark && <sup style={{ fontSize: 9, fontWeight: 800, color: "var(--ws-mint)", marginLeft: 2 }}>X</sup>}
        {it.tag && <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-faint)", marginLeft: 5 }}>({it.tag})</span>}
      </span>;

    if (it.children) {
      return (
        <div style={{ padding: "2px 0 5px" }}>
          <MegaRow node={node} label={it.label} screen={it.screen} selected={selected} onSelect={onSelect} setOpen={setOpen} />
          <div style={{ margin: "1px 0 0 18px", paddingLeft: 11, borderLeft: "1px solid var(--border-subtle)" }}>
            {it.children.map((c) => <MegaRow key={c.label} label={c.label} screen={c.screen} small selected={selected} onSelect={onSelect} setOpen={setOpen} />)}
          </div>
        </div>);

    }
    return <MegaRow node={node} label={it.label} screen={it.screen} desc={it.desc} pre={it.pre} selected={selected} onSelect={onSelect} setOpen={setOpen} />;
  }

  /* ---- GNB (검정 바) + 메가메뉴 ---- */
  function Gnb({ selected, onSelect }) {
    const [open, setOpen] = useState(null);
    const hasScreen = (it) => it.screen === selected || it.children && it.children.some((c) => c.screen === selected);
    return (
      <header style={{ position: "sticky", top: 0, zIndex: 300, background: "var(--ws-black)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", height: 62, padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <button onClick={() => {onSelect("home");window.scrollTo({ top: 0 });}} style={{ justifySelf: "start", display: "flex", background: "none", border: "none", cursor: "pointer", padding: 0 }}><Logo /></button>

          <nav style={{ justifySelf: "center", display: "flex", gap: 4, height: "100%" }}>
            {GNB.map((m, idx) => {
              const isActive = m.items.some(hasScreen) || m.to && m.to === selected;
              const isOpen = open === idx;
              const last = idx === GNB.length - 1;
              const panelPos = idx === 0 ? { left: 0 } : last ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" };
              const hasDesc = m.items.some((it) => it.desc);
              return (
                <div key={m.name} onMouseEnter={() => setOpen(idx)} onMouseLeave={() => setOpen(null)}
                style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <button onClick={() => {if (m.to) {onSelect(m.to);setOpen(null);}}} style={{
                    position: "relative",
                    display: "inline-flex", alignItems: "center", gap: 0, background: "none", border: "none", cursor: m.to ? "pointer" : "default",
                    padding: "0 14px", height: 62, fontFamily: "inherit",
                    fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.01em", whiteSpace: "nowrap",
                    color: isActive || isOpen ? "#fff" : "rgba(255,255,255,.62)"
                  }}>
                    <span style={{ position: "relative" }}>
                      {m.name}
                      {m.isNew && <sup style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: "0.06em", color: "var(--ws-mint)", marginLeft: 2 }}>NEW</sup>}
                    </span>
                    {isActive && <span style={{ position: "absolute", left: 14, right: 14, bottom: 0, height: 2, background: "var(--ws-mint)" }}></span>}
                  </button>

                  {isOpen && m.items.length > 0 &&
                  <div style={{
                    position: "absolute", top: 62, ...panelPos,
                    width: hasDesc ? 326 : 252, padding: "10px 8px", background: "#fff", borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)"
                  }}>
                      {m.items.map((it) => <MegaItem key={it.label} it={it} selected={selected} onSelect={onSelect} setOpen={setOpen} />)}
                    </div>
                  }
                </div>);

            })}
          </nav>

          <div style={{ justifySelf: "end", display: "flex", gap: 16, color: "#fff" }}>
            <Icon d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>} />
            <Icon d={<><path d="M6 7h13l-1.4 9.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8L6 4H3" /><circle cx="9" cy="20.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="17" cy="20.5" r="1.2" fill="currentColor" stroke="none" /></>} />
          </div>
        </div>
      </header>);

  }

  /* ---- 변화 / 개선 목록 (클릭 시 화면 영역으로 이동) ---- */
  function ChangeList({ side, screen, focus, onPick }) {
    const isTobe = side === "tobe";
    const items = (isTobe ? screen.changes : screen.issues) || [];
    const title = isTobe ? "주요 변화" : "개선이 필요한 사항";
    const accent = isTobe ? "var(--ws-mint)" : "#E0A23B";
    const badgeBg = isTobe ? "var(--mint-100)" : "rgba(224,162,59,.16)";
    const badgeFg = isTobe ? "var(--mint-700)" : "#946312";
    const activeBg = isTobe ? "var(--mint-50)" : "rgba(224,162,59,.08)";
    return (
      <div>
        <h2 style={{ margin: "0 0 14px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-strong)" }}>{screen.title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent }}></span>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: "0.02em", color: "var(--text-strong)" }}>{title}</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((it, i) => {
            const on = focus && focus.idx === i;
            return (
              <button key={it.label} onClick={() => onPick(i)} style={{
                display: "flex", alignItems: "flex-start", gap: 13, width: "100%", textAlign: "left",
                padding: "13px 12px", border: "none", borderTop: i ? "1px solid var(--border-subtle)" : "none",
                borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                background: on ? activeBg : "transparent", transition: "background var(--dur-fast) var(--ease-out)"
              }}
              onMouseEnter={(e) => {if (!on) e.currentTarget.style.background = "var(--gray-50)";}}
              onMouseLeave={(e) => {if (!on) e.currentTarget.style.background = "transparent";}}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: badgeBg, color: badgeFg, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: 14.5, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>{it.label}</strong>
                  <p style={{ margin: "3px 0 0", fontSize: 13, lineHeight: 1.55, color: "var(--text-muted)", whiteSpace: "pre-line" }}>{it.desc}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={on ? accent : "var(--text-faint)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>);

          })}
        </div>
      </div>);

  }

  /* ---- 화면 스테이지 (스크린샷형) ---- */
  function ShotStage({ screen, onFullscreen }) {
    const [side, _setSide] = useState("asis");
    const [focus, setFocus] = useState(null);
    const setSide = (v) => {_setSide(v);setFocus(null);};
    return (
      <React.Fragment>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.55fr) minmax(280px,1fr)", gap: 32, alignItems: "start" }}>
          <ScreenViewer screen={screen} side={side} setSide={setSide} onFullscreen={() => onFullscreen(side, setSide)} focus={focus} />
          <div style={{ position: "sticky", top: 24 }}>
            <ChangeList side={side} screen={screen} focus={focus} onPick={(i) => setFocus({ idx: i, key: Date.now() })} />
          </div>
        </div>
      </React.Fragment>);

  }

  /* ---- 화면 스테이지 (신규 메뉴 · 컨셉) ---- */
  function ConceptStage({ screen }) {
    return (
      <React.Fragment>
        <div style={{ marginBottom: 24 }}>
          <span className="ws-eyebrow" style={{ color: "var(--mint-600)" }}>{screen.kicker}</span>
          <h2 style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--text-strong)" }}>{screen.title}</h2>
          <p style={{ margin: "12px 0 0", maxWidth: 720, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)" }}>{screen.desc}</p>
        </div>
        <div className="ws-dark" style={{ position: "relative", overflow: "hidden", background: "var(--ws-black)", borderRadius: "var(--radius-card)", padding: "44px 40px 46px", boxShadow: "var(--shadow-card)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: .14, background: "repeating-linear-gradient(90deg, var(--ws-mint) 0 3px, transparent 3px 11px)", maskImage: "linear-gradient(180deg, transparent 55%, #000 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 55%, #000 100%)" }}></div>
          <div style={{ position: "relative", maxWidth: 720 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "4px 11px", borderRadius: 999 }}>신규 메뉴 · 기획 단계</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,.4)" }}>{screen.en}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.018em" }}>{screen.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 30 }}>
              {screen.points.map(([h, d]) =>
              <div key={h} style={{ background: "var(--dark-surface)", border: "1px solid var(--dark-hairline)", borderRadius: "var(--radius-md)", padding: "20px 20px 22px" }}>
                  <span style={{ display: "block", width: 9, height: 9, borderRadius: "50%", background: "var(--ws-mint)", boxShadow: "0 0 0 5px rgba(133,225,210,.18)", marginBottom: 14 }}></span>
                  <strong style={{ fontSize: 15.5, color: "#fff", letterSpacing: "-0.01em" }}>{h}</strong>
                  <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{d}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>);

  }

  function Footer() {
    return (
      <footer className="ws-dark" style={{ background: "var(--ws-black)", borderTop: "1px solid rgba(255,255,255,.08)", marginTop: 56 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <Logo size={18} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>NAMUX.COM 리뉴얼    |    AS-IS ↔ TO-BE 화면 미리보기</span>
        </div>
      </footer>);

  }

  /* ---- 에러 바운더리 (렌더 실패 시 백지 방지) ---- */
  class Boundary extends React.Component {
    constructor(p) {super(p);this.state = { err: null };}
    static getDerivedStateFromError(err) {return { err };}
    render() {
      if (this.state.err) {
        return (
          <div style={{ maxWidth: 720, margin: "60px auto", padding: "28px 30px", borderRadius: 16, border: "1px solid var(--border-default)", background: "var(--surface-card)" }}>
            <strong style={{ fontSize: 17, color: "var(--text-strong)" }}>이 화면을 그리는 중 문제가 발생했습니다.</strong>
            <pre style={{ marginTop: 14, padding: 14, borderRadius: 10, background: "var(--gray-100)", color: "var(--error)", fontSize: 12.5, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{String(this.state.err && this.state.err.message || this.state.err)}</pre>
          </div>);

      }
      return this.props.children;
    }
  }

  /* ---- 단일 이미지 전체화면 오버레이 ---- */
  function PageFullscreen({ screen, onClose }) {
    React.useEffect(() => {
      const onKey = (e) => {if (e.key === "Escape") onClose();};
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;document.body.style.overflow = "hidden";
      return () => {window.removeEventListener("keydown", onKey);document.body.style.overflow = prev;};
    }, [onClose]);
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(8,9,11,.94)", display: "flex", flexDirection: "column" }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,.10)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, color: "#fff", minWidth: 0 }}>
            <strong style={{ fontSize: 16, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{screen.title}</strong>
            {screen.tag && <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>({screen.tag})</span>}
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{screen.kicker}</span>
          </div>
          <button onClick={onClose} aria-label="닫기" style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer", flexShrink: 0, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <img src={screen.src} alt={screen.title} draggable={false} style={{ display: "block", width: "100%", height: "auto", background: "#fff" }} />
        </div>
      </div>);

  }

  /* ---- C-Level 리포트 화면 (목업 + 5포인트) ---- */
  function ReportDots() {
    return (
      <div style={{ display: "flex", gap: 7, padding: "13px 16px", background: "var(--gray-100)", borderBottom: "1px solid var(--border-subtle)" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }}></span>)}
      </div>);

  }

  function GrowxMock({ s }) {
    return (
      <div>
        <div style={{ background: "var(--ws-black)", borderRadius: 14, padding: "20px 22px 22px", marginBottom: 22 }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "5px 12px", borderRadius: 999 }}>이 달의 업데이트</span>
          <h4 style={{ margin: "14px 0 0", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>끊임없이 성장하는 나무엑스 소식</h4>
          <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "rgba(255,255,255,.5)", letterSpacing: "0.01em" }}>UPDATE: 대화형 상태확인 / 자동복귀 / 나이트모드</p>
        </div>
        {s.months.map((m, mi) =>
        <div key={mi} style={{ marginBottom: mi === 0 ? 26 : 4 }}>
            <p style={{ margin: "0 0 12px", fontSize: 14.5, fontWeight: 700, color: "var(--text-strong)" }}>{m.ym} <span style={{ color: "var(--text-faint)", fontWeight: 600 }}>| {m.count}</span></p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {m.cards.map((c, ci) =>
            <div key={ci} style={{ border: "1px solid var(--border-subtle)", borderRadius: 12, overflow: "hidden", background: "var(--surface-card)" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-muted)", textAlign: "center", padding: "9px 6px", background: "var(--gray-50)", borderBottom: "1px solid var(--border-subtle)" }}>{c.tag}</div>
                  <div style={{ height: 64, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-faint)", fontSize: 11, fontWeight: 700 }}>IMG</div>
                  <div style={{ padding: "10px 11px 12px" }}>
                    <p style={{ margin: 0, fontSize: 10.5, color: "var(--text-faint)" }}>{c.date}</p>
                    <p style={{ margin: "5px 0 0", fontSize: 12, fontWeight: 600, color: "var(--text-strong)", lineHeight: 1.4 }}>{c.title}</p>
                  </div>
                </div>
            )}
            </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, padding: "12px 14px", borderRadius: 12, background: "var(--mint-50)", border: "1px solid var(--mint-200)" }}>
          <span style={{ flex: 1, fontSize: 12.5, color: "var(--text-muted)" }}>이메일 주소 입력 (로그인 시 자동)</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "8px 16px", borderRadius: 999 }}>구독 신청</span>
        </div>
      </div>);

  }

  function DiaryMock({ s }) {
    return (
      <div>
        <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>로봇 다이어리</h4>
        <p style={{ margin: "8px 0 16px", fontSize: 13, color: "var(--text-muted)" }}>{s.hero}</p>
        <div style={{ height: 110, borderRadius: 12, background: "var(--ws-blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 600, marginBottom: 18 }}>Key Visual</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {s.articles.map((a, i) =>
          <div key={i} style={{ display: "flex", gap: 13, padding: "15px 16px", border: "1px solid var(--border-subtle)", borderRadius: 12, background: "var(--surface-card)" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: 14, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>{a.title}</strong>
                <p style={{ margin: "7px 0 0", fontSize: 12.5, lineHeight: 1.55, color: "var(--text-muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.excerpt}</p>
                <p style={{ margin: "10px 0 0", fontSize: 11.5, color: "var(--text-faint)" }}>{a.views} &nbsp; <span style={{ color: "var(--mint-600)", fontWeight: 600 }}>{a.tags}</span></p>
              </div>
              <div style={{ flexShrink: 0, width: 96, borderRadius: 9, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-faint)", fontSize: 11, fontWeight: 700 }}>IMG</div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--mint-700)", padding: "10px 26px", borderRadius: 999, border: "1px solid var(--mint-300, var(--mint-200))" }}>+ 더 보기</span>
        </div>
      </div>);

  }

  function ReportStage({ screen }) {
    return (
      <React.Fragment>
        <div style={{ marginBottom: 26 }}>
          <span className="ws-eyebrow" style={{ color: "var(--mint-600)" }}>{screen.kicker}</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--text-strong)" }}>{screen.title}</h2>
            {screen.en && <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-faint)" }}>{screen.en}</span>}
            {screen.badge && <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em", color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 9px", borderRadius: 6 }}>{screen.badge}</span>}
          </div>
          <p style={{ margin: "12px 0 0", maxWidth: 760, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)", whiteSpace: "pre-line" }}>{screen.desc}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(300px,0.95fr)", gap: 40, alignItems: "start" }}>
          <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--surface-card)" }}>
            <ReportDots />
            <div style={{ padding: "22px 22px 24px" }}>
              {screen.mockup === "diary" ? <DiaryMock s={screen} /> : <GrowxMock s={screen} />}
            </div>
          </div>
          <div style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column" }}>
            {screen.points.map(([eyebrow, title, desc], i) =>
            <div key={i} style={{ display: "flex", gap: 15, padding: "16px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--ws-mint)", color: "var(--ws-black)", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>{i + 1}</span>
                <div>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--mint-600)" }}>{eyebrow}</span>
                  <strong style={{ display: "block", margin: "5px 0 0", fontSize: 18, fontWeight: 700, color: "var(--text-strong)", letterSpacing: "-0.015em" }}>{title}</strong>
                  <p style={{ margin: "7px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)" }}>{desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>);

  }

  /* ---- 영상 화면 (Agentic 등 · 토글 없음) ---- */
  function VideoStage({ screen }) {
    const [full, setFull] = useState(false);
    const vref = React.useRef(null);
    const [err, setErr] = useState(false);
    const fref = React.useRef(null);
    const [muted, setMuted] = useState(true);

    React.useEffect(() => {
      if (!full) return;
      const onKey = (e) => {if (e.key === "Escape") setFull(false);};
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;document.body.style.overflow = "hidden";
      const v = fref.current;if (v) {v.currentTime = 0;const p = v.play();if (p && p.catch) p.catch(() => {});}
      return () => {window.removeEventListener("keydown", onKey);document.body.style.overflow = prev;};
    }, [full]);

    return (
      <React.Fragment>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <span className="ws-eyebrow" style={{ color: "var(--mint-600)" }}>{screen.kicker}</span>
            <h2 style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--text-strong)" }}>{screen.title}</h2>
            <p style={{ margin: "12px 0 0", maxWidth: 760, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)" }}>{screen.desc}</p>
          </div>
        </div>
        <div style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "#000" }}>
          <video ref={vref} src={screen.video} muted autoPlay loop playsInline preload="metadata" onError={() => setErr(true)}
          style={{ display: "block", width: "100%", height: "auto", minHeight: err ? 360 : 0, maxHeight: "calc(100vh - 250px)", objectFit: "contain", background: "#000" }} />
          {err &&
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "rgba(255,255,255,.7)", textAlign: "center", padding: 24 }}>
              <span style={{ fontSize: 28, opacity: .5 }}>▶</span>
              <strong style={{ fontSize: 15, color: "#fff" }}>콘셉트 영상 준비 중</strong>
              <span style={{ fontSize: 13, lineHeight: 1.6 }}>영상 파일(assets/agentic.mp4)이 업로드되면 자동 재생됩니다.</span>
            </div>
          }
          <div style={{ position: "absolute", top: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 13px 6px 8px", borderRadius: 999, background: "rgba(8,9,11,.62)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 12.5, fontWeight: 700 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ws-mint)" }}></span>
            신규 메뉴 · 콘셉트 영상
          </div>
          <button onClick={() => setFull(true)} style={{ position: "absolute", right: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "9px 15px", borderRadius: 999, border: "none", background: "var(--ws-mint)", color: "var(--ws-black)", fontSize: 13, fontWeight: 700, boxShadow: "0 8px 22px rgba(10,11,13,.34)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
            전체화면 재생
          </button>
        </div>
        {full &&
        <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "#000", display: "flex", flexDirection: "column" }}>
            <video ref={fref} src={screen.video} autoPlay loop playsInline muted={muted}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#000" }} />
            <div style={{ position: "absolute", top: 16, right: 18, display: "flex", gap: 10, zIndex: 2 }}>
              <button onClick={() => setMuted((m) => !m)} aria-label="음소거" style={{ height: 40, padding: "0 16px", borderRadius: 999, cursor: "pointer", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 13, fontWeight: 700 }}>{muted ? " 소리 켜기" : "음소거"}</button>
              <button onClick={() => setFull(false)} aria-label="닫기" style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
          </div>
        }
      </React.Fragment>);

  }

  /* ---- 화면 스테이지 (단일 이미지 페이지 · 토글 없음) ---- */
  function PageStage({ screen }) {
    const [full, setFull] = useState(false);
    return (
      <React.Fragment>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-strong)" }}>{screen.title}</h2>
          {screen.tag && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-faint)" }}>({screen.tag})</span>}
          <span style={{ fontSize: 12.5, color: "var(--text-faint)" }}>{screen.kicker}</span>
        </div>
        <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--surface-card)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 10px", borderRadius: 999 }}>리뉴얼</span>
            </div>
            <button onClick={() => setFull(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "8px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-strong)", fontSize: 13, fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
              전체화면
            </button>
          </div>
          <div style={{ maxHeight: "calc(100vh - 230px)", minHeight: 360, overflowY: "auto", background: "var(--gray-50)" }}>
            <img src={screen.src} alt={screen.title} draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
        {full && <PageFullscreen screen={screen} onClose={() => setFull(false)} />}
      </React.Fragment>);

  }

  /* ---- 라이브 화면 (실제 페이지를 iframe으로 임베드 · TypeB) ---- */
  function LiveStage({ screen }) {
    const [full, setFull] = useState(false);
    React.useEffect(() => {
      if (!full) return;
      const onKey = (e) => { if (e.key === "Escape") setFull(false); };
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [full]);
    return (
      <React.Fragment>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-strong)" }}>{screen.title}</h2>
          <span style={{ fontSize: 12.5, color: "var(--text-faint)" }}>{screen.kicker}</span>
        </div>
        <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--surface-card)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 10px", borderRadius: 999 }}>리뉴얼</span>
              <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>실제 동작 화면</span>
            </div>
            <button onClick={() => setFull(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "8px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-strong)", fontSize: 13, fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
              전체화면
            </button>
          </div>
          <iframe title={screen.title} src={screen.iframe} style={{ display: "block", width: "100%", height: "calc(100vh - 210px)", minHeight: 420, border: "none", background: "#ededed" }}></iframe>
        </div>
        {full && (
          <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "#000", display: "flex", flexDirection: "column" }}>
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 20px", background: "var(--ws-black)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 10px", borderRadius: 999 }}>리뉴얼</span>
                <strong style={{ fontSize: 15 }}>{screen.title}</strong>
              </div>
              <button onClick={() => setFull(false)} aria-label="닫기" style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <iframe title={screen.title} src={screen.iframe + "?full=1"} style={{ flex: 1, width: "100%", border: "none", background: "#ededed" }}></iframe>
          </div>
        )}
      </React.Fragment>);
  }

  function App() {
    const [selected, setSelected] = useState("home");
    const [fs, setFs] = useState(null); // { screen, side, setSide }
    const screen = SCREENS[selected];

    const openFs = (side, setSide) => setFs({ screen, side, setSide });
    const closeFs = () => setFs(null);
    const setModalSide = (v) => {fs.setSide(v);setFs((f) => ({ ...f, side: v }));};
    const goStore = () => {setSelected("store");window.scrollTo({ top: 0 });};

    let stage;
    if (screen.type === "live") stage = <LiveStage key={screen.id} screen={screen} />;else
    if (screen.type === "report") stage = <ReportStage key={screen.id} screen={screen} />;else
    if (screen.type === "video") stage = <VideoStage key={screen.id} screen={screen} />;else
    if (screen.type === "page") stage = <PageStage key={screen.id} screen={screen} />;else
    if (screen.type === "story") stage = <RobotStage key={screen.id} screen={screen} onGo={goStore} />;else
    if (screen.type === "concept") stage = <ConceptStage key={screen.id} screen={screen} />;else
    stage = <ShotStage key={screen.id} screen={screen} onFullscreen={openFs} />;

    return (
      <div style={{ background: "var(--surface-page)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Gnb selected={selected} onSelect={setSelected} />
        <main style={{ flex: 1, maxWidth: 1320, width: "100%", margin: "0 auto", padding: "24px var(--gutter) 64px", boxSizing: "border-box" }}>
          <Boundary key={selected}>{stage}</Boundary>
        </main>
        <Footer />
        {fs && <FullscreenModal screen={fs.screen} side={fs.side} setSide={setModalSide} onClose={closeFs} onGo={() => { closeFs(); setSelected("robotEra"); window.scrollTo({ top: 0 }); }} />}
      </div>);

  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();