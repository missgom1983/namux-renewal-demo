/* NAMUH X 리뉴얼 — 화면 뷰어 (AS-IS/TO-BE 토글 + 전체화면 + 브랜드 필름 히어로)
   window.ScreenViewer, window.FullscreenModal */
(function () {
  const { useEffect, useState, useRef } = React;

  /* 세그먼트 토글 (AS-IS / TO-BE) */
  function Toggle({ screen, side, setSide, dark = false }) {
    const items = [["asis", screen.asis], ["tobe", screen.tobe]];
    const trackBg = dark ? "rgba(255,255,255,.10)" : "var(--gray-100)";
    return (
      <div style={{ display: "inline-flex", padding: 4, background: trackBg, borderRadius: "var(--radius-pill)", gap: 4 }}>
        {items.map(([k, s]) => {
          const on = side === k;
          const onBg = k === "tobe" ? "var(--ws-mint)" : (dark ? "#fff" : "var(--ws-black)");
          const onFg = k === "tobe" ? "var(--ws-black)" : (dark ? "var(--ws-black)" : "#fff");
          return (
            <button key={k} onClick={() => setSide(k)} style={{
              display: "flex", alignItems: "center", gap: 8, cursor: "pointer", border: "none", whiteSpace: "nowrap",
              padding: "9px 18px", borderRadius: "var(--radius-pill)",
              background: on ? onBg : "transparent",
              color: on ? onFg : (dark ? "rgba(255,255,255,.66)" : "var(--text-muted)"),
              transition: "all var(--dur-fast) var(--ease-out)",
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", opacity: on ? .7 : .9 }}>{s.tag}</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em" }}>{s.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  function EndNote({ text }) {
    if (!text) return null;
    return (
      <div style={{
        marginTop: -4, padding: "40px 24px", textAlign: "center",
        background: "repeating-linear-gradient(135deg, var(--gray-100) 0 14px, var(--gray-50) 14px 28px)",
        color: "var(--text-faint)", fontSize: 13, fontWeight: 600, lineHeight: 1.6,
      }}>{text}</div>
    );
  }

  function ExpandIcon({ size = 16 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    );
  }
  function CloseBtn({ onClose, style }) {
    return (
      <button onClick={onClose} aria-label="닫기" style={{
        width: 42, height: 42, borderRadius: "50%", cursor: "pointer", flexShrink: 0,
        background: "rgba(8,9,11,.55)", border: "1px solid rgba(255,255,255,.28)", color: "#fff", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", ...style,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    );
  }

  /* ---- 개선/변화 위치 체크 마커 (영역 박스 대신 가벼운 표시) ---- */
  function HighlightMark({ at, label, n, tone }) {
    const c = tone === "issue" ? "#E0A23B" : "var(--ws-mint)";
    const onLeft = at.x > 55;
    return (
      <div style={{ position: "absolute", left: at.x + "%", top: at.y + "%", zIndex: 4, pointerEvents: "none", animation: "hf-mark .45s var(--ease-out)" }}>
        <span style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%,-50%)", width: 30, height: 30, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(10,11,13,.32)" }}>
          <span style={{ position: "absolute", inset: -7, borderRadius: "50%", border: "2px solid " + c, animation: "hf-ring 1.5s var(--ease-out)" }}></span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ws-black)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <span style={{ position: "absolute", top: 0, transform: "translateY(-50%)", ...(onLeft ? { right: 22 } : { left: 22 }),
          display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999,
          background: "rgba(8,9,11,.82)", color: "#fff", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap",
          boxShadow: "0 4px 14px rgba(10,11,13,.3)", backdropFilter: "blur(4px)" }}>
          <span style={{ color: c, fontSize: 11, fontWeight: 800 }}>{n}</span>{label}
        </span>
      </div>
    );
  }

  /* 인라인 화면 뷰어 */
  function ScreenViewer({ screen, side, setSide, onFullscreen, focus }) {
    const s = screen[side];
    const scrollRef = useRef(null);
    const [ai, setAi] = useState(false);
    const hasAi = side === "tobe" && s.splitView && s.splitView.aiScreen;
    const list = side === "tobe" ? screen.changes : screen.issues;
    const fb = focus && list && list[focus.idx] ? list[focus.idx] : null;

    useEffect(() => {
      if (!fb || !fb.box) return;
      const t = setTimeout(() => {
        const el = scrollRef.current; if (!el) return;
        const img = el.querySelector("img");
        const base = el.clientWidth * (s.ratio || 1);
        const cy = fb.box.y + fb.box.h / 2;
        const target = (cy / 100) * base - el.clientHeight / 2;
        el.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
      }, 220);
      return () => clearTimeout(t);
    }, [focus, side]);

    return (
      <div style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--surface-card)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          <Toggle screen={screen} side={side} setSide={setSide} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
              스크롤하여 전체 보기
            </span>
            <button onClick={onFullscreen} style={{
              display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer",
              padding: "8px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)",
              background: "var(--surface-card)", color: "var(--text-strong)", fontSize: 13, fontWeight: 700,
            }}>
              <ExpandIcon /> 전체화면
            </button>
          </div>
        </div>
        <div ref={scrollRef} style={{ position: "relative", maxHeight: "calc(100vh - 250px)", minHeight: 360, overflowY: "auto", background: "var(--gray-50)" }}>
          <div style={{ position: "relative" }}>
            <img src={s.src} alt={s.label} draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />
            {fb && fb.box && <HighlightMark at={{ x: fb.box.x + fb.box.w / 2, y: fb.box.y + fb.box.h / 2 }} label={fb.label} n={focus.idx + 1} tone={side === "tobe" ? "change" : "issue"} />}
          </div>
          {side === "asis" && <EndNote text={s.endNote} />}
        </div>
        {ai && <AIReviewOverlay onClose={() => setAi(false)} />}
      </div>
    );
  }

  /* ===== 브랜드 필름 전체화면 (실제 페이지처럼 스크롤) =====
     히어로 밴드(이미지의 HT%~HB%)에서 영상 재생 → 10초/스킵 시 로사시 배너로 전환,
     CTA는 배너 위에. 영상 중에도, 배너 전환 후에도 자유 스크롤 가능. */
  const HT = 1.2;   // 민트 KV 히어로 상단 (GNB 바로 아래)
  const HB = 14.1;  // 민트 KV 히어로 하단 (이 구간이 16:9, 영상 원본비율과 일치)

  function HeroFilm({ data, onClose, onGo }) {
    const LIMIT = 10;
    const [phase, setPhase] = useState("film"); // film | banner
    const [pct, setPct] = useState(0);
    const vidRef = useRef(null);
    const scrollRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
      const el = scrollRef.current; if (!el) return;
      const align = () => {
        const img = imgRef.current;
        const h = img && img.clientHeight ? img.clientHeight : el.clientWidth * (data.ratio || (8069 / 1920));
        el.scrollTo({ top: Math.max(0, h * (HT / 100) - 1), behavior: "auto" });
      };
      align();
      const t1 = setTimeout(align, 80);
      const t2 = setTimeout(align, 260);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useEffect(() => {
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [onClose]);

    useEffect(() => {
      if (phase !== "film") return;
      const v = vidRef.current; if (!v) return;
      try { v.currentTime = 0; } catch (e) {}
      const pr = v.play(); if (pr && pr.catch) pr.catch(() => {});
      const onTime = () => {
        setPct(Math.min(100, (v.currentTime / LIMIT) * 100));
        if (v.currentTime >= LIMIT) { v.pause(); setPhase("banner"); }
      };
      const onEnded = () => setPhase("banner");
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("ended", onEnded);
      const t = setTimeout(() => setPhase("banner"), (LIMIT + 0.4) * 1000);
      return () => { v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnded); clearTimeout(t); };
    }, [phase]);

    const scrollToContent = () => {
      const el = scrollRef.current, img = imgRef.current; if (!el || !img) return;
      el.scrollTo({ top: img.clientHeight * (HB / 100) - 8, behavior: "smooth" });
    };
    const replay = () => { setPct(0); setPhase("film"); const el = scrollRef.current; if (el) el.scrollTo({ top: 0, behavior: "smooth" }); };

    const showFilm = phase === "film";

    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "#000" }}>
        {/* 스크롤 페이지 */}
        <div ref={scrollRef} style={{ position: "absolute", inset: 0, overflowY: "auto", background: "#000" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <img ref={imgRef} src={data.heroBanner} alt="리뉴얼 메인" draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />

            {/* 영상 재생 중 — 상단(꾸미기 배너 + GNB) 가림 */}
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: HT + "%", background: "#000",
              opacity: showFilm ? 1 : 0, transition: "opacity 2000ms cubic-bezier(.4,0,.2,1)", pointerEvents: "none", zIndex: 2 }}></div>

            {/* 히어로 밴드 — 영상 (재생 중엔 화면 전체를 채움) */}
            <div style={{ position: "fixed", inset: 0, zIndex: 3,
              opacity: showFilm ? 1 : 0, transform: showFilm ? "scale(1)" : "scale(1.045)", transformOrigin: "50% 42%",
              filter: showFilm ? "blur(0px)" : "blur(3px)",
              transition: "opacity 2000ms cubic-bezier(.4,0,.2,1), transform 2200ms cubic-bezier(.4,0,.2,1), filter 1600ms ease-out",
              pointerEvents: showFilm ? "auto" : "none", overflow: "hidden" }}>
              <video ref={vidRef} src={data.heroVideo} muted playsInline autoPlay preload="auto"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.28) 0%, transparent 30% 64%, rgba(0,0,0,.42) 100%)" }}></div>
              <div style={{ position: "absolute", left: "clamp(16px,4vw,40px)", bottom: 18, display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--ws-mint)" }}>BRAND FILM</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.85)" }}>로봇과 사는 시대</span>
              </div>
              <div style={{ position: "absolute", right: "clamp(16px,4vw,40px)", bottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.78)" }}>{Math.max(0, Math.ceil(LIMIT - pct / 100 * LIMIT))}초 후 배너 전환</span>
                <button onClick={() => setPhase("banner")} style={{ cursor: "pointer", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,.32)", background: "rgba(0,0,0,.35)", color: "#fff", fontSize: 13, fontWeight: 700 }}>건너뛰기 →</button>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(255,255,255,.2)" }}>
                <div style={{ height: "100%", width: pct + "%", background: "var(--ws-mint)", transition: "width 120ms linear" }}></div>
              </div>
            </div>

            {/* 히어로 밴드 — 로사시 배너 위 CTA */}
            <div style={{ position: "absolute", left: 0, width: "100%", top: (HB - 3.0) + "%", transform: "translateY(-50%)",
              display: "flex", justifyContent: "flex-end", padding: "0 clamp(20px,5vw,72px)", boxSizing: "border-box",
              opacity: showFilm ? 0 : 1, transition: "opacity 800ms var(--ease-out) 1500ms",
              pointerEvents: showFilm ? "none" : "auto" }}>
              <button onClick={() => { onGo ? onGo() : scrollToContent(); }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                style={{
                cursor: "pointer", position: "relative", display: "inline-flex", alignItems: "center", gap: 13,
                padding: "18px 20px 18px 28px", borderRadius: 999, border: "2px solid rgba(255,255,255,.9)",
                background: "var(--ws-mint)", color: "var(--ws-black)",
                fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em",
                boxShadow: "0 14px 40px rgba(8,9,11,.55), 0 0 0 6px rgba(8,9,11,.28)",
                transition: "transform 220ms var(--ease-out)", animation: "rb-cta 2.2s ease-in-out infinite",
              }}>
                <span style={{ position: "absolute", inset: -3, borderRadius: 999, border: "2px solid var(--ws-mint)", animation: "rb-cta-ring 2.2s ease-out infinite", pointerEvents: "none" }}></span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>
                  로사시 캠페인 보러가기
                </span>
                <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ws-black)", color: "var(--ws-mint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "rb-cta-arrow 1.6s ease-in-out infinite" }}><path d="M12 5v14M6 13l6 6 6-6"/></svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 상단 컨트롤 (고정) */}
        <div style={{ position: "fixed", top: 16, left: 18, right: 18, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", display: "flex", gap: 10 }}>
            {!showFilm && (
              <button onClick={replay} style={{ cursor: "pointer", height: 42, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,.28)", background: "rgba(8,9,11,.55)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 12.5, fontWeight: 700 }}>↺ 영상 다시</button>
            )}
            <CloseBtn onClose={onClose} />
          </div>
        </div>
      </div>
    );
  }

  /* ---- AI 리뷰 기능 쇼케이스 (PDP 전체화면 장치) ---- */
  function AIReviewOverlay({ onClose }) {
    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 950, background: "rgba(8,9,11,.72)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)" }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: "min(420px,100%)", maxHeight: "100%", overflowY: "auto", background: "#fff", borderRadius: 20, boxShadow: "var(--shadow-lg)", position: "relative" }}>
          <button onClick={onClose} aria-label="닫기" style={{ position: "sticky", top: 12, left: "100%", marginRight: 12, marginTop: 12, width: 34, height: 34, borderRadius: "50%", cursor: "pointer", background: "rgba(8,9,11,.6)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <img src="assets/ai-review.png" alt="AI 리뷰 요약" draggable={false} style={{ display: "block", width: "100%", height: "auto", marginTop: -46 }} />
        </div>
      </div>
    );
  }

  /* ---- 좌우 50% 독립 스크롤 (PDP 리뉴얼 전체화면) ----
     GNB는 상단에 통째로, 그 아래 본문을 가운데서 갈라 좌/우 절반을 각각 독립 스크롤 */
  function SplitView({ s }) {
    const sv = s.splitView;
    const [ai, setAi] = useState(false);
    const Col = ({ half, label }) => (
      <div style={{ flex: 1, minWidth: 0, position: "relative", overflowY: "auto", overflowX: "hidden", background: "#fff" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "center", padding: "10px 0",
          background: "linear-gradient(180deg, rgba(8,9,11,.6), transparent)", pointerEvents: "none" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 999,
            background: "rgba(8,9,11,.78)", color: "#fff", fontSize: 12.5, fontWeight: 700, backdropFilter: "blur(6px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ws-mint)" }}></span>{label}
          </span>
        </div>
        <div style={{ position: "relative", width: "200%", marginLeft: half === "right" ? "-100%" : 0, marginTop: -44 }}>
          <img src={sv.body} alt={s.label} draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />
          {half === "left" && (
            <React.Fragment>
              <button onClick={() => setAi(true)} aria-label="리뷰 탭 영역 — AI 리뷰 요약 열기"
                style={{ position: "absolute", left: "1.5%", top: "37.0%", width: "30%", height: "2.0%", zIndex: 4, cursor: "pointer", border: "none", background: "transparent" }}>
              </button>
              <button onClick={() => setAi(true)}
                aria-label="AI 리뷰 요약 열기"
                style={{ position: "absolute", left: "22.5%", top: "37.2%", zIndex: 4, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px 4px 5px", borderRadius: 999,
                  border: "none", background: "var(--ws-mint)", color: "var(--ws-black)", fontSize: 10.5, fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(10,11,13,.24)", animation: "rb-cta 2.2s ease-in-out infinite" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 15, height: 15, borderRadius: 5, background: "var(--ws-black)", color: "var(--ws-mint)", fontSize: 8, fontWeight: 800 }}>AI</span>
                AI 리뷰
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
        {/* GNB 통째로 */}
        <img src={sv.gnb} alt="GNB" draggable={false} style={{ display: "block", width: "100%", height: "auto", flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,.12)" }} />
        {/* 본문 좌우 분할 (푸터 제외) */}
        <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
          <Col half="left" label={sv.left} />
          <div style={{ width: 2, background: "transparent", flexShrink: 0, position: "relative", zIndex: 3 }}>
          </div>
          <Col half="right" label={sv.right} />
        </div>
        {/* 푸터 — 전체화면에서는 화면을 가려 숨김 */}
        {ai && <AIReviewOverlay onClose={() => setAi(false)} />}
      </div>
    );
  }

  /* 전체화면 모달 */
  function FullscreenModal({ screen, side, setSide, onClose, onGo }) {
    const s = screen[side];
    const isFilm = side === "tobe" && !!s.heroVideo;
    const isSplit = side === "tobe" && !!s.splitView;

    useEffect(() => {
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [onClose]);

    if (isFilm) return <HeroFilm data={s} onClose={onClose} onGo={onGo} />;

    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(8,9,11,.94)", display: "flex", flexDirection: "column" }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#fff", minWidth: 0 }}>
            <strong style={{ fontSize: 16, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{screen.title}</strong>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{isSplit ? "좌우 영역 독립 스크롤" : screen.kicker}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Toggle screen={screen} side={side} setSide={setSide} dark />
            <CloseBtn onClose={onClose} />
          </div>
        </div>
        {isSplit ? <SplitView s={s} /> : (
          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            <div style={{ position: "relative", width: "100%", marginTop: 0 }}>
              <img src={s.src} alt={s.label} draggable={false} style={{ display: "block", width: "100%", height: "auto", background: "#fff" }} />
              {s.annots && s.annots.map((a, i) => (
                <div key={i} style={{ position: "absolute", left: a.x + "%", top: a.y + "%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
                  <span style={{ width: 2, height: (a.h || 18), background: "var(--ws-mint)" }}></span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999, background: "var(--ws-mint)", color: "var(--ws-black)", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(10,11,13,.5)" }}>{a.text}</span>
                </div>
              ))}
              {side === "asis" && <EndNote text={s.endNote} />}
            </div>
          </div>
        )}
      </div>
    );
  }

  window.ScreenViewer = ScreenViewer;
  window.FullscreenModal = FullscreenModal;
})();
