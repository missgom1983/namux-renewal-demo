/* NAMUH X — 웰니스 로봇 › 처음 만나는 웰니스 로봇
   SCENE 0 「처음 만나는 웰니스 로봇」 — 스크롤=거리 시네마틱 스토리텔링(다크)
   SEC-1 접근 → SEC-2 오늘(능력5) → SEC-3 내일(라이트 시프트) → SEC-4 CTA 브릿지
   공통장치: 로봇 앵커 · 스토리 내비게이터 · 라이트 시프트 · 플로팅 배너/FAB(유지) */
(function () {
  const { useState, useEffect, useRef } = React;
  const MINT = "var(--ws-mint)";
  const BLUE = "var(--ws-blue)";
  const BLACK = "var(--ws-black)";
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const NAV = ["웰니스 로봇", "스토어", "브랜드", "고객지원", "함께 만드는 로봇 세상"];
  const SUBTABS = ["처음 만나는 웰니스 로봇", "나를 위한 맞춤 케어", "빈틈없는 공간 케어", "매일 진화하는 AI"];
  const STORY = ["다가온다", "움직인다", "지킨다", "머문다", "성장한다"];

  const CARDS = [
    { key: "talk", tag: "대화", title: "대화가 통합니다.", lead: "혼잣말이 대화가 되는 순간",
      sub: "음성만으로 알아듣고, 상황에 맞게 대화하며 필요한 일까지 해냅니다.",
      img: "assets/robotB/card-talk.jpg", caption: "먼저 말을 알아듣고, 대화의 맥락을 이해합니다.", note: "" },
    { key: "move", tag: "이동", title: "스스로 움직입니다.", lead: "부르기 전에 길을 아는 존재",
      sub: "집 안 곳곳을 익혀, 부딪힘 없이 원하는 곳으로 갑니다.",
      img: "assets/robotB/card-move.jpg", caption: "자율주행으로 집안을 이동하며 케어합니다.", note: "" },
    { key: "air", tag: "감각", title: "공기까지 챙깁니다.", lead: "당신이 잊고 지낸 것까지",
      sub: "보고 듣는 것은 물론, 공기질과 온·습도까지 살핍니다.",
      img: "assets/robotB/card-air.jpg", caption: "집안 곳곳의 에어센서가 실내 오염물질과 온·습도까지 감지합니다.", note: "" },
    { key: "know", tag: "앎", title: "나를 알아봅니다.", lead: "매일 마주치는, 아는 사이",
      sub: "미리 등록해 둔 얼굴을 알아보고, 마주 서면 10초 만에 컨디션을 읽습니다.",
      img: "assets/robotB/card-know.jpg", caption: "사전 등록한 얼굴을 알아보고, 마주 선 순간 Vital Sign을 측정합니다.",
      metrics: ["체온", "맥박", "심장활동강도", "산소포화도", "스트레스"],
      note: "* 측정 결과는 의료 진단이 아닌 웰니스 참고용입니다." },
    { key: "safe", tag: "보안", title: "안전하게 지킵니다.", lead: "가까운 사이일수록, 지킬 것을 압니다",
      sub: "데이터는 기기 안에서만 처리·암호화하고, 국제 보안 인증으로 보호합니다.",
      img: "assets/robotB/card-safe.jpg", caption: "데이터는 기기 안에서만 처리·암호화합니다.",
      note: "ISO/IEC 27001 · KISA IoT 보안 인증" },
  ];

  /* ---------- helpers ---------- */
  function usePrefersReduced() {
    const [r, setR] = useState(false);
    useEffect(() => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      const f = () => setR(m.matches); f();
      m.addEventListener && m.addEventListener("change", f);
      return () => m.removeEventListener && m.removeEventListener("change", f);
    }, []);
    return r;
  }

  const Arrow = ({ s = 16, c = "currentColor" }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
  const Wordmark = ({ size = 20, light = true }) => (
    <span style={{ fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color: light ? "#fff" : BLACK, lineHeight: 1 }}>
      NAMUH<sup style={{ color: MINT, fontSize: size * 0.55, fontWeight: 700 }}>X</sup>
    </span>
  );

  /* ---------- 로봇 스탠드인 (실사 영상 교체용 컨테이너 분리) ---------- */
  function RobotSVG({ eye = "open", glow = 0.5 }) {
    const eyeH = eye === "smile" ? 13 : 26;
    const eyeY = eye === "smile" ? 96 : 88;
    const eyeAnim = eye === "blink" ? { animation: "s0-blink .3s ease-in-out 2", transformBox: "fill-box", transformOrigin: "center" } : {};
    return (
      <svg viewBox="0 0 220 240" width="100%" height="100%" style={{ overflow: "visible", display: "block" }} data-robot-slot>
        <defs>
          <radialGradient id="s0body" cx="40%" cy="28%" r="82%">
            <stop offset="0%" stopColor="#fbfcfe" /><stop offset="52%" stopColor="#dde5ee" /><stop offset="100%" stopColor="#a7b4c3" />
          </radialGradient>
          <radialGradient id="s0face" cx="50%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#1b2532" /><stop offset="100%" stopColor="#080c12" />
          </radialGradient>
          <filter id="s0glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="3.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="110" cy="132" rx="94" ry="100" fill={MINT} opacity={0.13 * glow} filter="url(#s0glow)" />
        <path d="M110 44 C168 44 196 92 196 138 C196 197 158 226 110 226 C62 226 24 197 24 138 C24 92 52 44 110 44 Z" fill="url(#s0body)" stroke="rgba(255,255,255,.45)" strokeWidth="1" />
        <ellipse cx="84" cy="90" rx="44" ry="24" fill="#ffffff" opacity=".32" />
        <rect x="58" y="68" width="104" height="92" rx="32" fill="url(#s0face)" />
        <g fill={MINT} filter="url(#s0glow)" style={eyeAnim}>
          <rect x="81" y={eyeY} width="12" height={eyeH} rx="6" />
          <rect x="127" y={eyeY} width="12" height={eyeH} rx="6" />
        </g>
        {eye === "smile" && <path d="M92 122 Q110 137 128 122" fill="none" stroke={MINT} strokeWidth="5" strokeLinecap="round" filter="url(#s0glow)" />}
      </svg>
    );
  }

  /* ---------- 로봇 실사진 (LED 눈 오버레이 · 스크롤 접근) ---------- */
  function RobotPhoto({ glow = 0.6, awake = false, reduce = false }) {
    const [blink, setBlink] = useState(false);
    useEffect(() => {
      if (reduce || !awake) return;
      let t;
      const loop = () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        t = setTimeout(loop, 3000 + Math.random() * 2800);
      };
      setBlink(true); setTimeout(() => setBlink(false), 160);
      t = setTimeout(loop, 1500);
      return () => clearTimeout(t);
    }, [awake, reduce]);
    // LED 클러스터 = 두 눈. 각 눈은 얀 바 2개 (제품 패널 위치, 크롭 프랙션)
    const bars = [36.4, 41.6, 58.4, 63.6];
    const barTop = 20.2, barH = 5.4, barW = 2.0;
    return (
      <div style={{ position: "relative", height: "100%", aspectRatio: "451 / 910" }}>
        <img src="assets/robotB/robot-hero.png" alt="NAMUH X 웰니스 로봇" draggable="false" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", filter: `drop-shadow(0 34px 60px rgba(0,0,0,.55)) brightness(${1 + glow * 0.14})` }} />
        {bars.map((x, i) => (
          <div key={i} aria-hidden="true" style={{ position: "absolute", left: x + "%", top: barTop + "%", width: barW + "%", height: barH + "%", transform: `translateX(-50%) scaleY(${blink ? 0.08 : 1})`, transformOrigin: "center", borderRadius: 3, background: "linear-gradient(180deg, #f2fffc, #85E1D2)", boxShadow: `0 0 7px 1px rgba(133,225,210,${0.55 + glow * 0.45}), 0 0 18px 4px rgba(133,225,210,${0.32 * glow})`, opacity: 0.4 + glow * 0.6, transition: "transform .12s ease" }}></div>
        ))}
      </div>
    );
  }

  /* ---------- 이퀕라이저 배경 ---------- */
  function EqualizerBg({ opacity = 0.5 }) {
    const bars = 88;
    return (
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "62%", display: "flex", alignItems: "flex-end" }}>
          {[...Array(bars)].map((_, i) => {
            const t = i / (bars - 1);
            const env = 0.26 + 0.74 * Math.pow(Math.abs(t - 0.5) * 2, 1.7);
            const jit = 0.72 + 0.28 * Math.abs(Math.sin(i * 1.7));
            const h = Math.max(5, env * jit * 100);
            return <div key={i} className="tb-eqbar" style={{ flex: 1, height: h + "%", margin: "0 1px", borderRadius: "2px 2px 0 0", transformOrigin: "bottom", background: "linear-gradient(to top, rgba(133,225,210,.55), rgba(133,225,210,0))", animation: `tb-eq ${3.4 + (i % 9) * 0.6}s ease-in-out ${(i % 13) * 0.18}s infinite` }}></div>;
          })}
        </div>
      </div>
    );
  }

  /* ---------- GNB ---------- */
  function Gnb() {
    return (
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: 60, zIndex: 90, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(24px,4vw,56px)", background: "rgba(10,12,16,.72)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <Wordmark size={22} />
        <nav style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "clamp(18px,2.4vw,44px)" }}>
          {NAV.map((n, i) => <span key={n} style={{ fontSize: 15, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? MINT : "rgba(255,255,255,.82)", cursor: "default", whiteSpace: "nowrap" }}>{n}</span>)}
        </nav>
        <div style={{ display: "flex", gap: 18, color: "rgba(255,255,255,.82)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 8h14l-1.2 11.5a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z" strokeLinejoin="round" /><path d="M8.5 8a3.5 3.5 0 0 1 7 0" strokeLinecap="round" /></svg>
        </div>
      </header>
    );
  }

  /* ---------- 스토리 내비게이터 (우측 세로 · 모바일 하단 도트) ---------- */
  function StoryNav({ active }) {
    return (
      <React.Fragment>
        <div className="s0-nav-side" style={{ position: "fixed", right: "clamp(18px,2.4vw,40px)", top: "50%", transform: "translateY(-50%)", zIndex: 70, display: "flex", flexDirection: "column", gap: 22 }}>
          {STORY.map((s, i) => {
            const on = i === active;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 12, fontWeight: on ? 700 : 500, letterSpacing: "-0.01em", color: on ? "#fff" : "rgba(255,255,255,.34)", transition: "color .4s", whiteSpace: "nowrap" }}>{s}</span>
                <span style={{ width: on ? 11 : 7, height: on ? 11 : 7, borderRadius: "50%", background: on ? MINT : "rgba(255,255,255,.28)", boxShadow: on ? "0 0 0 4px rgba(133,225,210,.18)" : "none", transition: "all .4s" }}></span>
              </div>
            );
          })}
        </div>
        <div className="s0-nav-dot" style={{ position: "fixed", left: "50%", bottom: 88, transform: "translateX(-50%)", zIndex: 70, display: "none", gap: 8 }}>
          {STORY.map((s, i) => <span key={s} style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 999, background: i === active ? MINT : "rgba(255,255,255,.3)", transition: "all .4s" }}></span>)}
        </div>
      </React.Fragment>
    );
  }

  /* ---------- SEC-1 · HERO 접근 ---------- */
  function Hero({ ga, reduce }) {
    const wrapRef = useRef(null);
    const [p, setP] = useState(reduce ? 1 : 0);
    const [eye, setEye] = useState(reduce ? "smile" : "open");
    const greeted = useRef(false);
    useEffect(() => {
      if (reduce) return;
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const w = wrapRef.current; if (!w) return;
          const total = w.offsetHeight - window.innerHeight;
          const prog = clamp((-w.getBoundingClientRect().top) / total, 0, 1);
          setP(prog);
          if (prog > 0.72 && !greeted.current) {
            greeted.current = true; setEye("blink");
            setTimeout(() => setEye("smile"), 900);
            ga("kv_scrub_depth", { depth: 45 });
          }
          if (prog > 0.30 && prog < 0.34) ga("kv_scrub_depth", { depth: 30 });
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll); onScroll();
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    }, [reduce]);

    const approach = clamp(p / 0.72, 0, 1);
    const scale = 0.12 + approach * (1.06 - 0.12);
    const lit = reduce ? 1 : clamp((p - 0.74) / 0.15, 0, 1);
    const hint = reduce ? 0 : clamp(1 - p / 0.4, 0, 1);

    return (
      <section ref={wrapRef} style={{ position: "relative", height: reduce ? "100vh" : "300vh", background: "#060708" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          {/* 스튜디오 암부 스포트라이트 */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(88% 68% at 50% 40%, rgba(78,82,90,.55) 0%, rgba(34,36,41,.72) 38%, rgba(10,11,13,.98) 72%, #060708 100%)" }}></div>
          {/* 바닥면 + 지평 */}
          <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "36%", background: "linear-gradient(180deg, transparent 0%, rgba(42,44,50,.42) 46%, rgba(16,17,20,.7) 100%)" }}></div>
          {/* 로봇 받침 광채(그라운딩) */}
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "14%", transform: "translateX(-50%)", width: "46%", height: "20%", background: "radial-gradient(closest-side, rgba(120,124,132,.30), transparent 70%)", filter: "blur(24px)" }}></div>
          {/* 비네트 */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 96% at 50% 44%, transparent 52%, rgba(0,0,0,.62) 100%)" }}></div>
          {/* 로봇 앵커 + 백라이트 + 바닥 반사광 */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${scale})`, transformOrigin: "center", height: "min(66vh,580px)", aspectRatio: "451 / 910", willChange: "transform" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", width: "180%", height: "52%", background: `radial-gradient(closest-side, rgba(150,156,166,${0.14 + approach * 0.14}), transparent 72%)`, filter: "blur(26px)" }}></div>
            <div style={{ position: "absolute", left: "50%", bottom: -14, transform: "translateX(-50%)", width: "66%", height: 40, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(133,225,210,.42), rgba(133,225,210,0))", filter: "blur(7px)", opacity: 0.25 + approach * 0.45 }}></div>
            <div style={{ position: "relative", width: "100%", height: "100%", animation: reduce ? "none" : "s0-float 5.5s ease-in-out infinite" }}><RobotPhoto glow={0.4 + approach * 0.85} awake={eye !== "open"} reduce={reduce} /></div>
          </div>
          {/* 헤드라인 (점등) */}
          <div style={{ position: "absolute", left: "clamp(24px,6vw,104px)", bottom: "clamp(96px,15vh,170px)", maxWidth: 720, zIndex: 3 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.26em", color: MINT, opacity: 0.25 + lit * 0.75, marginBottom: 18 }}>WELLNESS ROBOT · NAMUHX</div>
            <h1 className="serif" style={{ margin: 0, fontSize: "clamp(30px,4vw,60px)", fontWeight: 600, lineHeight: 1.34, letterSpacing: "-0.01em", color: "#F4EFE6", opacity: 0.12 + lit * 0.88, textShadow: lit > 0.5 ? "0 0 40px rgba(133,225,210,.12)" : "none" }}>
              우리 집 첫 번째 로봇,<br />함께 사는 일상이 시작됩니다.
            </h1>
            <p style={{ margin: "20px 0 0", fontSize: "clamp(14px,1.1vw,17px)", lineHeight: 1.66, color: "#9AA3B2", opacity: 0.1 + lit * 0.9, maxWidth: 560 }}>
              로봇과 산다는 건, 기술을 쫓아가지 않아도 된다는 것. 먼저 다가와 하루를 살피는 웰니스 로봇, 나무엑스.
            </p>
          </div>
          {/* 스크롤 힌트 */}
          <div style={{ position: "absolute", left: "50%", bottom: 34, transform: "translateX(-50%)", textAlign: "center", opacity: hint, transition: "opacity .3s", zIndex: 3 }}>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.62)", marginBottom: 8, whiteSpace: "nowrap" }}>조금만 내려보세요. 지금, 다가오는 중입니다</div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "s0-hint 1.6s ease-in-out infinite" }}><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- 오늘 카드 ---------- */
  function Card({ c, onOpen, compact }) {
    const [hv, setHv] = useState(false);
    const side = compact ? "clamp(300px,74vw,360px)" : "clamp(360px,44vh,520px)";
    return (
      <button onClick={onOpen} onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)}
        style={{ flex: "0 0 auto", width: side, height: side, borderRadius: 26, overflow: "hidden", position: "relative", border: "none", cursor: "pointer", padding: 0, background: "#0f1319", fontFamily: "inherit", transform: hv ? "translateY(-8px)" : "none", boxShadow: hv ? "0 28px 64px rgba(0,0,0,.5)" : "0 14px 40px rgba(0,0,0,.34)", transition: "transform .35s var(--ease-out), box-shadow .35s" }}>
        <img src={c.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: hv ? "scale(1.05)" : "scale(1)", transition: "transform .6s var(--ease-out)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.12) 34%, rgba(0,0,0,.82) 100%)" }}></div>
        <span style={{ position: "absolute", top: 20, left: 22, fontSize: 12, fontWeight: 700, letterSpacing: "0.02em", color: BLACK, background: MINT, padding: "5px 12px", borderRadius: 999 }}>{c.tag}</span>
        <div style={{ position: "absolute", left: 24, right: 22, bottom: 22, textAlign: "left" }}>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)", marginBottom: 6 }}>{c.lead}</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(20px,1.5vw,26px)", letterSpacing: "-0.01em" }}>{c.title}</span>
            <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", padding: "7px 7px 7px 13px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, transition: "all .25s", color: hv ? BLACK : "#fff", background: hv ? MINT : "transparent", border: hv ? "1px solid transparent" : "1px solid rgba(255,255,255,.5)" }}>
              더 알아보기
              <span style={{ width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: hv ? BLACK : "#fff", color: hv ? "#fff" : BLACK }}><Arrow s={12} /></span>
            </span>
          </div>
        </div>
      </button>
    );
  }

  /* ---------- SEC-2 · 오늘 (로봇 앵커 + 능력 5 가로 롤링) ---------- */
  function Today({ onOpen, ga, reduce }) {
    const wrapRef = useRef(null), trackRef = useRef(null);
    const [tx, setTx] = useState(0);
    const [active, setActive] = useState(0);
    const [pulse, setPulse] = useState(0);
    const fired50 = useRef(false);
    useEffect(() => {
      if (reduce) return;
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const wrap = wrapRef.current, track = trackRef.current;
          if (!wrap || !track) return;
          const total = wrap.offsetHeight - window.innerHeight;
          const raw = clamp((-wrap.getBoundingClientRect().top) / total, 0, 1);
          const HOLD = 0.16, HOLD_END = 0.14;
          const prog = raw <= HOLD ? 0 : raw >= 1 - HOLD_END ? 1 : (raw - HOLD) / (1 - HOLD_END - HOLD);
          const vis = track.parentElement ? track.parentElement.clientWidth : window.innerWidth;
          const maxX = Math.max(0, track.scrollWidth - vis + 40);
          setTx(prog * maxX);
          const idx = clamp(Math.round(prog * (CARDS.length - 1)), 0, CARDS.length - 1);
          setActive((prev) => { if (prev !== idx) setPulse((k) => k + 1); return idx; });
          if (!fired50.current && raw > 0.5) { fired50.current = true; ga("scene_scroll_50", {}); }
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll); onScroll();
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    }, [reduce]);

    const Anchor = (
      <div style={{ flex: "0 0 clamp(300px,34%,520px)", paddingLeft: "clamp(28px,5vw,96px)", position: "relative" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: MINT, marginBottom: 14 }}>TODAY · 오늘</div>
        <h2 className="serif" style={{ margin: "0 0 30px", fontSize: "clamp(26px,3vw,46px)", fontWeight: 600, lineHeight: 1.36, letterSpacing: "-0.01em", color: "#F4EFE6" }}>
          로봇과 사는 하루는,<br />이렇게 다릅니다
        </h2>
        <div style={{ position: "relative", width: "clamp(150px,15vw,210px)", height: "clamp(160px,16vw,230px)" }}>
          <div key={pulse} style={{ position: "absolute", left: "50%", top: "54%", width: 120, height: 120, marginLeft: -60, marginTop: -60, borderRadius: "50%", border: `2px solid ${MINT}`, animation: reduce ? "none" : "s0-pulse 1s ease-out" }}></div>
          <div style={{ width: "100%", height: "100%", animation: reduce ? "none" : "s0-float 5.5s ease-in-out infinite" }}><RobotSVG eye="smile" glow={0.9} /></div>
        </div>
        <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 16px", borderRadius: 999, background: "rgba(133,225,210,.1)", border: "1px solid rgba(133,225,210,.32)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: MINT, boxShadow: `0 0 8px ${MINT}` }}></span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>지금 — {CARDS[active].tag}</span>
        </div>
      </div>
    );

    if (reduce) {
      return (
        <section style={{ position: "relative", background: "#0C1118", padding: "80px 0" }}>
          <EqualizerBg opacity={0.28} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
            {Anchor}
            <div style={{ flex: 1, display: "flex", gap: 22, overflowX: "auto", padding: "10px clamp(24px,5vw,80px) 20px" }}>
              {CARDS.map((c, i) => <Card key={c.key} c={c} onOpen={() => onOpen(i)} compact />)}
            </div>
          </div>
          <p style={{ margin: "26px 0 0", paddingLeft: "clamp(28px,5vw,96px)", fontSize: 12, color: "rgba(255,255,255,.4)" }}>* 측정 결과는 의료 진단이 아닌 웰니스 참고용입니다.</p>
        </section>
      );
    }

    return (
      <section ref={wrapRef} style={{ position: "relative", height: "440vh", background: "#0C1118" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <EqualizerBg opacity={0.3} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "clamp(16px,2vw,40px)" }}>
            {Anchor}
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <div ref={trackRef} style={{ display: "flex", gap: "clamp(20px,2.2vw,36px)", paddingRight: "clamp(40px,6vw,120px)", transform: `translateX(${-tx}px)`, willChange: "transform" }}>
                {CARDS.map((c, i) => <Card key={c.key} c={c} onOpen={() => onOpen(i)} />)}
              </div>
            </div>
          </div>
          <p style={{ position: "absolute", left: "clamp(28px,5vw,96px)", bottom: 26, margin: 0, fontSize: 12, color: "rgba(255,255,255,.4)" }}>* 측정 결과는 의료 진단이 아닌 웰니스 참고용입니다.</p>
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
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 130, background: "rgba(8,10,14,.62)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,56px)" }}>
        <div onClick={(e) => e.stopPropagation()} key={index} style={{ width: "min(1080px,100%)", maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 24, padding: "clamp(24px,3vw,42px)", boxShadow: "0 40px 100px rgba(0,0,0,.42)", animation: "tb-modalIn .42s var(--ease-out) both" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.02em", color: BLACK, background: MINT, padding: "4px 11px", borderRadius: 999 }}>{c.tag}</span>
              <h3 style={{ margin: "14px 0 0", fontSize: "clamp(22px,2vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#141414" }}>{c.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14.5, color: "var(--text-muted,#6b7078)", lineHeight: 1.55 }}>{c.sub}</p>
            </div>
            <button onClick={onClose} aria-label="닫기" style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "#141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div style={{ position: "relative", marginTop: 22, borderRadius: 14, overflow: "hidden", aspectRatio: "16 / 8.3", background: "#111" }}>
            <img src={c.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.05) 45%, rgba(0,0,0,.55) 100%)" }}></div>
            <div style={{ position: "absolute", left: "clamp(18px,3vw,40px)", bottom: "clamp(16px,3vw,36px)", maxWidth: "66%" }}>
              <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "clamp(14px,1.3vw,20px)", lineHeight: 1.4, textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>{c.caption}</p>
            </div>
          </div>
          {c.metrics && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
              {c.metrics.map((m) => <span key={m} style={{ fontSize: 13, fontWeight: 600, color: "#141414", background: "var(--gray-100,#eef0f3)", padding: "8px 14px", borderRadius: 999 }}>{m}</span>)}
            </div>
          )}
          {c.note && <p style={{ margin: "14px 0 0", fontSize: 12.5, color: "var(--text-muted,#6b7078)", lineHeight: 1.5 }}>{c.note}</p>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 24 }}>
            <div style={{ flex: 1, display: "flex", gap: 6 }}>
              {CARDS.map((_, i) => <span key={i} onClick={() => setIndex(i)} style={{ flex: 1, height: 3, borderRadius: 2, cursor: "pointer", background: i === index ? BLACK : "#dcdee2" }}></span>)}
            </div>
            <div style={{ display: "flex", gap: 10 }}><RB dir={-1} /><RB dir={1} /></div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- 진화 카드 아이콘 ---------- */
  const IconVoice = () => (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30c-4 0-7-3-7-8s3-9 8-9 8 3 8 8" /><path d="M13 30c0 4 3 7 7 7" /><path d="M31 16c2 2 3 5 3 8s-1 6-3 8" opacity=".9" /><path d="M35 12c3 3 5 7 5 12s-2 9-5 12" opacity=".55" />
    </svg>
  );
  const IconArm = () => (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="12" r="3" /><path d="M14 15l6 9 9 3" /><path d="M29 27l5-4" /><rect x="33" y="20" width="8" height="7" rx="1.5" transform="rotate(28 37 23)" />
    </svg>
  );

  function EvoCard({ icon, title, desc, no }) {
    return (
      <div className="reveal" data-reveal style={{ position: "relative", flex: "1 1 340px", maxWidth: 480, minHeight: 260, borderRadius: 22, padding: "34px 36px 30px", background: "rgba(133,225,210,.04)", border: `1.5px dashed rgba(133,225,210,.5)`, boxShadow: "0 0 40px rgba(133,225,210,.08), inset 0 0 30px rgba(133,225,210,.05)", display: "flex", flexDirection: "column" }}>
        <span style={{ alignSelf: "flex-start", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.04em", color: MINT, border: `1px solid rgba(133,225,210,.5)`, borderRadius: 999, padding: "4px 11px", marginBottom: 22 }}>개발 중</span>
        <div style={{ marginBottom: "auto" }}>{icon}</div>
        <h4 style={{ margin: "20px 0 0", fontSize: "clamp(22px,1.8vw,30px)", fontWeight: 700, color: "#F4EFE6", letterSpacing: "-0.01em" }}>{title}</h4>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
          <p style={{ margin: 0, fontSize: "clamp(14px,1.05vw,17px)", lineHeight: 1.62, color: "rgba(255,255,255,.68)", whiteSpace: "pre-line" }}>{desc}</p>
          <span style={{ fontSize: 34, fontWeight: 700, color: "rgba(133,225,210,.32)", lineHeight: 1 }}>{no}</span>
        </div>
      </div>
    );
  }

  /* ---------- SEC-3 · 내일 (라이트 시프트) ---------- */
  function Tomorrow() {
    return (
      <section style={{ position: "relative", background: "linear-gradient(180deg, #0C1118 0%, #14233c 40%, #1b3252 100%)", padding: "clamp(80px,10vw,140px) clamp(24px,6vw,104px)", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "80%", height: 320, background: "radial-gradient(closest-side, rgba(133,225,210,.16), transparent)", filter: "blur(30px)" }}></div>
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
          <div className="reveal" data-reveal style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.22em", color: MINT, marginBottom: 16 }}>TOMORROW · 내일</div>
          <h2 className="reveal serif" data-reveal style={{ margin: "0 0 48px", fontSize: "clamp(26px,3vw,46px)", fontWeight: 600, lineHeight: 1.38, letterSpacing: "-0.01em", color: "#F4EFE6", maxWidth: 820 }}>
            그리고 내일, 함께 사는 일상은<br />한 걸음 더 가까워집니다
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4vw,32px)" }}>
            <EvoCard icon={<IconVoice />} title="먼저 말을 건넵니다." desc={"묻기 전에 안부를 알아차리고,\n필요한 순간 먼저 챙기는 사이가 되려 합니다."} no="01" />
            <EvoCard icon={<IconArm />} title="손길까지 더합니다." desc={"눈과 귀를 넘어 손을 내밉니다 —\n물건을 집고 건네며 돕는 차세대 모델을 준비합니다."} no="02" />
          </div>
        </div>
      </section>
    );
  }

  /* ---------- SEC-4 · CTA 브릿지 ---------- */
  function CtaBridge({ ga }) {
    const [toast, setToast] = useState(false);
    const onClick = () => {
      ga("cta_click", { target: "next_scene_space" });
      setToast(true); setTimeout(() => setToast(false), 2600);
    };
    return (
      <section style={{ position: "relative", background: BLUE, padding: "clamp(96px,12vw,180px) clamp(24px,6vw,104px)", textAlign: "center", overflow: "hidden" }}>
        <EqualizerBg opacity={0.22} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
          <p className="reveal serif" data-reveal style={{ margin: 0, fontSize: "clamp(26px,3.2vw,50px)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.01em", color: "#F4EFE6" }}>
            첫 만남은 끝났습니다.<br />이제, 같이 사는 법을 보여드릴게요.
          </p>
          <button onClick={onClick} className="s0-cta" style={{ marginTop: 44, display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 30px", borderRadius: 999, border: "none", background: MINT, color: BLACK, fontFamily: "inherit", fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 700, cursor: "pointer", boxShadow: "0 14px 40px rgba(133,225,210,.34)", transition: "transform .25s var(--ease-out), box-shadow .25s" }}>
            로봇이 지키는 집, 먼저 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLACK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </button>
          <div style={{ marginTop: 26, fontSize: 13, letterSpacing: "0.14em", color: "rgba(255,255,255,.5)", fontWeight: 600 }}>NEXT — SCENE 1 · 빈틈없는 공간 케어</div>
        </div>
        <div style={{ position: "fixed", left: "50%", bottom: 120, transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`, opacity: toast ? 1 : 0, pointerEvents: "none", zIndex: 140, background: "rgba(10,12,16,.94)", color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "0 16px 40px rgba(0,0,0,.4)", transition: "all .3s var(--ease-out)", whiteSpace: "nowrap" }}>
          SCENE 1 · 빈틈없는 공간 케어 로 이동합니다 <span style={{ color: MINT }}>(/wellness-robot/scene1)</span>
        </div>
      </section>
    );
  }

  /* ---------- 푸터 ---------- */
  function Footer() {
    const links = ["이용약관", "개인정보처리방침", "BIZ임직원등록", "계약서안내", "소비자분쟁해결기준", "오픈소스 라이선스", "사이트맵"];
    return (
      <footer style={{ background: "#0A0B0D", color: "rgba(255,255,255,.62)", padding: "clamp(48px,6vw,72px) clamp(24px,5vw,64px) clamp(72px,8vw,110px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <Wordmark size={22} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", margin: "26px 0 22px" }}>
              {links.map((l, i) => <span key={l} style={{ fontSize: 13.5, color: i === 1 ? "#fff" : "rgba(255,255,255,.82)", fontWeight: i === 1 ? 700 : 500 }}>{l}</span>)}
            </div>
            <p style={{ margin: "0 0 6px", fontSize: 12.5 }}>SK인텔릭스(주) 대표이사 : 안무인</p>
            <p style={{ margin: "0 0 6px", fontSize: 12.5 }}>주소 : 서울특별시 종로구 청계천로 85(관철동) 삼일빌딩 18층 &nbsp;|&nbsp; 사업자등록번호 : 104-86-48203</p>
            <p style={{ margin: "0 0 18px", fontSize: 12.5 }}>통신판매업신고번호 : 제 2021-서울종로-0814호</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,.4)" }}>2026 Copyrights ©SK인텔릭스(주) All Rights Reserved.</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: "0 0 22px", fontSize: 14.5, fontWeight: 700, color: MINT, display: "flex", alignItems: "center", gap: 6 }}>서비스 센터 찾기 <Arrow s={14} c="var(--ws-mint)" /></p>
            <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "#fff" }}>고객센터</p>
            <p style={{ margin: "0 0 10px", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>1600 - 1937</p>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7 }}>평일: 09시 ~ 18시<br />토요일: 09시 ~ 13시<br />(토·일·공휴일 휴무)</p>
          </div>
        </div>
      </footer>
    );
  }

  /* ---------- 플로팅 배너(서브탭) ---------- */
  function SubTabs({ hidden }) {
    return (
      <div style={{ position: "fixed", left: "50%", bottom: 22, transform: `translateX(-50%) translateY(${hidden ? 90 : 0}px)`, zIndex: 80, display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: "rgba(255,255,255,.1)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 10px 34px rgba(0,0,0,.3)", transition: "transform .4s var(--ease-out)", opacity: hidden ? 0 : 1 }}>
        {SUBTABS.map((t, i) => i === 0 ? (
          <span key={t} style={{ padding: "12px 22px", borderRadius: 999, background: BLACK, color: MINT, fontWeight: 700, fontSize: 14, boxShadow: "0 6px 18px rgba(0,0,0,.4)" }}>{t}</span>
        ) : (
          <span key={t} style={{ padding: "12px 18px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.78)", cursor: "default" }}>{t}</span>
        ))}
      </div>
    );
  }

  /* ---------- FAB ---------- */
  function Fabs() {
    return (
      <div style={{ position: "fixed", right: 24, bottom: 96, zIndex: 75, display: "flex", flexDirection: "column", gap: 12 }}>
        <button aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ width: 52, height: 52, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.3)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, color: "#141414" }}>
          <svg width="14" height="9" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7" /></svg>
          <span style={{ fontSize: 10, fontWeight: 700 }}>TOP</span>
        </button>
      </div>
    );
  }

  /* ---------- GA4 디버그 로그 ---------- */
  function GaDebug({ log }) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ position: "fixed", left: 18, bottom: 18, zIndex: 85, fontFamily: "var(--font-sans)" }}>
        <button onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,.16)", background: "rgba(10,12,16,.8)", color: "rgba(255,255,255,.7)", fontSize: 11.5, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: MINT }}></span>GA4 {log.length}
        </button>
        {open && (
          <div style={{ marginTop: 8, width: 250, maxHeight: 200, overflowY: "auto", background: "rgba(10,12,16,.92)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: 10, backdropFilter: "blur(8px)" }}>
            {log.length === 0 && <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>이벤트 대기 중…</div>}
            {log.slice().reverse().map((e, i) => (
              <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,.72)", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: MINT, fontWeight: 700 }}>{e.name}</span>
                {e.params && Object.keys(e.params).length > 0 && <span style={{ color: "rgba(255,255,255,.5)" }}> {JSON.stringify(e.params)}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ---------- App ---------- */
  function App() {
    const reduce = usePrefersReduced();
    const [modal, setModal] = useState(null);
    const [hideTabs, setHideTabs] = useState(false);
    const [active, setActive] = useState(0);
    const [gaLog, setGaLog] = useState([]);
    const firedComplete = useRef(false);
    const embedded = typeof window !== "undefined" && window.self !== window.top;
    const forceGnb = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("full") === "1";
    const showGnb = !embedded || forceGnb;

    const ga = useRef((name, params) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...params });
      setGaLog((l) => [...l.slice(-24), { name, params }]);
    }).current;

    useEffect(() => { ga("scene_view", { scene_id: "scene0", menu: "wellness_robot" }); }, []);

    useEffect(() => {
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const frac = max > 0 ? window.scrollY / max : 0;
        setActive(clamp(Math.floor(frac * STORY.length * 0.999), 0, STORY.length - 1));
        setHideTabs(window.innerHeight + window.scrollY > document.body.scrollHeight - window.innerHeight * 0.6);
        if (!firedComplete.current && frac > 0.97) { firedComplete.current = true; ga("scene_scroll_complete", {}); }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
      const els = document.querySelectorAll("[data-reveal]");
      const io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.18 });
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    });

    return (
      <React.Fragment>
        {showGnb && <Gnb />}
        <Hero ga={ga} reduce={reduce} />
        <Today onOpen={(i) => setModal(i)} ga={ga} reduce={reduce} />
        <Tomorrow />
        <CtaBridge ga={ga} />
        <Footer />
        <StoryNav active={active} />
        <SubTabs hidden={hideTabs} />
        <Fabs />
        <GaDebug log={gaLog} />
        {modal !== null && <Modal index={modal} setIndex={setModal} onClose={() => setModal(null)} />}
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
