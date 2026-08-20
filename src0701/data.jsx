/* NAMUH X 리뉴얼 — 화면 데이터
   window.DEMO_DATA = { GNB, SCREENS }
   shot 화면: issues(AS-IS 개선 필요/asis 이미지 기준 box) / changes(TO-BE 주요 변화/tobe 이미지 기준 box)
   box = { x, y, w, h } : 해당 side 이미지 대비 %  */
(function () {
  const NEWS_PAGES = [
    { label: "PR 뉴스", src: "pr-news-list.jpg" },
    { label: "Instagram", src: "instagram-list.jpg" },
    { label: "YouTube", src: "youtube-list.jpg" },
  ];

  const SCREENS = {
    home: {
      id: "home", type: "shot",
      kicker: "메인 / 홈",
      title: "메인 HOME",
      desc: "보안 프로모션 배너 중심의 고도몰에서, 브랜드 필름과 기능/커뮤니티 서사를 전면에 둔 구성으로 바뀝니다.",
      asis: { src: "assets/asis-home.jpg",  ratio: 9489 / 2940, tag: "AS-IS", label: "고도몰", caption: "S1 보안 배너가 메인을 점유 / 제품 가치 서사 부재" },
      tobe: { src: "assets/tobe-home.jpeg", ratio: 8069 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "풀스크린 브랜드 필름 + 기능/커뮤니티 서사로 재편",
              heroVideo: "assets/brand-film.mp4", heroBanner: "assets/rosasi-banner.jpg" },
      issues: [
        { label: "톤앤매너 — 단일 다크톤 일괄 적용", desc: "전 페이지 동일 톤 → 콘텐츠 속성 및 가독성 고려 부재", sweep: true, box: { x: 3, y: 94, w: 94, h: 5 } },
        { label: "메인 KV — 정적 배너 중심", desc: "이미지 1컷 → 제품 동작 및 체감 전달 한계", box: { x: 3, y: 1, w: 94, h: 17 } },
        { label: "고객 리뷰 — 정적 사진 리뷰", desc: "실사용 맥락 전달 부족", box: { x: 3, y: 44, w: 94, h: 10 } },
      ],
      changes: [
        { label: "톤앤매너 — 톤 이원화 (다크 → 라이트 믹스)", desc: "브랜드는 다크 기반, 콘텐츠 속성에 따라 일부 라이트톤으로 믹스", sweep: true, sweepSpeed: 0.26, sweepStops: [{ y: 47, hold: 1800 }], box: { x: 3, y: 82.5, w: 94, h: 3 } },
        { label: "고객 리뷰 — 인플루언서 영상 후기", desc: "몰입형 후기로 신뢰 자산 강화", box: { x: 3, y: 43, w: 94, h: 10 } },
        { label: "메인 KV — 영상 KV + 다음 액션 유도", desc: "영상으로 직관 전달, 시청 직후 탐색 동선 연결", box: { x: 3, y: 1, w: 94, h: 12 } },
      ],
    },
    store: {
      id: "store", type: "shot",
      kicker: "스토어 / 홈",
      title: "스토어 홈 / Shop",
      desc: "단순 상품 그리드(고도몰 Shop)에서, 구독을 중심에 둔 완결형 커머스 허브로. 페이지 길이 차이가 곧 경험의 차이입니다.",
      asis: { src: "assets/asis-store.png", ratio: 2123 / 2940, tag: "AS-IS", label: "고도몰", caption: "상품 6종 그리드가 전부 — 여기서 페이지가 끝납니다",
              annots: [
                { x: 33.9, y: 4.4, h: 14, text: "제품 소개 페이지" },
                { x: 39.7, y: 4.4, h: 56, text: "구독 신청하는 구매 페이지" },
                { x: 46.2, y: 4.4, h: 98, text: "구매 혜택을 보는 메뉴" },
              ] },
      tobe: { src: "store-home-fhd.png".normalize("NFC"), ratio: 5471 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "제품/구독/소모품/이벤트/혜택/스토리까지 완결형 허브" },
      issues: [
        { label: "톤앤매너 — 다크톤 적용", desc: "구매 화면임에도 정보 가독성 저하", box: { x: 2, y: 4, w: 96, h: 8 } },
        { label: "카테고리 구조 — 상품 단순 나열", desc: "제품/구독/소모품 구분 없이 평면 진열", zoom: 1, box: { x: 18, y: 23, w: 66, h: 49 } },
        { label: "구매 정보 동선 — 정보 분산", desc: "이벤트/프로모션/구매조건/카드혜택이 GNB 곳곳에 흩어져,\n메뉴를 옮겨다니며 확인해야 함", zoom: 1, box: { x: 26, y: 0.3, w: 61, h: 4.6 } },
      ],
      changes: [
        { label: "톤앤매너 — 라이트톤 전환", desc: "구매 페이지 가독성 최우선으로 변경", sweep: true, sweepSpeed: 0.3, box: { x: 2, y: 83.2, w: 96, h: 3 } },
        { label: "구독 옵션 인라인", desc: "색상, 구독기간, 관리유형, 구독신청을 상품 카드에서 바로 확인", zoom: 1, box: { x: 2, y: 6.9, w: 96, h: 10.8 } },
        { label: "카테고리 구조 — 3개 영역 구분", desc: "제품 / 구독 서비스 / 소모품으로 구분", zoomHold: 1860,
          zoomSeq: [
            { label: "제품", box: { x: 2, y: 4.6, w: 96, h: 13.4 } },
            { label: "구독 서비스", box: { x: 2, y: 19.6, w: 96, h: 12.6 } },
            { label: "소모품", box: { x: 2, y: 34.2, w: 96, h: 12.6 } },
          ],
          box: { x: 2, y: 19.5, w: 96, h: 27.5 } },
        { label: "구매 정보 동선 단축 — 스토어로 일원화", desc: "이벤트/프로모션/카드혜택과 블로그 리뷰를 한 메뉴에 집결", zoomHold: 1860,
          zoomSeq: [
            { label: "이벤트 / 프로모션", box: { x: 2, y: 48.2, w: 96, h: 14 } },
            { label: "카드 혜택", box: { x: 2, y: 63.3, w: 96, h: 10.2 } },
            { label: "나무엑스와 함께한 스토리", box: { x: 2, y: 74.6, w: 96, h: 13.6 } },
          ],
          box: { x: 2, y: 44.3, w: 96, h: 41 } },
      ],
    },
    pdp: {
      id: "pdp", type: "shot",
      kicker: "스토어 / 구매상세",
      title: "구매상세 페이지",
      viewH: 892,
      desc: "어두운 단일 컬럼 구매 폼에서, 밝은 2단 구성으로. 좌측은 제품 체험, 우측은 구독 설계와 가격 설득을 전면화합니다.",
      asis: { src: "assets/asis-pdp.jpg", ratio: 13137 / 2940, tag: "AS-IS", label: "고도몰", caption: "다크 단일 컬럼 / 구매 옵션과 텍스트 리뷰 위주" },
      tobe: { src: "pdp-review-fhd.png".normalize("NFC"), ratio: 3969 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "좌측 제품 체험 / 우측 구독 설계 + AI 리뷰 요약",
              hotspots: [{ x: 11, y: 32.4, w: 6.8, h: 1.9, label: "제품 상세 보기", img: "assets/tobe-pdp-body.png", title: "제품 상세" }],
              splitView: { left: "제품 체험", right: "구독 설계 / 구매", gnb: "assets/tobe-pdp-gnb.png", body: "assets/tobe-pdp-body-main.png", footer: "assets/tobe-pdp-footer.png", aiScreen: "ai" } },
      issues: [
        { label: "톤앤매너 — 다크 단일 컬럼", desc: "체험과 구매가 한 줄로 쌓여 가독성과 집중도 저하\n제품 이미지, 혜택, 리뷰가 스크롤 단위로 흩어져 구독에 필요한 정보를 한 화면에서 비교하기 어려움", sweep: true, sweepSpeed: 0.32, sweepSpeedEnd: 1.1, sweepStops: [{ y: 38, hold: 0 }], box: { x: 2, y: 95, w: 96, h: 4 } },
        { label: "제품 체험/리뷰 — 텍스트/별점 위주", desc: "영상 및 요약 없이 긴 텍스트 리뷰가 이어짐", zoom: 1, box: { x: 13, y: 68.6, w: 68, h: 7.5 } },
      ],
      changes: [
        { label: "톤앤매너 — 라이트톤 변경", desc: "가독성 최우선 고려", sweep: true, sweepSpeed: 0.32, box: { x: 2, y: 92, w: 96, h: 4 } },
        { label: "영상 리뷰 도입", desc: "실사용 영상 및 고화질 사진 리뷰로 제품 신뢰도 강화", zoom: 1, box: { x: 2, y: 35, w: 46, h: 13 } },
        { label: "AI 리뷰 요약", desc: "리뷰를 AI가 한 줄로 요약하고 키워드 필터칩으로 정리해 구매 결정 단축", zoom: 1, box: { x: 2, y: 19.5, w: 46, h: 8.5 } },
        { label: "제품 View — 360 뷰어", desc: "클릭하고 360도 돌려보기", zoom: 1, box: { x: 2, y: 2, w: 46, h: 16.5 } },
        { label: "제품 안내 영역 통합", desc: "분리됐던 제품 소개와 구매를 제품 안내 영역으로 통합\n(PC) 좌측 체험 / 우측 구독 설계 / ‘제품 상세’ 탭으로 상세 콘텐츠 연결", box: { x: 4, y: 29.4, w: 42, h: 3.6 } },
      ],
    },
    ai: {
      id: "ai", type: "shot",
      kicker: "스토어 / 구매상세 — AI 리뷰/영상",
      title: "AI 리뷰 / 영상 리뷰",
      viewH: 892,
      desc: "리뉴얼 PDP 위에 얹는 신규 레이어입니다. 리뷰를 ‘읽는 것’에서 ‘AI 요약/영상으로 보는 것’으로 바꿔 구매 전환을 돕습니다.",
      asis: { src: "assets/tobe-pdp.png",    ratio: 4229 / 1920, tag: "기본", label: "리뉴얼 PDP", caption: "텍스트/별점 중심의 리뷰 구성" },
      tobe: { src: "assets/tobe-pdp-ai.png", ratio: 8334 / 2560, tag: "신규", label: "AI 리뷰/영상", caption: "AI 요약 + 영상 리뷰 + 키워드 칩으로 리뷰 탐색 재설계" },
      issues: [
        { label: "리뷰 요약 — 일일이 읽어야 함", desc: "수천 건 리뷰의 핵심을 요약해 주는 장치가 없음", box: { x: 2, y: 55, w: 46, h: 18 } },
        { label: "영상 리뷰 — 부재", desc: "사진/텍스트 위주로 사용 장면을 보기 어려움", box: { x: 2, y: 50, w: 46, h: 10 } },
        { label: "리뷰 탐색 — 필터 부족", desc: "키워드, 포토만 보기 등 빠른 탐색 수단이 약함", box: { x: 2, y: 47, w: 46, h: 6 } },
        { label: "신뢰 지표 — 평점 단편적", desc: "평점/리뷰 수가 신뢰 지표로 부각되지 않음", box: { x: 2, y: 42, w: 46, h: 4 } },
      ],
      changes: [
        { label: "리뷰 요약 — AI 한 줄 요약", desc: "수천 건 리뷰를 한 줄 요약 + 긍/부정 감성 분리", box: { x: 2, y: 25, w: 46, h: 11 } },
        { label: "영상 리뷰 — 썸네일 우선 노출", desc: "베스트 리뷰에 동영상(▶)을 우선 노출", box: { x: 2, y: 46, w: 46, h: 9 } },
        { label: "리뷰 탐색 — 키워드 칩/포토 필터", desc: "“공기 깨끗해요” 등 키워드로 빠른 탐색", box: { x: 2, y: 33, w: 46, h: 5 } },
        { label: "신뢰 지표 — 평점 전면화", desc: "리뷰 4.9(9,999) 등 평점/리뷰 수를 전면 노출", box: { x: 2, y: 42, w: 46, h: 4 } },
      ],
    },
    welcome: {
      id: "welcome", type: "live",
      kicker: "로봇 / 처음 만나는 웰니스 로봇",
      title: "처음 만나는 웰니스 로봇",
      iframe: "robotB.html",
    },
    a1live: {
      id: "a1live", type: "live",
      kicker: "웰니스 로봇 / 처음 만나는 웰니스 로봇",
      title: "처음 만나는 웰니스 로봇",
      iframe: "https://woong.mock.pe.kr/a1/",
      iframeFull: "https://woong.mock.pe.kr/a1/", lazy: true, hideTop: 64,
    },
    robot: {
      id: "robot", type: "story",
      kicker: "신규 메뉴",
      title: "로봇",
      desc: "‘가전’이 아니라 ‘로봇’ 회사로 각인시키기 위한 신규 메뉴입니다. 오버뷰에서 웰니스 로봇의 전체상을 보여주고,\n역량 1,2,3으로 나눠 ‘지금 되는 것(현재가치)’과 ‘앞으로 될 것(미래가치)’을 함께 보여줍니다.",
      strategy: {
        insight: "로봇은 ‘스스로 다가와, 함께 성장하는 존재’",
        problem: "지금의 나무엑스닷컴은 기능/스펙 중심의 정적인 그리드 구조라 ‘이동식 공기청정기’로 오해됩니다. 움직임/판단/관계가 보이지 않으면, 아무리 좋은 로봇도 ‘가전’으로 기억됩니다.",
        goals: [
          ["로봇으로 각인", "가만히 있는 가전이 아니라, 스스로 판단, 행동하는 로봇으로 인식시킨다."],
          ["제품 탐색 연결", "스토어(A1,세이프케어,에어센서)로 자연스럽게 연결한다."],
        ],
        spine: ["움직인다", "알아본다", "머문다", "지킨다", "성장한다"],
      },
      intent: "‘로봇’ 메뉴가 하려는 것 — 오버뷰에서 ‘웰니스 로봇’의 전체상을 보여주고, 역량 1/2/3으로 나눠 ‘지금 되는 것(현재가치)’과 ‘앞으로 될 것(미래가치)’을 한 흐름으로 엮습니다. 오픈 후에도 콘텐츠를 계속 디벨럽하는 살아있는 메뉴입니다.",
      summary: {
        why: "‘이동식 공기청정기’로 오해되는 인식을, ‘스스로 다가와 함께 성장하는 웰니스 로봇’으로 전환합니다.",
        how: [
          ["구조", "오버뷰 + 역량 1/2/3", "맞춤 케어 / 공간 케어 / 진화하는 AI 로 ‘로봇이 하는 일’을 4개 화면으로 구성."],
          ["서술", "현재가치 × 미래가치", "각 역량을 ‘지금 되는 것’과 ‘앞으로 될 것’으로 엮어 한 흐름으로 보여줌."],
          ["운영", "기존 자산으로 오픈 → 지속 업데이트", "오픈 시점엔 기존 이미지/영상을 재구성, 이후 전용 비주얼을 단계적으로 추가."],
        ],
      },
      overview: {
        no: "OVERVIEW", eyebrow: "Wellness Robot", cap: "오버뷰",
        nav: "처음 만나는 웰니스 로봇",
        quote: "켜는 순간이 아니라, 다가오는 순간.",
        lead: "스스로 다가와 나를 알아보고, 하루를 맞춰 케어하는 웰니스 로봇. 이 메뉴 전체가 ‘로봇은 무엇을 하는 존재인가’에 답합니다.",
        today: [
          ["대화가 통합니다", "음성만으로 알아듣고, 상황에 맞게 대화하며 필요한 일까지 해냅니다."],
          ["스스로 움직입니다", "집 안 곳곳을 익혀, 부딪힘 없이 원하는 곳으로 갑니다."],
          ["공기까지 챙깁니다", "보고 듣는 것은 물론, 공기질과 온습도까지 살핍니다."],
          ["나를 알아갑니다", "마주하기만 해도 컨디션을 읽고, 꼭 맞는 케어를 건넵니다."],
          ["안전하게 지킵니다", "데이터는 기기 안에서 암호화 처리, 국제 보안 인증으로 보호합니다."],
        ],
        tomorrow: [
          ["먼저 말을 건넵니다", "묻기 전에 알아차리고, 필요한 순간 먼저 챙깁니다."],
          ["손길까지 더합니다", "물건을 집고 건네며 돕는 차세대 모델(그립퍼)을 준비합니다."],
        ],
        assetNow: "오픈 시점: 기존 제품 렌더/브랜드 필름 컷을 재편집해 구성 → 향후 전용 KV 영상으로 교체/업데이트.",
      },
      caps: [
        {
          no: "역량 1", eyebrow: "Personal Care", cap: "나를 위한 맞춤 케어",
          quote: "좀 피곤해 보이세요. 컨디션은 제가 챙길게요.",
          lead: "말하지 않아도, 오늘의 컨디션을 살펴 필요한 케어를 건넵니다.",
          today: [
            ["나를 알아봅니다", "등록해 둔 얼굴로 나를 알아보고, 측정과 케어를 나에게 맞춥니다."],
            ["컨디션을 살핍니다", "손대지 않아도 10초면 5가지 컨디션을 읽고, 필요한 케어를 찾습니다."],
            ["하루를 함께합니다", "아침엔 모닝콜, 귀가엔 반갑게, 잠들 땐 음악으로 다독입니다."],
            ["밤엔 말동무가 됩니다", "‘하이나무’ 한마디면 일상 대화부터 케어 요청까지 들어줍니다."],
          ],
          tomorrow: [
            ["케어가 점점 확장됩니다", "수면/식단/운동, 그리고 멘탈케어까지."],
          ],
          assetNow: "오픈 시점: 기존 마이헬스케어/AI컴패니언 화면/영상 활용 → 향후 ‘웨이크업→웰컴→릴렉스’ 전용 컷 제작.",
        },
        {
          no: "역량 2", eyebrow: "Space Care", cap: "빈틈없는 공간 케어",
          quote: "멈춰 있는 건, 가전이나 하는 일.",
          lead: "오염은 찾아가고, 당신을 따라가고, 빈집은 지킵니다.",
          today: [
            ["찾아갑니다", "에어센서가 감지하면 A1이 이동해, 사각지대 없이 청정합니다."],
            ["따라옵니다", "부르면 따라와, 내가 있는 곳의 공기를 깨끗하게 합니다."],
            ["지킵니다", "순찰하며 이상을 감지하고, 에스원 긴급출동까지 연결합니다."],
            ["어디서든 봅니다", "밖에서도 직접 이동시켜 보고, 양방향으로 대화합니다."],
          ],
          tomorrow: [
            ["더 넓은 공간으로", "더 복잡한 공간, 실외까지."],
            ["더 많은 기기와 연결", "집 안 기기들과 손발을 맞춥니다."],
            ["먼저 살피는 안심", "이상을 미리 알아차리는 선제 케어로."],
          ],
          assetNow: "오픈 시점: 기존 에어솔루션/세이프케어/라이브뷰 자산 활용 → 향후 평면도 동선 모션 그래픽 제작.",
        },
        {
          no: "역량 3", eyebrow: "Evolving Care", cap: "매일 진화하는 AI",
          quote: "내일이, 더 기대되는 로봇입니다.",
          lead: "사용할수록 똑똑해집니다. 업데이트가 쌓일수록, 어제보다 나아집니다.",
          today: [
            ["어제 없던 기능", "정기 업데이트(OTA)로 어제 없던 기능이 더해집니다."],
            ["나에게 더 맞게", "쌓이는 데이터로 점점 더 똑똑하게 나에게 맞춰갑니다."],
          ],
          tomorrow: [
            ["먼저 판단하는 AI", "시키는 대로를 넘어, 스스로 판단해 먼저 챙기는 로봇으로."],
            ["함께 만드는 케어", "열린 생태계로 개발자/파트너의 새로운 케어가 함께합니다."],
            ["끝없이 똑똑해집니다", "생태계 데이터로 AI가 계속 고도화됩니다."],
          ],
          assetNow: "오픈 시점: OTA 업데이트 이력/릴리즈 노트 텍스트로 구성 → 향후 타임라인 인터랙션으로 고도화.",
        },
      ],
      roadmap: {
        title: "오픈 운영 방식",
        lead: "오픈 시엔 기존 자산을 재편집해 구성하고, 이후 단계적으로 업데이트합니다.",
        steps: [
          ["오픈", "기존 자산 재구성", "보유한 제품 렌더/브랜드 필름/기능 화면을 재편집해 4개 메뉴를 오픈."],
          ["1차 업데이트", "전용 비주얼 제작", "씬별 KV 영상/모션 그래픽을 순차 제작해 교체."],
          ["지속 고도화", "에이전틱/생태계", "OTA/파트너 케어가 늘수록 콘텐츠를 계속 확장."],
        ],
      },
    },
    brandstory: {
      id: "brandstory", type: "shot",
      kicker: "브랜드 / 브랜드 스토리",
      title: "브랜드 스토리",
      desc: "정적 이미지와 설명문 중심의 고도몰 브랜드 소개에서, 브랜드 필름과 타이포 서사로 몰입을 만드는 시네마틱 구성으로 바뀝니다.",
      asis: { src: "asis-brandstory.png".normalize("NFC"), ratio: 10337 / 1920, tag: "AS-IS", label: "고도몰", caption: "정적 이미지 히어로 + 긴 설명문 나열" },
      tobe: { src: "Frame 2116930399.jpg", ratio: 9670 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "브랜드 필름 + HUMAN 타이포 서사 + 파트너 신뢰 요소" },
      issues: [
        { label: "톤앤매너 — 다크톤 적용", desc: "다크 배경 위 저대비 텍스트로 핵심 메시지가 묻힘", sweep: true, sweepSpeed: 0.32, sweepSpeedEnd: 1.1, sweepStops: [{ y: 35, hold: 0 }], box: { x: 2, y: 95, w: 96, h: 4 } },
      ],
      changes: [
        { label: "톤앤매너 — 가독성 중심 개선", desc: "전체 페이지를 훑어보며 개선된 톤앤매너 확인", sweep: true, sweepSpeed: 0.3, box: { x: 2, y: 95, w: 96, h: 4 } },
      ],
    },
    brandasset: {
      id: "brandasset", type: "shot",
      kicker: "브랜드 / 브랜드 자산",
      title: "브랜드 자산",
      desc: "라이트 UI 위 아카이브식 나열에서, 브랜드 필름/다크 무드/사이드 내비게이션을 갖춘 몰입형 자산 페이지로 바뀝니다.",
      asis: { src: "asis-brandasset.png".normalize("NFC"), ratio: 9757 / 1920, tag: "AS-IS", label: "고도몰", caption: "라이트 UI 위 자산 아카이브식 나열" },
      tobe: { src: "tobe-brandasset.jpg".normalize("NFC"), ratio: 8594 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "브랜드 필름 + 다크 무드 + 사이드 내비게이션" },
      issues: [
        { label: "톤앤매너 — 다크모드와 어려운 진입 경로", desc: "배경과 자산의 무드가 달라 브랜드 몰입 저하", sweep: true, sweepSpeed: 0.3, box: { x: 2, y: 95, w: 96, h: 4 } },
      ],
      changes: [
        { label: "톤앤매너 — 라이트 단일 무드 가독성 개선", desc: "자산과 배경 톤을 통일해 브랜드 몰입 강화", sweep: true, sweepSpeed: 0.3, box: { x: 2, y: 95, w: 96, h: 4 } },
      ],
    },
    growx: {
      id: "growx", type: "shot", badge: "NEW",
      kicker: "고객지원 / 업데이트 소식",
      title: "업데이트 소식",
      desc: "이벤트 게시판 속 장문 이미지 한 장이었던 업데이트 소식을, 월별 목록/영상 하이라이트/이메일 구독을 갖춘 전용 메뉴로 전환합니다.\nOTA 성장 스토리가 곱 ‘구독 확장성’의 근거가 됩니다.",
      asis: { src: "6306301072e8d8922970611f63fc1189.png", ratio: 22317 / 1200, tag: "AS-IS", label: "고도몰", caption: "프로모션과 업데이트 공지가 장문 다크 이미지 한 장에 혼재" },
      tobe: { src: "tobe-growx.png".normalize("NFC"), ratio: 2408 / 1920, tag: "TO-BE", label: "리뉴얼", caption: "월별 목록 + 영상 하이라이트 + 이메일 구독으로 재방문 유도" },
      issues: [

        { label: "톤앤매너 — 장문 다크 이미지 한 장", desc: "한 화면이 끝없이 이어져 길이만 확인될 뿐 탐색 수단이 없음", sweep: true, sweepSpeed: 1.6, sweepThen: 1, box: { x: 2, y: 96, w: 96, h: 3 } },
        { label: "탐색 — 업데이트별 구분 부재", desc: "업데이트가 세로로만 이어져 목록/월별/키워드 탐색 불가", box: { x: 2, y: 96, w: 96, h: 3 } },
      ],
      changes: [
        { label: "대표 업데이트 하이라이트", desc: "이 달의 업데이트를 영상 배너로 전면 노출", zoom: 1, box: { x: 12, y: 22, w: 76, h: 14 } },
        { label: "카드 목록 — 썸네일/제목/날짜", desc: "업데이트별 카드형 목록, 페이지네이션으로 탐색", zoom: 1, box: { x: 12, y: 40.8, w: 76, h: 24.5 } },
        { label: "월별 필터/검색", desc: "연/월 단위 드롭다운 + 검색으로 지난 업데이트 탐색", zoom: 1, box: { x: 50, y: 36.3, w: 38, h: 11 } },
        { label: "이메일 구독 — 재방문 유도", desc: "새 업데이트 발생 시 메일 발송 → OTA 가치를 구독 근거로 전환", zoom: 1, box: { x: 12, y: 69.5, w: 76, h: 6.5 } },
      ],
    },
    news: {
      id: "news", type: "page",
      kicker: "브랜드 / 브랜드 소식",
      title: "나무엑스 뉴스",
      pages: NEWS_PAGES, startPage: 0,
      desc: "브랜드 소식을 PR 뉴스 / Instagram / YouTube 탭으로 묶고, 썸네일 카드 그리드와 검색·페이지네이션으로 탐색할 수 있게 재구성했습니다.",
    },
    instagram: {
      id: "instagram", type: "page",
      kicker: "브랜드 / 브랜드 소식",
      title: "인스타그램",
      pages: NEWS_PAGES, startPage: 1,
      desc: "공식 인스타그램 콘텐츠를 4열 카드 그리드로 노출해, 브랜드 소식 안에서 SNS 콘텐츠까지 한 흐름으로 탐색합니다.",
    },
    youtube: {
      id: "youtube", type: "page",
      kicker: "브랜드 / 브랜드 소식",
      title: "유튜브",
      pages: NEWS_PAGES, startPage: 2,
      desc: "공식 유튜브 영상을 썸네일 카드로 정렬해, 제품 가이드·업데이트·브랜드 필름을 브랜드 소식 안에서 바로 재생 탐색합니다.",
    },
    support: {
      id: "support", type: "page",
      kicker: "고객지원 / 홈",
      title: "고객지원 홈",
      src: "support-home.jpg", ratio: 2850 / 1920,
      desc: "보유 제품의 사용 가이드, 공지/FAQ, A/S·서비스 센터까지 구매 이후에 필요한 정보를 한 화면에 모은 고객지원 허브입니다.",
    },
    notice: {
      id: "notice", type: "page",
      kicker: "고객지원 / 공지사항",
      title: "공지사항",
      src: "support-notice.jpg", ratio: 2069 / 1920,
      desc: "공지사항을 카드 그리드로 재구성하고, 검색과 페이지네이션·‘공지’ 태그로 중요 소식을 먼저 눈에 띄게 했습니다.",
    },
    faq: {
      id: "faq", type: "page",
      kicker: "고객지원 / FAQ",
      title: "FAQ",
      src: "support-faq.jpg", ratio: 2689 / 1920,
      desc: "제품 문의 / 에어센서 / 필터 / 확장서비스 카테고리 탭과 검색을 붙이고, 답변을 아코디언으로 펼쳐 필요한 답만 빠르게 찾도록 재구성했습니다.",
    },
    svccenter: {
      id: "svccenter", type: "page",
      kicker: "고객지원 / 제품 지원 — 서비스 센터",
      title: "서비스 센터",
      src: "support-center.jpg", ratio: 2148 / 1920,
      desc: "지역 → 센터 선택 → 지도/상세를 한 화면에서 처리하고, 네이버·카카오·구글 지도 연결과 표준 운영시간 안내를 상단에 고정했습니다.",
    },
    manual: {
      id: "manual", type: "page",
      kicker: "고객지원 / 제품 지원 — 제품 설명서",
      title: "제품 설명서",
      src: "support-manual.jpg", ratio: 1849 / 1920,
      desc: "보유 제품별로 매뉴얼 다운로드와 사용설명서 보기를 한 행에 묶고, 모델명·검색을 붙여 내 제품 문서를 바로 찾도록 했습니다.",
    },
    usevideo: {
      id: "usevideo", type: "page",
      kicker: "고객지원 / 제품 지원 — 제품 활용 영상",
      title: "제품 활용 영상",
      src: "support-usevideo.jpg", ratio: 1782 / 1920,
      desc: "For Home / For Office 사용 맥락별 활용 영상을 큰 썸네일 카드로 배치해, 설명서 대신 ‘보고 이해하는’ 지원 콘텐츠로 구성했습니다.",
    },
    card: {
      id: "card", type: "page",
      kicker: "스토어 / 카드 혜택",
      title: "카드 혜택",
      src: "card-benefit-fhd.png", ratio: 2951 / 1920,
      desc: "GNB 곳곳에 흩어져 있던 카드 혜택 정보를 스토어 하위 한 페이지로 모았습니다. 제휴 카드와 이 달의 카드 혜택을 탭으로 나누고, 카드별 월 최대할인 / 연회비 / 전월 실적별 기본·행사 추가할인을 한 표에서 비교합니다.",
    },
    together: {
      id: "together", type: "page",
      kicker: "함께 만드는 로봇 시대",
      title: "함께 만드는 나무엑스",
      pages: [
        { label: "목록", src: "together-list.png".normalize("NFC") },
        { label: "상세보기", src: "together-view.png".normalize("NFC") },
      ],
    },
    diary: {
      id: "diary", type: "page", en: "blog",
      kicker: "함께 만드는 로봇 시대",
      title: "나무엑스 이야기",
      pages: [
        { label: "목록", src: "diary-list.png".normalize("NFC") },
        { label: "상세보기", src: "diary-view.png".normalize("NFC") },
      ],
      desc: "GEO 및 SEO 대응 페이지로 제품 가치를 일상 스토리로 풀어내는 콘텐츠 허브입니다.",
      hero: "로봇과 사는 시대, 나무엑스와 함께하는 일상",
      articles: [
        { title: "빌더 조쉰, MS = Claude Bloom", excerpt: "1인 빌더를 넘어 AI-native 기업을 운영하는 빌더 조쉰와 Claude Bloom 행사를 …", views: "조회 2,384", tags: "#세미나 #스타트업" },
        { title: "미네랄 워터 vs 일반 워터, 언제?", excerpt: "모든 상황에 ‘같은 물’이 정답은 아닙니다. 상황별 최적의 물 마시는 법을 …", views: "조회 1,884", tags: "#정수기 #건강수" },
        { title: "미네랄 워터 vs 일반 워터, 언제?", excerpt: "모든 상황에 ‘같은 물’이 정답은 아닙니다. 상황별 최적의 물 마시는 법을 …", views: "조회 1,884", tags: "#정수기 #건강수" },
      ],
      points: [
        ["콘텐츠 목록", "5개 단위 무한 목록", "최신 작성일 순 5개씩 노출, ‘더 보기’로 5개 단위 추가 로딩 (무한 스크롤 대응)"],
        ["카드 구성", "썸네일 / 발췤 / 메타", "본문 첫 이미지 자동 썸네일(가로 기준 리사이징), 제목/작성자(별명)/작성일/조회수 노출"],
        ["발견성", "해시태그 필터링", "작성 시 작성자가 해시태그 등록, 클릭 시 동일 태그 콘텐츠 필터링 → 탐색 유도"],
        ["상세 보기", "WYSIWYG 에디터 본문", "관리자 작성 시 Web Editor 제공, 제목/작성정보/본문 구성, 목록 복귀 시 이전 위치 유지"],
        ["향후 개선", "댓글 및 문의 연동 (2차)", "오픈 후 1단계 댓글, 관리자 문의하기 기능 추가 예정 → 고객 참여/상담 전환 강화"],
      ],
    },
    community: {
      id: "community", type: "concept",
      kicker: "신규 메뉴 / 기획 단계",
      title: "함께 만드는 로봇 시대", en: "COMMUNITY",
      desc: "사용자가 참여해 함께 키우는 팬 커뮤니티 메뉴입니다. 양방향 소통 기획안 기준으로 방향만 정리했습니다.",
      points: [
        ["영상/인증샷 릴레이", "사용자 콘텐츠를 메인/스토어로 순환"],
        ["팬 이벤트 / 해커톤", "#인증샷 이벤트, 나무엑스 해커톤 등 참여형"],
        ["제품 로드맵 참여", "기능 제안/투표로 다음 나무엑스를 함께 설계"],
      ],
    },
    robotEra: {
      id: "robotEra", type: "page", stageTag: "고도몰",
      kicker: "함께 만드는 로봇 시대",
      title: "로봇과 사는 시대",
      src: "assets/robot-era.png", ratio: 7176 / 3483,
    },
    imagine: {
      id: "imagine", type: "page", stageTag: "고도몰",
      kicker: "함께 만드는 로봇 시대",
      title: "나무엑스 꾸미기",
      src: "assets/imagine.jpg", ratio: 11841 / 2940,
    },
    roboEraHub: {
      id: "roboEraHub", type: "naming",
      kicker: "함께 만드는 로봇 시대 — 메뉴 네이밍(안)",
      title: "함께 만드는 로봇 시대",
      concept: "팬덤 커뮤니티 마케팅, 양방향 소통 메뉴",
      desc: "고객과 함께 만들어가는 브랜드 커뮤니티 메뉴입니다. 상위 메뉴명은 확정, 하위 5개 메뉴는 브랜드마케팅팀과 나무엑스운영팀 네이밍안을 비교해 2건(메뉴 3, 5)만 확정 협의가 남았습니다.",
      rows: [
        { no: "메뉴 1", role: "브랜드 필름, 인플루언서 영상 등", current: "로봇과 사는 시대", brand: "로봇과 사는 시대", ops: "로봇과 사는 시대", status: "확정" },
        { no: "메뉴 2", role: "고객 창작 공간, 참여 캠페인 (예: 나무엑스 꾸미기)", current: "상상해", curX: true, brand: "상상하는 로봇", ops: "상상하는 로봇", status: "확정" },
        { no: "메뉴 3", role: "고객 의견 수집(제품,기능,OTA, 웹 등) → 개선 반영 루프", pre: "(오픈 이후)", current: "만들어", curX: true, brand: "1안) 함께 만드는 로봇\n2안) 함께 개발하는 로봇", ops: "3안) 학습하는 로봇", status: "협의",
          candidates: [
            { id: "m3a", n: "1안", label: "함께 만드는 로봇", team: "브랜드마케팅팀" },
            { id: "m3b", n: "2안", label: "함께 개발하는 로봇", team: "브랜드마케팅팀" },
            { id: "m3c", n: "3안", label: "학습하는 로봇", team: "나무엑스운영팀" },
          ] },
        { no: "메뉴 4", role: "OTA 성장 기록으로 재방문 유도", current: "점점 더", curX: true, brand: "성장하는 로봇", ops: "성장하는 로봇", status: "확정" },
        { no: "메뉴 5", role: "GEO/SEO 목적, 공식 아티클(블로그)", current: "로봇 다이어리", brand: "1안) 소통하는 로봇", ops: "2안) 우리집 로봇의 일기장", status: "협의",
          candidates: [
            { id: "m5a", n: "1안", label: "소통하는 로봇", team: "브랜드마케팅팀" },
            { id: "m5b", n: "2안", label: "우리집 로봇의 일기장", team: "나무엑스운영팀" },
          ] },
      ],
      voters: [
        { id: "d1", role: "실장", name: "실장", weight: 3 },
        { id: "t1", role: "팀장", name: "팀장 A", weight: 2 },
        { id: "t2", role: "팀장", name: "팀장 B", weight: 2 },
        { id: "m1", role: "팀원", name: "팀원 01" }, { id: "m2", role: "팀원", name: "팀원 02" },
        { id: "m3", role: "팀원", name: "팀원 03" }, { id: "m4", role: "팀원", name: "팀원 04" },
        { id: "m5", role: "팀원", name: "팀원 05" }, { id: "m6", role: "팀원", name: "팀원 06" },
        { id: "m7", role: "팀원", name: "팀원 07" }, { id: "m8", role: "팀원", name: "팀원 08" },
        { id: "m9", role: "팀원", name: "팀원 09" }, { id: "m10", role: "팀원", name: "팀원 10" },
      ],
    },
  };

  // GNB 2depth — 스크린샷 IA 기준. desc=설명(기울임), tag=가칭, pre=오픈이후(빨강), xmark=X마크, children=하위
  const GNB = [
    { name: "웰니스 로봇", to: "robot", isNew: true, strategyTag: "가치 인지 | Awareness", strategy: "웰니스 로봇이 어떤 존재인지 이해시키는 공간", items: [
      { label: "처음 만나는 웰니스 로봇", thumb: "gnb_image-d7b8e515.jpg", screen: "a1live", descOnHover: true, desc: "로봇이 처음인 고객을 위한 오버뷰 — 나무엑스가 집안에서 무엇을 하는지, 왜 웰니스 로봇인지를 한 흐름으로 안내" },
      { label: "빈틈없는 공간 케어", thumb: "gnb-space-care.jpg", descOnHover: true, desc: "스스로 움직이며 집 전체를 살피는 공간 케어 — 에어솔루션, 세이프케어, 라이브뷰" },
      { label: "나를 위한 맞춤 케어", thumb: "gnb-personal-care.jpg", descOnHover: true, desc: "가족 한 사람 한 사람을 기억하는 개인 케어 — 마이헬스케어, 바이탈 체크, AI 컴패니언" },
      { label: "매일 진화하는 AI", thumb: "gnb-evolving-ai.jpg", descOnHover: true, desc: "사용할수록 똑똑해지는 로봇 — OTA 업데이트, 데이터 기반 초개인화, 파트너 생태계 확장" },
    ]},
    { name: "스토어", to: "store", strategyTag: "구매 전환 | Conversion", strategy: "구매에 필요한 모든 것을 한곳에 모은 구매 전용 공간", items: [
      { label: "제품", screen: "store", children: [
        { label: "A1", screen: "pdp" },
        { label: "에어센서" },
      ]},
      { label: "구독 서비스", children: [
        { label: "세이프케어" },
        { label: "라이브뷰" },
      ]},
      { label: "소모품", children: [
        { label: "올인원 필터" },
        { label: "프리 필터" },
      ]},
      { label: "이벤트" },
      { label: "카드 혜택", screen: "card" },
    ]},
    { name: "브랜드", strategyTag: "신뢰 | Trust", strategy: "브랜드 헤리티지와 철학을 소개하는 공간", items: [
      { label: "브랜드 스토리", screen: "brandstory" },
      { label: "브랜드 자산", screen: "brandasset" },
      { label: "브랜드 소식", children: [
        { label: "나무엑스 뉴스", screen: "news" },
        { label: "인스타그램", screen: "instagram" },
        { label: "유튜브", screen: "youtube" },
      ]},
    ]},
    { name: "고객지원", to: "support", strategyTag: "유지 | Retention", strategy: "구매 이후를 끝까지 돌보는 지원 공간", items: [
      { label: "공지사항", screen: "notice" },
      { label: "업데이트 소식", screen: "growx", isNew: true },
      { label: "FAQ", screen: "faq" },
      { label: "문의하기" },
      { label: "제품 지원", children: [
        { label: "A/S 안내" },
        { label: "서비스 센터", screen: "svccenter" },
        { label: "제품 설명서", screen: "manual" },
        { label: "제품 활용 영상", screen: "usevideo" },
      ]},
    ]},
    { name: "함께 만드는 로봇 시대", to: "roboEraHub", isNew: true, strategyTag: "유입&체류 | Engagement", strategy: "고객과 함께 로봇 시대를 만들어가는 참여 공간", items: [
      { label: "로봇과 사는 시대", descOnHover: true, desc: "로봇과 함께하는 일상을 보여주는 브랜드 스토리", screen: "robotEra" },
      { label: "나무엑스 꾸미기", thumb: "gnb_image-a1be88dd.jpg", descOnHover: true, desc: "고객이 참여해 나무엑스를 꾸미는 창작 공간", screen: "imagine" },
      { label: "함께 만드는 나무엑스", thumb: "gnb_image-7292ad9a.jpg", pre: "(오픈 이후)", descOnHover: true, desc: "고객 참여로 함께 키워가는 팬 커뮤니티 (향후 해커톤 연계, 아이디어 투표 및 좋아요 기능 추가, 커뮤니티 등급 제도 운영 등 오픈 이후 순차 개발 진행 예정)", screen: "together" },
      { label: "나무엑스 이야기", thumb: "gnb_image-380143cf.jpg", descOnHover: true, desc: "소식과 이야기를 전하는 블로그 (GEO/SEO, 총 11개팀 참여, 런칭 전 50개, 연내 100개 콘텐츠 업로드, 향후 팬 커뮤니티 우수회원을 외부 기고자로 확대 예정)", screen: "diary" },
    ]},
  ];

  window.DEMO_DATA = { GNB, SCREENS };
})();
