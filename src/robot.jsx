/* NAMUH X 리뉴얼 — '로봇' 메뉴 (스토리보드 v2.2)
   window.RobotStage  —  C-level용: 의도 → 전략 → 오버뷰 + 역량1·2·3(현재/미래가치) → 운영 방식 */
(function () {
  const { useState, useEffect } = React;

  /* 현재가치 / 미래가치 2열 */
  function ValueCols({ today, tomorrow }) {
    const Col = ({ title, badge, items, future }) =>
    <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 15 }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", color: future ? "rgba(133,225,210,.8)" : "var(--ws-mint)" }}>{title}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.5)", padding: "2px 8px", borderRadius: 999, border: future ? "1px dashed rgba(133,225,210,.4)" : "1px solid rgba(133,225,210,.3)" }}>{badge}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {items.map(([h, d]) =>
        <div key={h} style={{ display: "flex", gap: 11 }}>
              <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: "50%", background: future ? "transparent" : "var(--ws-mint)", border: future ? "1.5px solid rgba(133,225,210,.7)" : "none" }}></span>
              <div>
                <strong style={{ fontSize: 14.5, fontWeight: 600, color: future ? "rgba(255,255,255,.74)" : "#fff", letterSpacing: "-0.01em" }}>{h}</strong>
                <p style={{ margin: "2px 0 0", fontSize: 12.5, lineHeight: 1.5, color: "rgba(255,255,255,.5)" }}>{d}</p>
              </div>
            </div>
        )}
        </div>
      </div>;

    return (
      <div style={{ display: "flex", gap: "clamp(20px,3vw,44px)", flexWrap: "wrap" }}>
        <Col title="현재가치" badge="지금 되는 것" items={today} />
        <Col title="미래가치" badge="향후 업데이트" items={tomorrow} future />
      </div>);

  }

  function AssetNote({ text }) {
    return (
      <div style={{ marginTop: 24, display: "flex", gap: 11, padding: "13px 16px", borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.09)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(133,225,210,.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 15 4-4 4 4M14 13l2-2 5 5" /><circle cx="15.5" cy="9" r="1.2" /></svg>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: "rgba(255,255,255,.6)" }}>
          <span style={{ fontWeight: 700, color: "rgba(133,225,210,.85)", marginRight: 6 }}>콘텐츠 운영</span>{text}
        </p>
      </div>);

  }

  /* 역량 블록 */
  function CapBlock({ c, idx }) {
    return (
      <section style={{ padding: "var(--scene-pad) 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", color: "var(--ws-mint)" }}>{c.no}</span>
          <span style={{ width: 26, height: 1, background: "rgba(255,255,255,.2)" }}></span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{c.eyebrow}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.92fr) minmax(0,1.18fr)", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>{c.cap}</h3>
            <p style={{ margin: "16px 0 0", fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.4, fontWeight: 600, color: "var(--ws-mint)", letterSpacing: "-0.01em" }}>“{c.quote}”</p>
            <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.6)", maxWidth: 420 }}>{c.lead}</p>
          </div>
          <div>
            <ValueCols today={c.today} tomorrow={c.tomorrow} />
            <AssetNote text={c.assetNow} />
          </div>
        </div>
      </section>);

  }

  /* 핵심 요약 (왜 / 어떻게) — 한 장 요약 */
  function Summary({ screen }) {
    const sm = screen.summary,goals = screen.strategy.goals;
    return (
      <div style={{ position: "relative", padding: "clamp(34px,4.5vw,56px) var(--rb-gut)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "6px 14px", borderRadius: 999, background: "rgba(133,225,210,.1)", border: "1px solid rgba(133,225,210,.28)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ws-mint)" }}></span>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: "var(--ws-mint)" }}>핵심 요약 · ONE PAGE</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(16px,2.5vw,24px)", alignItems: "stretch" }}>
          {/* 왜 */}
          <div style={{ padding: "clamp(24px,3vw,32px)", borderRadius: 18, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "var(--ws-mint)" }}>왜</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.5)" }}>하는가</span>
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px,1.9vw,21px)", lineHeight: 1.45, fontWeight: 600, letterSpacing: "-0.015em", color: "#fff" }}>{sm.why}</p>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 9 }}>
              {goals.map(([h], i) =>
              <div key={h} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 800, color: "var(--ws-mint)", width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(133,225,210,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: "rgba(255,255,255,.9)", letterSpacing: "-0.01em" }}>{h}</span>
                </div>
              )}
            </div>
          </div>
          {/* 어떻게 */}
          <div style={{ padding: "clamp(24px,3vw,32px)", borderRadius: 18, background: "linear-gradient(160deg, rgba(133,225,210,.08), rgba(133,225,210,.02))", border: "1px solid rgba(133,225,210,.22)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "var(--ws-mint)" }}>어떻게</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.5)" }}>할 건가</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {sm.how.map(([tag, head, body]) =>
              <div key={tag} style={{ display: "flex", gap: 13 }}>
                  <span style={{ flexShrink: 0, width: 58, fontSize: 11, fontWeight: 700, color: "var(--ws-mint)", paddingTop: 3 }}>{tag}</span>
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                    <strong style={{ fontSize: 15.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{head}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,.6)" }}>{body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p style={{ margin: "20px 2px 0", fontSize: 12.5, color: "rgba(255,255,255,.4)" }}>아래는 상세 설명입니다 — 발표 시엔 위 요약만, 질문 시 상세 내용으로 답하시면 됩니다.</p>
      </div>);

  }

  /* ===== 한 화면 요약본 (인라인 · 스크롤 최소화) ===== */
  function RobotSummaryCompact({ screen }) {
    const st = screen.strategy,ov = screen.overview,caps = screen.caps,rm = screen.roadmap;
    const blocks = [ov, ...caps];
    return (
      <div className="ws-dark" style={{ position: "relative", overflow: "hidden", background: "var(--dark-bg)", color: "#fff", borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", padding: "clamp(26px,3.4vw,40px)" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -140, left: "50%", transform: "translateX(-50%)", width: 680, height: 320, background: "radial-gradient(ellipse, rgba(133,225,210,.12), transparent 68%)", pointerEvents: "none" }}></div>

        {/* WHY — 전략 의도 + 목표 칩 */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)", gap: "clamp(20px,3vw,40px)", alignItems: "center", paddingBottom: "clamp(22px,2.6vw,30px)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--ws-mint)" }}>Concept</span>
            <p style={{ margin: "14px 0 0", fontSize: "clamp(19px,2.2vw,26px)", lineHeight: 1.34, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>
              ‘가전’이 아니라 <span style={{ color: "var(--ws-mint)" }}>‘로봇’ 회사</span>로 각인
            </p>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{st.insight}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {st.goals.map(([h, d], i) =>
            <div key={h} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 15px", borderRadius: 12, background: "rgba(133,225,210,.05)", border: "1px solid rgba(133,225,210,.16)" }}>
                <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 800, color: "var(--ws-mint)", width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(133,225,210,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <strong style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{h}</strong>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", marginLeft: 8 }}>{d}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 스토리 스파인 */}
        {st.spine &&
        <div style={{ position: "relative", marginTop: "clamp(20px,2.4vw,28px)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,.45)" }}>NARRATIVE</span>
            <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
              {st.spine.map((w, i) =>
            <React.Fragment key={w}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 999, background: "rgba(133,225,210,.08)", border: "1px solid rgba(133,225,210,.24)" }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "var(--ws-mint)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{w}</span>
                  </span>
                  {i < st.spine.length - 1 &&
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(133,225,210,.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              }
                </React.Fragment>
            )}
            </div>
          </div>
        }

        {/* HOW — 오버뷰 + 역량 1·2·3 (한눈에) */}
        <div style={{ position: "relative", marginTop: "clamp(22px,2.6vw,30px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--ws-mint)" }}>Story</span>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)" }}>오버뷰 + 역량 1/2/3 — 현재가치(지금)와 미래가치(업데이트)를 함께</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {blocks.map((b, i) => {
              const isOv = i === 0;
              const title = isOv ? b.nav : b.cap;
              return (
                <div key={i} style={{ position: "relative", display: "flex", flexDirection: "column", padding: "18px 18px 20px", borderRadius: 16, background: isOv ? "rgba(133,225,210,.07)" : "var(--dark-surface)", border: "1px solid " + (isOv ? "rgba(133,225,210,.28)" : "rgba(255,255,255,.1)") }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.04em", color: "var(--ws-mint)" }}>{isOv ? "OVERVIEW" : b.no}</span>
                    {isOv && <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "2px 8px", borderRadius: 999 }}>진입</span>}
                  </div>
                  <strong style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.015em", color: "#fff" }}>{title}</strong>
                  <p style={{ margin: "8px 0 0", fontSize: 12.5, lineHeight: 1.4, fontWeight: 600, color: "var(--ws-mint)" }}>“{b.quote}”</p>
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
                    {b.today.slice(0, 3).map(([h]) =>
                    <div key={h} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: "50%", background: "var(--ws-mint)" }}></span>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,.82)", letterSpacing: "-0.01em" }}>{h}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: 13 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 600, color: "rgba(133,225,210,.8)", padding: "4px 9px", borderRadius: 999, border: "1px dashed rgba(133,225,210,.4)" }}>
                      향후 - {b.tomorrow[0][0]}
                    </span>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* 운영 방식 한 줄 */}
        <div style={{ position: "relative", marginTop: "clamp(20px,2.4vw,28px)", display: "flex", gap: 11, alignItems: "center", padding: "13px 16px", borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.09)" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 10px", borderRadius: 999, flexShrink: 0 }}>운영</span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,.65)" }}>{rm.lead}</p>
        </div>
      </div>);

  }

  /* 페이지 본문 */
  function RobotPage({ screen, compact }) {
    const st = screen.strategy,ov = screen.overview,rm = screen.roadmap;
    return (
      <div className="ws-dark" style={{ "--scene-pad": compact ? "44px" : "60px", background: "var(--dark-bg)", color: "#fff", borderRadius: compact ? 0 : 20, overflow: "hidden", border: compact ? "none" : "1px solid rgba(255,255,255,.08)" }}>
        {/* 히어로 — 의도 */}
        <div style={{ position: "relative", padding: "clamp(46px,6vw,80px) var(--rb-gut) clamp(20px,2.5vw,30px)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 620, height: 340, background: "radial-gradient(ellipse, rgba(133,225,210,.14), transparent 68%)", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", maxWidth: 860 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", color: "var(--ws-mint)" }}>NAMUHX · ROBOT</span>
            <h2 style={{ margin: "18px 0 0", fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.14, fontWeight: 700, letterSpacing: "-0.025em", color: "#fff" }}>
              ‘가전’이 아니라 ‘로봇’ 회사로<br />각인시키는 메뉴
            </h2>
          </div>
        </div>

        {/* 핵심 요약 */}
        <Summary screen={screen} />

        {/* 상세 구분선 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px var(--rb-gut) 0" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,.4)" }}>상세 내용</span>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }}></span>
        </div>

        {/* 전략 의도 */}
        <div style={{ marginTop: 28, padding: "clamp(30px,4vw,46px) var(--rb-gut)", background: "rgba(255,255,255,.02)", borderTop: "1px solid rgba(255,255,255,.07)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,.45)" }}>전략 의도</span>
              <p style={{ margin: "16px 0 0", fontSize: "clamp(17px,1.9vw,23px)", lineHeight: 1.42, fontWeight: 600, letterSpacing: "-0.015em", color: "#fff" }}>
                로봇의 본질은 <span style={{ color: "var(--ws-mint)" }}>‘스스로 다가와, 함께 성장하는 존재’</span>입니다.
              </p>
              <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.65, color: "rgba(255,255,255,.55)", maxWidth: 440 }}>{st.problem}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {st.goals.map(([h, d], i) =>
              <div key={h} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: 14, background: "rgba(133,225,210,.05)", border: "1px solid rgba(133,225,210,.16)" }}>
                  <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 800, color: "var(--ws-mint)", width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(133,225,210,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  <div>
                    <strong style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{h}</strong>
                    <p style={{ margin: "3px 0 0", fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,.6)" }}>{d}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오버뷰 + 역량 */}
        <div style={{ padding: "0 var(--rb-gut)" }}>
          {/* 오버뷰 */}
          <section style={{ padding: "var(--scene-pad) 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "var(--ws-mint)" }}>{ov.no}</span>
              <span style={{ width: 26, height: 1, background: "rgba(255,255,255,.2)" }}></span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{ov.eyebrow}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "var(--ws-black)", background: "var(--ws-mint)", padding: "3px 11px", borderRadius: 999 }}>진입 화면</span>
            </div>
            <h3 style={{ margin: 0, fontSize: "clamp(24px,2.8vw,34px)", fontWeight: 700, letterSpacing: "-0.022em", color: "#fff" }}>{ov.nav}</h3>
            <p style={{ margin: "16px 0 0", fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.4, fontWeight: 600, color: "var(--ws-mint)", letterSpacing: "-0.01em" }}>“{ov.quote}”</p>
            <p style={{ margin: "10px 0 30px", fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.62)", maxWidth: 620 }}>{ov.lead}</p>
            <ValueCols today={ov.today} tomorrow={ov.tomorrow} />
            <AssetNote text={ov.assetNow} />
          </section>

          {screen.caps.map((c, i) => <CapBlock key={c.no} c={c} idx={i} />)}
        </div>

        {/* 운영 방식 / 로드맵 */}
        <div style={{ position: "relative", padding: "clamp(44px,5vw,72px) var(--rb-gut)", borderTop: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,.45)" }}>{rm.title}</span>
          <p style={{ margin: "14px 0 0", fontSize: "clamp(16px,1.9vw,21px)", lineHeight: 1.5, fontWeight: 600, letterSpacing: "-0.015em", color: "#fff", maxWidth: 720 }}>{rm.lead}</p>
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {rm.steps.map(([phase, head, body], i) =>
            <div key={phase} style={{ position: "relative", padding: "22px 22px 24px", borderRadius: 16, background: i === 0 ? "rgba(133,225,210,.07)" : "var(--dark-surface)", border: "1px solid " + (i === 0 ? "rgba(133,225,210,.3)" : "rgba(255,255,255,.1)") }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "var(--ws-black)" : "var(--ws-mint)", background: i === 0 ? "var(--ws-mint)" : "transparent", border: i === 0 ? "none" : "1px solid rgba(133,225,210,.4)", padding: "3px 10px", borderRadius: 999 }}>{i === 0 ? "NOW" : "STEP " + (i + 1)}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,.7)" }}>{phase}</span>
                </div>
                <strong style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{head}</strong>
                <p style={{ margin: "7px 0 0", fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,.58)" }}>{body}</p>
              </div>
            )}
          </div>
        </div>
      </div>);

  }

  /* 스테이지 (데모 헤더 + 전체화면) */
  function RobotStage({ screen }) {
    const [full, setFull] = useState(false);
    useEffect(() => {
      if (!full) return;
      const onKey = (e) => {if (e.key === "Escape") setFull(false);};
      window.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;document.body.style.overflow = "hidden";
      return () => {window.removeEventListener("keydown", onKey);document.body.style.overflow = prev;};
    }, [full]);

    return (
      <React.Fragment>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: "0 0 0", fontSize: 30, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--text-strong)" }}>{screen.title} <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ws-mint)", verticalAlign: "super" }}>NEW</span></h2>
            <p style={{ margin: "12px 0 0", maxWidth: 980, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)", whiteSpace: "pre-line" }}>{screen.desc}</p>
          </div>
          <button onClick={() => setFull(true)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-strong)", fontSize: 13.5, fontWeight: 700 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
            전체화면으로 보기
          </button>
        </div>
        <div style={{ "--rb-gut": "clamp(24px,4vw,56px)" }}>
          <RobotSummaryCompact screen={screen} />
        </div>

        {full &&
        <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "var(--dark-bg)" }}>
            <div style={{ position: "absolute", inset: 0, overflowY: "auto", "--rb-gut": "clamp(28px,7vw,120px)" }}>
              <RobotPage screen={screen} compact />
            </div>
            <button onClick={() => setFull(false)} aria-label="닫기" style={{ position: "fixed", top: 18, right: 20, width: 44, height: 44, borderRadius: "50%", cursor: "pointer", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        }
      </React.Fragment>);

  }

  window.RobotStage = RobotStage;
})();