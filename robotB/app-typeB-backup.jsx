/* NAMUH X — 로봇 › 처음 만나는 웰니스 로봇 (Type B)
   라이트 이퀄라이저 배경 · 이미지 마스크 헤드라인 · 가로 스크롤 카드 · 모달 · 블루 미래 섹션 */
(function () {
  const { useState, useEffect, useRef } = React;
  const MINT = "var(--ws-mint)";
  const BLUE = "var(--ws-blue)";
  const BLACK = "var(--ws-black)";

  const NAV = ["로봇", "스토어", "브랜드", "고객지원", "함께 만드는 로봇 세상"];
  const SUBTABS = ["처음 만나는 웰니스 로봇", "나를 위한 맞춤 케어", "빈틈없는 공간 케어", "매일 진화하는 AI"];

  const CARDS = [
    { key: "talk", title: "대화가 통합니다.", sub: "음성만으로 알아듣고, 상황에 맞게 대화하며 필요한 일까지 해냅니다.",
      img: "assets/robotB/card-talk.jpg", media: "assets/robotB/card-talk.jpg",
      caption: "먼저 말을 알아듣고, 대화의 맥락을 이해합니다.", note: "" },
    { key: "move", title: "스스로 움직입니다.", sub: "집안 곳곳을 스스로 살피며 필요한 곳으로 다가갑니다.",
      img: "assets/robotB/card-move.jpg", media: "assets/robotB/card-move.jpg",
      caption: "자율주행으로 집안을 이동하며 케어합니다.", note: "" },
    { key: "air", title: "공기까지 챙깁니다.", sub: "집안 곳곳의 에어센서로 실내 오염물질을 빠짐없이 감지하고 케어합니다.",
      img: "assets/robotB/card-air.jpg", media: "assets/robotB/modal-air.jpg",
      caption: "집안 곳곳의 에어센서가 실내 주요 오염물질 6종 및 이산화탄소, 온·습도까지 빠짐없이 감지하고",
      note: "(미세먼지 3종_PM1.0, 2.5, 10, 질소산화물, 포름알데히드, 총휘발성유기화합물 4종, 이산화탄소)" },
    { key: "know", title: "나를 알아갑니다.", sub: "Vital Sign을 확인하고, 나에게 맞춰 하루를 케어합니다.",
      img: "assets/robotB/card-know.jpg", media: "assets/robotB/card-know.jpg",
      caption: "카메라를 정면으로 바라보면 Vital Sign을 측정합니다.", note: "" },
    { key: "safe", title: "안전하게 지킵니다.", sub: "데이터는 기기 안에서만 처리·암호화하고, 국제 보안 인증으로 보호합니다.",
      img: "assets/robotB/card-safe.jpg", media: "assets/robotB/modal-safe.jpg",
      caption: "Security & Safety의 혁신 · 온디바이스 & 관제 시스템",
      note: "글로벌 ISO 27001 보안 인증 · EY 글로벌 컨설팅 그룹 최고 수준 보안 적용 · 버그바운티(해킹 경연) 상시 점검" },
  ];

  const Arrow = ({ s = 16, c = "currentColor" }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
  const Wordmark = ({ size = 20, light = true }) => (
    <span style={{ fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color: light ? "#fff" : BLACK, lineHeight: 1 }}>
      NAMUH<sup style={{ color: MINT, fontSize: size * 0.55, fontWeight: 700 }}>X</sup>
    </span>
  );

  /* ---------- 이퀄라이저 배경 ---------- */
  function EqualizerBg({ tone }) {
    const bars = 92;
    const blue = tone === "blue";
    return (
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "70%", display: "flex", alignItems: "flex-end" }}>
          {[...Array(bars)].map((_, i) => {
            const t = i / (bars - 1);
            const env = 0.28 + 0.72 * Math.pow(Math.abs(t - 0.5) * 2, 1.7);
            const jit = 0.72 + 0.28 * Math.abs(Math.sin(i * 1.7));
            const h = Math.max(5, env * jit * 100);
            return (
              <div key={i} className="tb-eqbar" style={{
                flex: 1, height: h + "%", margin: "0 1px", borderRadius: "2px 2px 0 0", transformOrigin: "bottom",
                background: blue
                  ? "linear-gradient(to top, rgba(133,225,210,.5), rgba(133,225,210,0))"
                  : "linear-gradient(to top, rgba(133,225,210,.62), rgba(133,225,210,0))",
                animation: `tb-eq ${3.4 + (i % 9) * 0.6}s ease-in-out ${(i % 13) * 0.18}s infinite`,
              }}></div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- 헤드라인 이미지 마스크 필 ---------- */
  function HeadPill({ kind }) {
    const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle", borderRadius: "999px", position: "relative", margin: "0 .1em", top: "-.04em" };
    if (kind === "robot")
      return (
        <span style={{ ...base, width: "2.15em", height: ".9em", background: BLUE, overflow: "visible" }}>
          <img src="assets/robotB/pill-robot.jpg" alt="" style={{ position: "absolute", right: ".18em", bottom: 0, height: "1.26em", width: "auto", filter: "drop-shadow(0 6px 14px rgba(0,0,0,.4))" }} />
        </span>
      );
    if (kind === "family" || kind === "child")
      return (
        <span style={{ ...base, width: "2.3em", height: ".9em", background: MINT, overflow: "hidden" }}>
          <img src="assets/robotB/pill-family.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: kind === "child" ? "78% 32%" : "center" }} />
        </span>
      );
    return (
      <span style={{ ...base, minWidth: "3.3em", height: ".9em", padding: "0 .55em", background: BLACK, overflow: "hidden" }}>
        <span style={{ fontWeight: 700, color: "#fff", fontSize: ".42em", letterSpacing: ".02em" }}>NAMUH<sup style={{ color: MINT, fontSize: ".6em" }}>X</sup></span>
      </span>
    );
  }

  /* ---------- GNB ---------- */
  function Gnb() {
    return (
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: 60, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(24px,4vw,56px)", background: "rgba(26,27,30,.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <Wordmark size={22} />
        <nav style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "clamp(20px,2.6vw,48px)" }}>
          {NAV.map((n, i) => (
            <span key={n} style={{ fontSize: 15, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? MINT : "rgba(255,255,255,.82)", cursor: "default", whiteSpace: "nowrap" }}>{n}</span>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 18, color: "rgba(255,255,255,.82)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 8h14l-1.2 11.5a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z" strokeLinejoin="round" /><path d="M8.5 8a3.5 3.5 0 0 1 7 0" strokeLinecap="round" /></svg>
        </div>
      </header>
    );
  }

  /* ---------- 히어로 ---------- */
  function Hero() {
    return (
      <section id="hero" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#08090b", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/robotB/hero-full.jpg" alt="웰니스 로봇" style={{ display: "block", width: "100%", height: "auto", animation: "tb-fade 1.1s ease both" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(8,9,11,.98) 0%, rgba(8,9,11,.9) 32%, rgba(8,9,11,.45) 48%, rgba(8,9,11,0) 62%), linear-gradient(0deg, rgba(8,9,11,.72) 0%, rgba(8,9,11,.2) 30%, transparent 46%)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", left: "clamp(24px,5vw,88px)", bottom: "clamp(120px,17vh,180px)", maxWidth: 660, zIndex: 2, animation: "tb-rise 1s cubic-bezier(.22,.61,.36,1) .25s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 3, height: 42, background: MINT, borderRadius: 2 }}></span>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.02em", color: MINT }}>Wellness Robot</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(22px,2.6vw,38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.28, color: "#fff" }}>기술이 사람에게 먼저 다가옵니다.</h1>
          <p style={{ margin: "16px 0 0", fontSize: "clamp(13px,1vw,16px)", lineHeight: 1.6, color: "rgba(255,255,255,.66)" }}>스스로 다가와 당신을 알아보고, 하루를 맞춰 케어하는 웰니스 로봇입니다.</p>
        </div>
      </section>
    );
  }

  /* ---------- 하단 서브탭 (고정) ---------- */
  function SubTabs({ dark, hidden }) {
    return (
      <div style={{ position: "fixed", left: "50%", bottom: 22, transform: `translateX(-50%) translateY(${hidden ? 90 : 0}px)`, zIndex: 60, display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: dark ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.62)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: dark ? "1px solid rgba(255,255,255,.16)" : "1px solid rgba(0,0,0,.06)", boxShadow: "0 10px 34px rgba(0,0,0,.16)", transition: "transform .4s var(--ease-out), background .4s, border-color .4s", opacity: hidden ? 0 : 1 }}>
        {SUBTABS.map((t, i) => i === 0 ? (
          <span key={t} style={{ padding: "12px 22px", borderRadius: 999, background: BLACK, color: MINT, fontWeight: 700, fontSize: 14, boxShadow: "0 6px 18px rgba(0,0,0,.32)" }}>{t}</span>
        ) : (
          <span key={t} style={{ padding: "12px 18px", fontSize: 14, fontWeight: 600, color: dark ? "rgba(255,255,255,.78)" : "rgba(30,30,35,.6)", cursor: "default" }}>{t}</span>
        ))}
      </div>
    );
  }

  /* ---------- 오늘 (이미지 마스크 헤드라인) ---------- */
  function IntroToday() {
    return (
      <section style={{ position: "relative", minHeight: "94vh", background: "#ededed", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <EqualizerBg tone="light" />
        <h2 className="reveal" data-reveal style={{ position: "relative", zIndex: 2, margin: 0, textAlign: "center", fontSize: "clamp(40px,5.6vw,88px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.5, color: "#141414", whiteSpace: "nowrap" }}>
          오늘, 나무엑스가 <HeadPill kind="robot" /><br />
          <HeadPill kind="family" /> 당신을 위해<br />
          하는 일입니다. <HeadPill kind="dark" />
        </h2>
      </section>
    );
  }

  /* ---------- 카드 ---------- */
  function Card({ c, onOpen }) {
    const [hv, setHv] = useState(false);
    return (
      <button onClick={onOpen} onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)}
        style={{ flex: "0 0 auto", width: "clamp(360px,44vh,540px)", height: "clamp(360px,44vh,540px)", borderRadius: 26, overflow: "hidden", position: "relative", border: "none", cursor: "pointer", padding: 0, background: "#111", fontFamily: "inherit", transform: hv ? "translateY(-8px)" : "none", boxShadow: hv ? "0 28px 64px rgba(0,0,0,.3)" : "0 14px 38px rgba(0,0,0,.16)", transition: "transform .35s var(--ease-out), box-shadow .35s" }}>
        <img src={c.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: hv ? "scale(1.05)" : "scale(1)", transition: "transform .6s var(--ease-out)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.04) 42%, rgba(0,0,0,.74) 100%)" }}></div>
        <div style={{ position: "absolute", left: 26, right: 24, bottom: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(20px,1.5vw,26px)", letterSpacing: "-0.01em", textAlign: "left" }}>{c.title}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", padding: "8px 8px 8px 15px", borderRadius: 999, fontSize: 13, fontWeight: 700, transition: "all .25s", color: hv ? BLACK : "#fff", background: hv ? MINT : "transparent", border: hv ? "1px solid transparent" : "1px solid rgba(255,255,255,.55)" }}>
            더 알아보기
            <span style={{ width: 24, height: 24, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: hv ? BLACK : "#fff", color: hv ? "#fff" : BLACK }}><Arrow s={13} /></span>
          </span>
        </div>
      </button>
    );
  }

  /* ---------- 오늘 + 카드 (한 화면 병합 · 좌 헤드라인 / 우 가로 롤링) ---------- */
  function CardsScroll({ onOpen }) {
    const wrapRef = useRef(null), trackRef = useRef(null);
    const [tx, setTx] = useState(0);
    useEffect(() => {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const wrap = wrapRef.current, track = trackRef.current;
          if (!wrap || !track) return;
          const total = wrap.offsetHeight - window.innerHeight;
          const raw = Math.min(1, Math.max(0, (-wrap.getBoundingClientRect().top) / total));
          const HOLD = 0.28; // 진입 직후 잠시 멈춰 한 번 보이게
          const HOLD_END = 0.16; // 마지막 카드에서 한 번 멈췄다가 아래로
          const prog = raw <= HOLD ? 0 : raw >= (1 - HOLD_END) ? 1 : (raw - HOLD) / ((1 - HOLD_END) - HOLD);
          const vis = track.parentElement ? track.parentElement.clientWidth : window.innerWidth;
          const maxX = Math.max(0, track.scrollWidth - vis + 40);
          setTx(prog * maxX);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    }, []);
    return (
      <section ref={wrapRef} style={{ position: "relative", height: "420vh", background: "#ededed" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <EqualizerBg tone="light" />
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", gap: "clamp(16px,2vw,40px)" }}>
            <div style={{ flex: "0 0 clamp(320px,38%,600px)", paddingLeft: "clamp(32px,5vw,104px)" }}>
              <h2 className="reveal" data-reveal style={{ margin: 0, textAlign: "left", fontSize: "clamp(30px,3.4vw,58px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.5, color: "#141414", whiteSpace: "nowrap" }}>
                오늘, 나무엑스가 <HeadPill kind="robot" /><br />
                <HeadPill kind="family" /> 당신을 위해<br />
                하는 일입니다. <HeadPill kind="dark" />
              </h2>
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <div ref={trackRef} style={{ display: "flex", gap: "clamp(20px,2.2vw,38px)", paddingRight: "clamp(40px,6vw,120px)", transform: `translateX(${-tx}px)`, willChange: "transform" }}>
                {CARDS.map((c, i) => <Card key={c.key} c={c} onOpen={() => onOpen(i)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- 모달 ---------- */
  function Modal({ index, setIndex, onClose }) {
    const c = CARDS[index];
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") setIndex((index + 1) % CARDS.length);
        if (e.key === "ArrowLeft") setIndex((index + CARDS.length - 1) % CARDS.length);
      };
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [index]);
    const RB = ({ dir }) => (
      <button onClick={() => setIndex((index + (dir > 0 ? 1 : CARDS.length - 1)) % CARDS.length)} aria-label={dir > 0 ? "다음" : "이전"}
        style={{ width: 46, height: 46, borderRadius: "50%", border: "1px solid var(--border-default,#d6d8dd)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: BLACK }}>
        <span style={{ transform: dir > 0 ? "none" : "scaleX(-1)", display: "inline-flex" }}><Arrow s={16} /></span>
      </button>
    );
    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(18,20,24,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,56px)" }}>
        <div onClick={(e) => e.stopPropagation()} key={index} style={{ width: "min(1080px,100%)", maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 24, padding: "clamp(24px,3vw,42px)", boxShadow: "0 40px 100px rgba(0,0,0,.42)", animation: "tb-modalIn .42s var(--ease-out) both" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "clamp(22px,2vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#141414" }}>{c.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14.5, color: "var(--text-muted,#6b7078)", lineHeight: 1.55 }}>{c.sub}</p>
            </div>
            <button onClick={onClose} aria-label="닫기" style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "#141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div style={{ position: "relative", marginTop: 22, borderRadius: 14, overflow: "hidden", aspectRatio: "16 / 8.3", background: "#111" }}>
            <img src={c.media} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.05) 45%, rgba(0,0,0,.5) 100%)" }}></div>
            <div style={{ position: "absolute", left: "clamp(18px,3vw,44px)", bottom: "clamp(16px,3vw,40px)", maxWidth: "62%" }}>
              <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "clamp(14px,1.3vw,20px)", lineHeight: 1.4, textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>{c.caption}</p>
              {c.note && <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.72)", fontSize: 11.5, lineHeight: 1.5 }}>{c.note}</p>}
            </div>
            <span style={{ position: "absolute", right: 16, bottom: 12, color: "rgba(255,255,255,.6)", fontSize: 10.5 }}>* 본 영상은 제품 구동의 이해를 돕기 위해 연출되었습니다. 실제 제품의 작동과 다를 수 있습니다.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 22 }}>
            <div style={{ flex: 1, display: "flex", gap: 6 }}>
              {CARDS.map((_, i) => (
                <span key={i} onClick={() => setIndex(i)} style={{ flex: 1, height: 3, borderRadius: 2, cursor: "pointer", background: i === index ? BLACK : "#dcdee2" }}></span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}><RB dir={-1} /><RB dir={1} /></div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- 아이콘 (진화 카드) ---------- */
  const IconVoice = () => (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30c-4 0-7-3-7-8s3-9 8-9 8 3 8 8" /><path d="M13 30c0 4 3 7 7 7" />
      <path d="M31 16c2 2 3 5 3 8s-1 6-3 8" opacity=".9" /><path d="M35 12c3 3 5 7 5 12s-2 9-5 12" opacity=".55" />
    </svg>
  );
  const IconArm = () => (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="12" r="3" /><path d="M14 15l6 9 9 3" /><path d="M29 27l5-4" /><rect x="33" y="20" width="8" height="7" rx="1.5" transform="rotate(28 37 23)" />
    </svg>
  );

  function EvoCard({ icon, title, desc, no }) {
    return (
      <div className="reveal" data-reveal style={{ position: "relative", flex: "0 0 clamp(358px,30.4vw,525px)", height: "clamp(240px,32vh,360px)", borderRadius: 22, padding: "38px 40px 34px", background: "#0a1a38", border: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "auto" }}>{icon}</div>
        <h4 style={{ margin: "22px 0 0", fontSize: "clamp(24px,2vw,34px)", fontWeight: 700, color: MINT, letterSpacing: "-0.01em" }}>{title}</h4>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
          <p style={{ margin: 0, fontSize: "clamp(15px,1.15vw,18px)", lineHeight: 1.6, color: "rgba(255,255,255,.72)", whiteSpace: "pre-line" }}>{desc}</p>
          <span style={{ fontSize: 38, fontWeight: 700, color: "rgba(255,255,255,.35)", lineHeight: 1 }}>{no}</span>
        </div>
      </div>
    );
  }

  /* ---------- 내일 (블루 미래 섹션 · 좌 헤드라인 / 우 가로 롤링) ---------- */
  function TomorrowBlue() {
    const wrapRef = useRef(null), trackRef = useRef(null);
    const [tx, setTx] = useState(0);
    useEffect(() => {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const wrap = wrapRef.current, track = trackRef.current;
          if (!wrap || !track) return;
          const total = wrap.offsetHeight - window.innerHeight;
          const raw = Math.min(1, Math.max(0, (-wrap.getBoundingClientRect().top) / total));
          const HOLD = 0.28, HOLD_END = 0.16;
          const prog = raw <= HOLD ? 0 : raw >= (1 - HOLD_END) ? 1 : (raw - HOLD) / ((1 - HOLD_END) - HOLD);
          const vis = track.parentElement ? track.parentElement.clientWidth : window.innerWidth;
          const maxX = Math.max(0, track.scrollWidth - vis + 40);
          setTx(prog * maxX);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    }, []);
    return (
      <section ref={wrapRef} style={{ position: "relative", height: "420vh", background: BLUE }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <EqualizerBg tone="blue" />
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", gap: "clamp(16px,2vw,40px)" }}>
            <div style={{ flex: "0 0 clamp(320px,38%,600px)", paddingLeft: "clamp(32px,5vw,104px)" }}>
              <h2 className="reveal" data-reveal style={{ margin: 0, textAlign: "left", fontSize: "clamp(26px,2.7vw,44px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.5, color: "#fff", whiteSpace: "nowrap" }}>
                내일, 나무엑스가 <HeadPill kind="robot" /><br />
                <HeadPill kind="child" /> 당신의 일상에 더할<br />
                변화입니다. <HeadPill kind="dark" />
              </h2>
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <div ref={trackRef} style={{ display: "flex", gap: "clamp(20px,2.2vw,38px)", paddingRight: "clamp(40px,6vw,120px)", transform: `translateX(${-tx}px)`, willChange: "transform" }}>
                <EvoCard icon={<IconVoice />} title="먼저 말을 건넵니다." desc={"묻기 전에 알아차리고,\n필요한 순간 먼저 챙깁니다."} no="01" />
                <EvoCard icon={<IconArm />} title="손길까지 더합니다." desc={"물건을 집고 건네며 돕는\n차세대 모델을 준비합니다."} no="02" />
                <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ position: "relative", overflow: "hidden", borderRadius: 22, background: MINT, flex: "0 0 clamp(448px,38vw,656px)", height: "clamp(240px,32vh,360px)", padding: "38px 40px 34px", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                  <h4 style={{ margin: 0, fontSize: "clamp(20px,1.6vw,27px)", fontWeight: 700, color: BLACK, letterSpacing: "-0.015em", lineHeight: 1.32 }}>나를 위한 로봇<br />만나러 가기</h4>
                  <span style={{ marginTop: 20, width: 46, height: 46, borderRadius: "50%", background: BLACK, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}><Arrow s={17} c="#fff" /></span>
                  <img src="assets/robotB/evo-robot.jpg" alt="" style={{ position: "absolute", right: 0, bottom: 0, height: "70%", width: "auto" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- 푸터 ---------- */
  function Footer() {
    const links = ["이용약관", "개인정보처리방침", "BIZ임직원등록", "계약서안내", "소비자분쟁해결기준", "오픈소스 라이선스", "사이트맵"];
    return (
      <footer style={{ background: "#151619", color: "rgba(255,255,255,.62)", padding: "clamp(48px,6vw,72px) clamp(24px,5vw,64px) clamp(60px,7vw,90px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <Wordmark size={22} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", margin: "26px 0 22px" }}>
              {links.map((l, i) => <span key={l} style={{ fontSize: 13.5, color: i === 1 ? "#fff" : "rgba(255,255,255,.82)", fontWeight: i === 1 ? 700 : 500 }}>{l}</span>)}
            </div>
            <p style={{ margin: "0 0 6px", fontSize: 12.5 }}>SK인텔릭스(주) 대표이사 : 안무인</p>
            <p style={{ margin: "0 0 6px", fontSize: 12.5 }}>주소 : 서울특별시 종로구 청계천로 85(관철동) 삼일빌딩 18층 &nbsp;|&nbsp; 사업자등록번호 : 104-86-48203 &nbsp;<span style={{ textDecoration: "underline" }}>사업자정보확인</span></p>
            <p style={{ margin: "0 0 18px", fontSize: 12.5 }}>통신판매업신고번호 : 제 2021-서울종로-0814호</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,.4)" }}>2026 Copyrights ©SK인텔릭스(주) All Rights Reserved.</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: "0 0 22px", fontSize: 14.5, fontWeight: 700, color: MINT, display: "flex", alignItems: "center", gap: 6 }}>서비스 센터 찾기 <Arrow s={14} c="var(--ws-mint)" /></p>
            <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "#fff" }}>고객센터</p>
            <p style={{ margin: "0 0 10px", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>1600 - 1937</p>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7 }}>평일: 09시 ~ 18시<br />토요일: 09시 ~ 13시<br />(토요일, 일요일, 공휴일 휴무)</p>
          </div>
        </div>
      </footer>
    );
  }

  /* ---------- FAB / TOP ---------- */
  function Fabs() {
    return (
      <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 70, display: "flex", flexDirection: "column", gap: 12 }}>
        <button aria-label="메뉴" style={{ width: 54, height: 54, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="6" height="24" viewBox="0 0 6 24" fill="#141414"><circle cx="3" cy="4" r="2.4" /><circle cx="3" cy="12" r="2.4" /><circle cx="3" cy="20" r="2.4" /></svg>
        </button>
        <button aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ width: 54, height: 54, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.2)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, color: "#141414" }}>
          <svg width="14" height="9" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7" /></svg>
          <span style={{ fontSize: 10, fontWeight: 700 }}>TOP</span>
        </button>
      </div>
    );
  }

  /* ---------- App ---------- */
  function App() {
    const [modal, setModal] = useState(null);
    const [darkTabs, setDarkTabs] = useState(true);
    const [hideTabs, setHideTabs] = useState(false);
    const embedded = typeof window !== "undefined" && window.self !== window.top;
    const forceGnb = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("full") === "1";
    const showGnb = !embedded || forceGnb;

    useEffect(() => {
      const onScroll = () => {
        setDarkTabs(window.scrollY < window.innerHeight * 0.85);
        const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - window.innerHeight * 0.7;
        setHideTabs(nearBottom);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
      const els = document.querySelectorAll("[data-reveal]");
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.2 });
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, []);

    return (
      <React.Fragment>
        {showGnb && <Gnb />}
        <Hero />
        <CardsScroll onOpen={(i) => setModal(i)} />
        <TomorrowBlue />
        <Footer />
        <SubTabs dark={darkTabs} hidden={hideTabs} />
        <Fabs />
        {modal !== null && <Modal index={modal} setIndex={setModal} onClose={() => setModal(null)} />}
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
