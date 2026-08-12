/* @ds-bundle: {"format":3,"namespace":"NAMUHXDesignSystem_7766e9","components":[{"name":"PriceBlock","sourcePath":"components/commerce/PriceBlock.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"RatingStars","sourcePath":"components/commerce/RatingStars.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ColorOption","sourcePath":"components/forms/ColorOption.jsx"},{"name":"OptionPill","sourcePath":"components/forms/OptionPill.jsx"},{"name":"OptionRow","sourcePath":"components/forms/OptionRow.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"TogglePair","sourcePath":"components/forms/TogglePair.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/commerce/PriceBlock.jsx":"7f60b03cccc1","components/commerce/ProductCard.jsx":"a37931db1493","components/commerce/RatingStars.jsx":"024b83fc48e8","components/core/Button.jsx":"1805050cd280","components/core/Card.jsx":"b720d2edaefa","components/core/Tag.jsx":"343618c7cd7f","components/forms/ColorOption.jsx":"0eb331872c1c","components/forms/OptionPill.jsx":"5ed08b2598b1","components/forms/OptionRow.jsx":"adec4c7afebe","components/forms/Select.jsx":"d24269f6c1aa","components/forms/Stepper.jsx":"fac13fda4928","components/forms/TogglePair.jsx":"15a539c12a24","components/navigation/Tabs.jsx":"3514ae429497","ui_kits/marketing/marketingHome.jsx":"55e402ce06e6","ui_kits/store/productDetail.jsx":"5fdffcf1c367","ui_kits/store/siteChrome.jsx":"e24a2ee70bde","ui_kits/store/storeListing.jsx":"d18750b38834"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NAMUHXDesignSystem_7766e9 = window.NAMUHXDesignSystem_7766e9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/PriceBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — PriceBlock
 * Renders a price with Korean affixes. Subscription mode shows
 * "월 51,900원 부터"; one-time mode shows "3,122,900원".
 */
function PriceBlock({
  amount,
  mode = "subscription",
  // subscription | once
  prefix,
  // override (default 월 for subscription)
  suffix,
  // override (default 부터 for subscription)
  size = "md",
  align = "left",
  ...rest
}) {
  const sizes = {
    sm: {
      num: 18,
      affix: 12
    },
    md: {
      num: 24,
      affix: 13
    },
    lg: {
      num: 32,
      affix: 15
    }
  };
  const s = sizes[size] || sizes.md;
  const pre = prefix !== undefined ? prefix : mode === "subscription" ? "월" : "";
  const suf = suffix !== undefined ? suffix : mode === "subscription" ? "부터" : "";
  const formatted = typeof amount === "number" ? amount.toLocaleString("ko-KR") : amount;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 5,
      justifyContent: align === "right" ? "flex-end" : "flex-start",
      fontFamily: "var(--font-sans)",
      color: "var(--text-strong)"
    }
  }, rest), pre && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.affix,
      fontWeight: "var(--fw-medium)",
      color: "var(--text-muted)"
    }
  }, pre), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.num,
      fontWeight: "var(--fw-bold)",
      letterSpacing: "-0.01em"
    }
  }, formatted), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.affix,
      fontWeight: "var(--fw-bold)"
    }
  }, "\uC6D0"), suf && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.affix,
      fontWeight: "var(--fw-medium)",
      color: "var(--text-muted)"
    }
  }, suf));
}
Object.assign(__ds_scope, { PriceBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceBlock.jsx", error: String((e && e.message) || e) }); }

// components/commerce/RatingStars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Star({
  fill = 1,
  size = 16
}) {
  // fill: 0..1 portion filled
  const id = "g" + Math.random().toString(36).slice(2);
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id
  }, /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--ws-mint)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--gray-200)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.6l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z",
    fill: `url(#${id})`
  }));
}

/**
 * NAMUH X — RatingStars
 * Mint star row with optional numeric score and review count (4.9 · 9,999).
 */
function RatingStars({
  value = 0,
  max = 5,
  size = 16,
  showValue = false,
  count,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 2
    }
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: size,
    fill: Math.max(0, Math.min(1, value - i))
  }))), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.9,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)"
    }
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.82,
      color: "var(--text-muted)"
    }
  }, "(", typeof count === "number" ? count.toLocaleString("ko-KR") : count, ")"));
}
Object.assign(__ds_scope, { RatingStars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/RatingStars.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Button
 * Pill-shaped action button. The signature variant carries a dark circular
 * arrow badge on the trailing edge (구독신청 →).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  trailingArrow = false,
  leadingIcon = null,
  fullWidth = false,
  disabled = false,
  as = "button",
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: 13,
      padH: 16,
      height: 38,
      gap: 8,
      arrow: 24
    },
    md: {
      fontSize: 15,
      padH: 22,
      height: 48,
      gap: 10,
      arrow: 30
    },
    lg: {
      fontSize: 16,
      padH: 28,
      height: 56,
      gap: 12,
      arrow: 34
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-default)"
    },
    dark: {
      background: "var(--ws-black)",
      color: "var(--ws-white)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--color-accent)",
      color: "var(--color-on-accent)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.primary;
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    disabled: as === "button" ? disabled : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: trailingArrow ? `0 6px 0 ${s.padH}px` : `0 ${s.padH}px`,
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-bold)",
      fontSize: s.fontSize,
      lineHeight: 1,
      letterSpacing: "-0.01em",
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
      whiteSpace: "nowrap",
      ...v
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.filter = "none";
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = "brightness(0.96)";
    }
  }, rest), leadingIcon, /*#__PURE__*/React.createElement("span", null, children), trailingArrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: s.arrow,
      height: s.arrow,
      flex: "none",
      borderRadius: "50%",
      background: variant === "dark" ? "var(--ws-mint)" : "var(--ws-black)",
      color: variant === "dark" ? "var(--ws-black)" : "var(--ws-white)",
      display: "grid",
      placeItems: "center",
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "18",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 18 12 12 18"
  }))));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Card
 * Generic surface container. Soft 20px radius, hairline border, light shadow.
 * Use as the base for product, content, promo and news cards.
 */
function Card({
  children,
  padding = 20,
  radius = "var(--radius-card)",
  interactive = false,
  bordered = true,
  elevated = false,
  tone = "default",
  // default | sunken | mint | dark
  style = {},
  ...rest
}) {
  const tones = {
    default: {
      background: "var(--surface-card)",
      color: "var(--text-body)"
    },
    sunken: {
      background: "var(--surface-sunken)",
      color: "var(--text-body)"
    },
    mint: {
      background: "var(--mint-100)",
      color: "var(--text-body)"
    },
    dark: {
      background: "var(--dark-surface)",
      color: "rgba(255,255,255,.82)"
    }
  };
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: t.background,
      color: t.color,
      borderRadius: radius,
      border: bordered ? `1px solid ${tone === "dark" ? "var(--dark-hairline)" : "var(--border-subtle)"}` : "none",
      boxShadow: elevated ? "var(--shadow-card)" : "none",
      padding,
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    },
    onMouseEnter: e => {
      if (!interactive) return;
      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      e.currentTarget.style.transform = "translateY(-3px)";
    },
    onMouseLeave: e => {
      if (!interactive) return;
      e.currentTarget.style.boxShadow = elevated ? "var(--shadow-card)" : "none";
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Tag / chip
 * Small category or status label. Mint-filled by default (e.g. "헬스케어 서비스",
 * keyword chips in AI review summaries); also outline & solid-dark tones.
 */
function Tag({
  children,
  tone = "mint",
  size = "md",
  ...rest
}) {
  const tones = {
    mint: {
      background: "var(--mint-100)",
      color: "var(--mint-700)",
      border: "transparent"
    },
    "mint-solid": {
      background: "var(--ws-mint)",
      color: "var(--ws-black)",
      border: "transparent"
    },
    blue: {
      background: "var(--blue-50)",
      color: "var(--blue-900)",
      border: "transparent"
    },
    neutral: {
      background: "var(--surface-sunken)",
      color: "var(--text-body)",
      border: "transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-default)"
    },
    dark: {
      background: "rgba(255,255,255,.10)",
      color: "var(--ws-white)",
      border: "transparent"
    }
  };
  const t = tones[tone] || tones.mint;
  const sizes = {
    sm: {
      fontSize: 11,
      padH: 8,
      height: 22
    },
    md: {
      fontSize: 12,
      padH: 11,
      height: 27
    },
    lg: {
      fontSize: 13,
      padH: 13,
      height: 32
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: s.height,
      padding: `0 ${s.padH}px`,
      fontFamily: "var(--font-sans)",
      fontSize: s.fontSize,
      fontWeight: "var(--fw-bold)",
      lineHeight: 1,
      letterSpacing: "0.01em",
      borderRadius: "var(--radius-pill)",
      background: t.background,
      color: t.color,
      border: `1px solid ${t.border}`,
      whiteSpace: "nowrap"
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — ProductCard
 * Store product tile: image on a soft surface, optional tag, name,
 * color dots, price and a CTA. Composes Tag, PriceBlock and Button.
 */
function ProductCard({
  image,
  name,
  tag,
  colors = [],
  // [{ name, swatch }]
  amount,
  priceMode = "subscription",
  ctaLabel = "구독신청",
  ctaVariant = "primary",
  onCta,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      e.currentTarget.style.transform = "translateY(-3px)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1 / 1",
      background: "var(--gray-50)",
      display: "grid",
      placeItems: "center"
    }
  }, tag && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "neutral",
    size: "sm"
  }, tag)), image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "82%",
      height: "82%",
      objectFit: "contain"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontSize: 13
    }
  }, "\uC774\uBBF8\uC9C0")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)",
      lineHeight: 1.4
    }
  }, name), colors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, colors.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: c.name,
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: c.swatch,
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PriceBlock, {
    amount: amount,
    mode: priceMode,
    size: "md"
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: ctaVariant,
    size: "sm",
    trailingArrow: true,
    onClick: onCta
  }, ctaLabel))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/ColorOption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — ColorOption
 * Large radio card for product color selection (Night Gray / Dawn White).
 * Shows a color dot + label; selected card gets a dark ring + check dot.
 */
function ColorOption({
  name,
  swatch = "#3A3D42",
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": selected,
    onClick: onClick,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: "26px 16px 18px",
      width: "100%",
      background: "var(--surface-card)",
      border: `1.5px solid ${selected ? "var(--ws-black)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      transition: "border-color var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: `2px solid ${selected ? "var(--ws-black)" : "var(--border-default)"}`,
      background: selected ? "var(--ws-black)" : "transparent",
      color: "#fff",
      display: "grid",
      placeItems: "center"
    }
  }, selected && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: "50%",
      background: swatch,
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)"
    }
  }, name));
}
Object.assign(__ds_scope, { ColorOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ColorOption.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** check glyph */
function Check({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
}

/**
 * NAMUH X — OptionPill
 * Segmented selectable pill used for subscription period (3년 / 5년 / 6년 / 7년)
 * and similar single-choice rows. Selected = dark outline + mint check.
 */
function OptionPill({
  children,
  selected = false,
  disabled = false,
  showCheck = true,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": selected,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      minHeight: 48,
      padding: "0 18px",
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: selected ? "var(--fw-bold)" : "var(--fw-medium)",
      color: disabled ? "var(--text-faint)" : "var(--text-strong)",
      background: "var(--surface-card)",
      border: `1.5px solid ${selected ? "var(--border-strong)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), showCheck && /*#__PURE__*/React.createElement("span", {
    style: {
      color: selected ? "var(--mint-500)" : "var(--gray-300)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Check, null)), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { OptionPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionPill.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — OptionRow
 * Full-width radio row with a title and supporting description, used for
 * "관리 유형" (방문형 / 셀프형 / 무방문형) and similar detailed choices.
 */
function OptionRow({
  title,
  description,
  selected = false,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": selected,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      width: "100%",
      textAlign: "left",
      padding: "16px 18px",
      background: selected ? "var(--mint-50)" : "var(--surface-card)",
      border: `1.5px solid ${selected ? "var(--border-strong)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: "none",
      marginTop: 1,
      borderRadius: "50%",
      border: `2px solid ${selected ? "var(--ws-black)" : "var(--border-default)"}`,
      background: selected ? "var(--ws-black)" : "transparent",
      color: "var(--ws-white)",
      display: "grid",
      placeItems: "center"
    }
  }, selected && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 15,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)"
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 4,
      fontSize: 13,
      lineHeight: 1.5,
      color: "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { OptionRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Select
 * Lightweight dropdown field styled to match the store filters
 * (구독 기간 ▾ / 라이프 뷰 ▾). Thin wrapper over a native <select>.
 */
function Select({
  value,
  onChange,
  options = [],
  placeholder,
  size = "md",
  style = {},
  ...rest
}) {
  const heights = {
    sm: 40,
    md: 46,
    lg: 52
  };
  const h = heights[size] || heights.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-block",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: h,
      padding: "0 38px 0 14px",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: "var(--fw-medium)",
      color: value ? "var(--text-strong)" : "var(--text-muted)",
      background: "var(--surface-card)",
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      outline: "none"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Stepper
 * Compact quantity control: [-] value [+] inside a pill/rounded field.
 */
function Stepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  style = {},
  ...rest
}) {
  const set = v => onChange && onChange(Math.max(min, Math.min(max, v)));
  const btn = disabled => ({
    width: 40,
    height: 44,
    flex: "none",
    display: "grid",
    placeItems: "center",
    color: disabled ? "var(--text-faint)" : "var(--text-strong)",
    cursor: disabled ? "not-allowed" : "pointer",
    background: "transparent"
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      overflow: "hidden",
      width: 150,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "decrease",
    disabled: value <= min,
    onClick: () => set(value - 1),
    style: btn(value <= min)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "var(--fw-bold)",
      color: "var(--text-strong)"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "increase",
    disabled: value >= max,
    onClick: () => set(value + 1),
    style: btn(value >= max)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/TogglePair.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — TogglePair
 * Two-button segmented control for binary 신청 여부 choices
 * (신청 안함 / 신청, 미적용 / 적용). Selected side gets dark outline + mint check.
 */
function TogglePair({
  options,
  value,
  onChange,
  style = {},
  ...rest
}) {
  // options: [{ value, label }] (exactly two)
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      ...style
    }
  }, rest), options.map(opt => {
    const selected = opt.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      "aria-pressed": selected,
      onClick: () => onChange && onChange(opt.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        minHeight: 46,
        padding: "0 14px",
        fontFamily: "var(--font-sans)",
        fontSize: 14.5,
        fontWeight: selected ? "var(--fw-bold)" : "var(--fw-medium)",
        color: "var(--text-strong)",
        background: "var(--surface-card)",
        border: `1.5px solid ${selected ? "var(--border-strong)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition: "border-color var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: selected ? "var(--mint-500)" : "var(--gray-300)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    }))), opt.label);
  }));
}
Object.assign(__ds_scope, { TogglePair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TogglePair.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NAMUH X — Tabs
 * Underline tab bar (구독하기 | 일시불 구매하기). Active tab carries a mint
 * underline. Each tab may show a small sub-label (e.g. a price).
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  size = "md",
  style = {},
  ...rest
}) {
  // tabs: [{ value, label, sub }]
  const fs = size === "lg" ? 17 : size === "sm" ? 14 : 15.5;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 0,
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), tabs.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(t.value),
      style: {
        flex: 1,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 7,
        padding: "14px 12px",
        fontFamily: "var(--font-sans)",
        fontSize: fs,
        fontWeight: "var(--fw-bold)",
        color: active ? "var(--text-strong)" : "var(--text-faint)",
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${active ? "var(--ws-mint)" : "transparent"}`,
        marginBottom: -1,
        cursor: "pointer",
        transition: "color var(--dur-fast) var(--ease-out)"
      }
    }, t.label, t.sub && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: fs * 0.78,
        fontWeight: "var(--fw-medium)",
        color: active ? "var(--text-muted)" : "var(--text-faint)"
      }
    }, t.sub));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/marketingHome.jsx
try { (() => {
/* NAMUH X — Marketing home (dark). Exposes window.MarketingHome.
   namux.com renewal homepage recreation. */
(function () {
  const DS = window.NAMUHXDesignSystem_7766e9;
  const {
    Button,
    Tag,
    Card,
    RatingStars
  } = DS;
  function WaveBg({
    opacity = 0.5
  }) {
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: "url(../../assets/patterns/wave-eq.png)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        mixBlendMode: "screen",
        filter: "hue-rotate(-6deg)",
        pointerEvents: "none"
      }
    });
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(120% 90% at 70% 10%, #11202c 0%, #0a0f15 45%, #08090b 100%)"
      }
    }, /*#__PURE__*/React.createElement(WaveBg, {
      opacity: 0.55
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: 1320,
        margin: "0 auto",
        padding: "120px var(--gutter) 130px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px",
        borderRadius: "var(--radius-pill)",
        background: "rgba(133,225,210,.12)",
        border: "1px solid rgba(133,225,210,.3)",
        marginBottom: 26
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "var(--ws-mint)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        color: "var(--ws-mint)",
        letterSpacing: ".04em"
      }
    }, "\uB85C\uBD07\uACFC \uC0AC\uB294 \uC2DC\uB300")), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: "clamp(40px,5.4vw,76px)",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.08,
        letterSpacing: "-0.025em"
      }
    }, "\uC6B0\uB9AC\uC9D1\uC5D0 \uC774\uC0C1\uD55C \uB140\uC11D\uC774", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ws-mint)"
      }
    }, "\uB4E4\uC5B4\uC654\uB2E4")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        color: "rgba(255,255,255,.66)",
        marginTop: 22,
        maxWidth: 480,
        lineHeight: 1.6
      }
    }, "\uB9E4\uC77C\uC758 \uACF5\uAE30\uBD80\uD130 \uAC00\uC871\uC758 \uAC74\uAC15\uAE4C\uC9C0 \u2014 \uC9C0\uB2A5\uD615 \uC6F0\uB2C8\uC2A4 \uB85C\uBD07, \uB098\uBB34\uC5D1\uC2A4."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginTop: 34
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      trailingArrow: true
    }, "\uAD6C\uB3C5 \uC2DC\uC791\uD558\uAE30"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      style: {
        background: "transparent",
        color: "#fff",
        borderColor: "rgba(255,255,255,.35)"
      }
    }, "\uC601\uC0C1 \uBCF4\uAE30"))));
  }
  function FeatureGrid() {
    const items = [{
      tag: "AI Service",
      title: "스마트한 AI 자율주행",
      body: "집안 구조를 학습해 가장 효율적인 동선으로 케어합니다.",
      img: "robot-a1",
      kind: "product"
    }, {
      tag: "Health Care",
      title: "매일 측정하는 Vital Sign",
      body: "비접촉 5가지 바이탈 사인 체크로 가족 건강을 살핍니다.",
      img: "kid-robot"
    }, {
      tag: "Life Care",
      title: "오디오·조명·알림을 하나로",
      body: "집안 모든 순간을 나무엑스가 함께합니다.",
      img: "sofa-robot"
    }, {
      tag: "Safe & Security",
      title: "글로벌 최고 수준 개인정보",
      body: "온디바이스 처리로 안심하고 사용하세요.",
      img: "robot-a1",
      kind: "product"
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1320,
        margin: "0 auto",
        padding: "90px var(--gutter) 30px"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        marginBottom: 30
      }
    }, "\uC9C0\uB2A5\uD615 \uB85C\uBD07, \uB098\uBB34\uC5D1\uC2A4\uC758 \uB2E4\uC591\uD55C \uAE30\uB2A5"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16
      }
    }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--dark-surface)",
        border: "1px solid var(--dark-hairline)",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "1/1",
        background: it.kind === "product" ? "linear-gradient(150deg,#10202a,#0a131a)" : "var(--dark-elevated)",
        display: "grid",
        placeItems: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `../../assets/${it.kind === "product" ? "products" : "lifestyle"}/${it.img}.png`,
      alt: "",
      style: {
        width: it.kind === "product" ? "70%" : "100%",
        height: it.kind === "product" ? "70%" : "100%",
        objectFit: it.kind === "product" ? "contain" : "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 14,
        left: 14
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: "dark",
      size: "sm"
    }, it.tag))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 18px 20px",
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16.5,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.35
      }
    }, it.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,.58)",
        marginTop: 8,
        lineHeight: 1.6,
        flex: 1
      }
    }, it.body), /*#__PURE__*/React.createElement("button", {
      style: {
        marginTop: 14,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        fontWeight: 700,
        color: "var(--ws-mint)"
      }
    }, "\uB354 \uC54C\uC544\uBCF4\uAE30", /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "18",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 18 12 12 18"
    }))))))));
  }
  function MintBand() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--ws-mint)",
        marginTop: 70
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "64px var(--gutter)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--mint-700)",
        letterSpacing: ".06em",
        marginBottom: 12
      }
    }, "WELLNESS ROBOTICS"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 34,
        fontWeight: 700,
        color: "var(--ws-black)",
        lineHeight: 1.25
      }
    }, "\uB85C\uBD07\uACFC \uC0AC\uB294 \uC2DC\uB300,", /*#__PURE__*/React.createElement("br", null), "\uB098\uBB34\uC5D1\uC2A4\uC640 \uD568\uAED8 \uC2DC\uC791\uD558\uC138\uC694")), /*#__PURE__*/React.createElement(Button, {
      variant: "dark",
      size: "lg",
      trailingArrow: true
    }, "\uC2A4\uD1A0\uC5B4 \uB458\uB7EC\uBCF4\uAE30")));
  }
  function ReviewRail() {
    const reviews = [{
      t: "오브제인 줄 알았는데",
      img: "sofa-robot"
    }, {
      t: "아이의 첫번째 친구",
      img: "kid-robot"
    }, {
      t: "공기가 정말 깨끗해요",
      img: "sofa-robot"
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1320,
        margin: "0 auto",
        padding: "90px var(--gutter)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        marginBottom: 8
      }
    }, "\uAE50\uAE50\uD55C \uC5BC\uB9AC\uC5B4\uB2F5\uD130\uB4E4\uC758 \uADF9\uCC2C \uB9B4\uB808\uC774 \uB9AC\uBDF0"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement(RatingStars, {
      value: 4.9,
      showValue: true,
      count: 9999,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 16
      }
    }, reviews.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "3/4",
        background: "var(--dark-surface)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `../../assets/lifestyle/${r.img}.png`,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: .9
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,rgba(8,9,11,0) 40%,rgba(8,9,11,.85))"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 18,
        right: 18,
        bottom: 18
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: "mint-solid",
      size: "sm"
    }, "REVIEW"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: "#fff",
        marginTop: 10
      }
    }, r.t))))));
  }
  function MarketingHome() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-dark",
      style: {
        background: "var(--dark-bg)"
      }
    }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(FeatureGrid, null), /*#__PURE__*/React.createElement(MintBand, null), /*#__PURE__*/React.createElement(ReviewRail, null));
  }
  window.MarketingHome = MarketingHome;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/marketingHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/store/productDetail.jsx
try { (() => {
/* NAMUH X Store — Product Detail (PDP) with subscription config.
   Exposes window.ProductDetail. Uses the DS bundle components. */
(function () {
  const DS = window.NAMUHXDesignSystem_7766e9;
  const {
    Tabs,
    Tag,
    Button,
    ColorOption,
    OptionPill,
    OptionRow,
    TogglePair,
    Stepper,
    RatingStars,
    PriceBlock
  } = DS;
  const {
    useState
  } = React;
  function Section({
    label,
    hint,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 26
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 17,
        fontWeight: "var(--fw-bold)",
        color: "var(--text-strong)"
      }
    }, label), hint && /*#__PURE__*/React.createElement("span", {
      title: hint,
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "1px solid var(--border-default)",
        color: "var(--text-faint)",
        fontSize: 11,
        display: "grid",
        placeItems: "center",
        cursor: "help"
      }
    }, "i")), children);
  }
  function DetailBlock({
    img,
    eyebrow,
    title,
    body
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--ws-black)",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "16/10",
        background: "linear-gradient(150deg,#0c1430,#04122b 55%,#081019)",
        position: "relative",
        display: "grid",
        placeItems: "center"
      }
    }, img ? /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: "",
      style: {
        width: "62%",
        objectFit: "contain",
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,.5))"
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, rgba(133,225,210,.5), rgba(133,225,210,0) 70%)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 24px 26px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "var(--ws-mint)",
        fontSize: 12,
        fontWeight: "var(--fw-bold)",
        letterSpacing: ".06em",
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#fff",
        fontSize: 21,
        fontWeight: "var(--fw-bold)",
        lineHeight: 1.35,
        marginBottom: 10
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "rgba(255,255,255,.62)",
        fontSize: 13.5,
        lineHeight: 1.7
      }
    }, body)));
  }
  function ProductDetail() {
    const [buyMode, setBuyMode] = useState("sub");
    const [tab, setTab] = useState("info");
    const [color, setColor] = useState("gray");
    const [period, setPeriod] = useState("3년");
    const [mtype, setMtype] = useState("visit");
    const [cross, setCross] = useState("none");
    const [family, setFamily] = useState("none");
    const [resale, setResale] = useState("none");
    const [prepay, setPrepay] = useState("0");
    const [safecare, setSafecare] = useState("none");
    const [qty, setQty] = useState(1);
    const swatch = color === "gray" ? "#3A3D42" : "#EDEEEF";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-page)",
        minHeight: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1240,
        margin: "0 auto",
        padding: "28px var(--gutter) 0",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 470px",
        gap: 40,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        top: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "linear-gradient(160deg,#eef1f3,#dfe5e9)",
        aspectRatio: "1/1",
        display: "grid",
        placeItems: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/products/robot-a1.png",
      alt: "\uB098\uBB34\uC5D1\uC2A4 A1",
      style: {
        width: "76%",
        objectFit: "contain"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        bottom: 16,
        left: 16,
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-pill)",
        padding: "6px 12px",
        fontSize: 12.5,
        fontWeight: 700,
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: swatch,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)"
      }
    }), color === "gray" ? "Night Gray" : "Dawn White")))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "var(--text-strong)"
      }
    }, "\uD3EC\uD1A0 / \uB3D9\uC601\uC0C1 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--mint-600)"
      }
    }, "999+")), /*#__PURE__*/React.createElement("button", {
      style: {
        fontSize: 12.5,
        color: "var(--text-muted)"
      }
    }, "\uC804\uCCB4\uBCF4\uAE30 \u203A")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 8
      }
    }, ["sofa-robot", "kid-robot", "sofa-robot", "kid-robot"].map((n, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        aspectRatio: "1/1",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        background: "var(--gray-100)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `../../assets/lifestyle/${n}.png`,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        background: "var(--mint-100)",
        borderRadius: "var(--radius-md)",
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--mint-700)"
      }
    }, "NAMUH", /*#__PURE__*/React.createElement("span", {
      style: {
        verticalAlign: "super",
        fontSize: 8
      }
    }, "X"), " \xB7 \uC774\uB2EC\uC758 \uC0AC\uC740\uD488"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        color: "var(--text-strong)",
        marginTop: 3
      }
    }, "\uC81C\uD488 \uAD6C\uB3C5 \uC2DC \uC774\uB2EC\uC758 \uC0AC\uC740\uD488\uC744 \uC120\uD0DD\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: "mint-solid"
    }, "NAMUH Pay 50,000"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      size: "sm",
      tabs: [{
        value: "info",
        label: "제품 안내"
      }, {
        value: "review",
        label: "리뷰 (999+)"
      }, {
        value: "qna",
        label: "상품 문의"
      }, {
        value: "as",
        label: "배송 및 AS"
      }]
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20
      }
    }, tab === "review" ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(RatingStars, {
      value: 4.9,
      showValue: true,
      count: 9999,
      size: 20
    })), [["두대에서 한대로 공간 최소화", "좋은 기회가 주어져서 기존 2대였던 로봇청정기를 바꿨습니다…"], ["토이스토리가 현실로! 아이의 첫번째 친구", "아이를 정말 좋아하는 녀석이라 처음엔 그냥 가전이라 생각했는데…"]].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement(RatingStars, {
      value: 5,
      size: 13
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        color: "var(--text-strong)",
        margin: "8px 0 6px"
      }
    }, r[0]), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)",
        lineHeight: 1.6
      }
    }, r[1])))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DetailBlock, {
      eyebrow: "Wellness Solution",
      title: "Wellness Solution\uC744 \uD558\uB098\uB85C \uACBD\uD5D8, A1",
      body: "\uACF5\uAE30 \uCCAD\uC815\uACFC \uCF00\uC5B4\uB97C \uB118\uC5B4, \uAC00\uC871\uC758 \uD558\uB8E8\uB97C \uC0B4\uD53C\uB294 \uC6F0\uB2C8\uC2A4 \uB85C\uBD07. \uCE21\uC815\xB7\uC774\uB3D9\xB7\uB300\uD654\xB7\uCF00\uC5B4\uAE4C\uC9C0 \uD558\uB098\uC758 \uC9C0\uB2A5\uD615 \uB85C\uBD07\uC774 \uB2F4\uB2F9\uD569\uB2C8\uB2E4.",
      img: "../../assets/products/robot-a1.png"
    }), /*#__PURE__*/React.createElement(DetailBlock, {
      eyebrow: "Air Solution",
      title: "\uC6F0\uB2C8\uC2A4 \uC2DC\uC791\uC740 \uACF5\uAE30\uBD80\uD130, \uC561\uD2F0\uBE0C\uD55C Air Solution",
      body: "VIXION AI\uAC00 \uC9D1\uC548 \uACF3\uACF3\uC758 \uACF5\uAE30\uC9C8\uC744 \uCE21\uC815\uD558\uACE0, \uC624\uC5FC\uC774 \uAC10\uC9C0\uB41C \uACF5\uAC04\uC744 \uBA3C\uC800 \uCC3E\uC544 \uCCAD\uC815\uD569\uB2C8\uB2E4. \uD544\uC694\uD55C \uACF3\uC73C\uB85C \uC9C1\uC811 \uC774\uB3D9\uD558\uB294 \uC561\uD2F0\uBE0C \uCCAD\uC815."
    }), /*#__PURE__*/React.createElement(DetailBlock, {
      eyebrow: "Smart AI",
      title: "\uC2A4\uB9C8\uD2B8\uD55C AI \uC790\uC728 \uC8FC\uD589",
      body: "\uB77C\uC774\uB2E4 \uAE30\uBC18 \uC790\uC728\uC8FC\uD589\uC73C\uB85C \uAC00\uAD6C\uC640 \uC0AC\uB78C\uC744 \uD53C\uD574 \uBD80\uB4DC\uB7FD\uAC8C \uC774\uB3D9\uD558\uACE0, \uC9D1\uC548 \uAD6C\uC870\uB97C \uD559\uC2B5\uD574 \uAC00\uC7A5 \uD6A8\uC728\uC801\uC778 \uB3D9\uC120\uC73C\uB85C \uCF00\uC5B4\uD569\uB2C8\uB2E4."
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        top: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 30,
        fontWeight: "var(--fw-bold)",
        color: "var(--text-strong)",
        lineHeight: 1.1
      }
    }, "A1"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--text-faint)",
        marginTop: 6,
        letterSpacing: ".04em"
      }
    }, "WRB47M1DX0NG")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid var(--border-subtle)",
        display: "grid",
        placeItems: "center",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
    }))), /*#__PURE__*/React.createElement("button", {
      style: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid var(--border-subtle)",
        display: "grid",
        placeItems: "center",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "17",
      height: "17",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "5",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "19",
      r: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8.6",
      y1: "13.5",
      x2: "15.4",
      y2: "17.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15.4",
      y1: "6.5",
      x2: "8.6",
      y2: "10.5"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: buyMode,
      onChange: setBuyMode,
      tabs: [{
        value: "sub",
        label: "구독하기",
        sub: "월 51,900원 부터"
      }, {
        value: "once",
        label: "일시불 구매",
        sub: "3,122,900원"
      }]
    })), /*#__PURE__*/React.createElement(Section, {
      label: "\uC6D0\uD558\uC2DC\uB294 \uC0C9\uC0C1\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uC0C9\uC0C1 \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(ColorOption, {
      name: "Night Gray",
      swatch: "#3A3D42",
      selected: color === "gray",
      onClick: () => setColor("gray")
    }), /*#__PURE__*/React.createElement(ColorOption, {
      name: "Dawn White",
      swatch: "#EDEEEF",
      selected: color === "white",
      onClick: () => setColor("white")
    }))), buyMode === "sub" && /*#__PURE__*/React.createElement(Section, {
      label: "\uAD6C\uB3C5 \uAE30\uAC04\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uAD6C\uB3C5 \uAE30\uAC04 \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 10
      }
    }, ["3년", "5년", "6년", "7년"].map(p => /*#__PURE__*/React.createElement(OptionPill, {
      key: p,
      selected: period === p,
      onClick: () => setPeriod(p)
    }, p)))), /*#__PURE__*/React.createElement(Section, {
      label: "\uB098\uC5D0\uAC8C \uB9DE\uB294 \uAD00\uB9AC \uC720\uD615\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uAD00\uB9AC \uC720\uD615 \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(OptionRow, {
      title: "\uBC29\uBB38\uD615",
      description: "\uD544\uD130: \uC804\uBB38 MC\uAC00 4\uAC1C\uC6D4\uB9C8\uB2E4 \uC9C1\uC811 \uBC29\uBB38\uD558\uC5EC \uAD50\uCCB4 / \uC810\uAC80: 4\uAC1C\uC6D4\uB9C8\uB2E4 \uC81C\uD488 \uC810\uAC80 \uBC0F \uCF00\uC5B4",
      selected: mtype === "visit",
      onClick: () => setMtype("visit")
    }), /*#__PURE__*/React.createElement(OptionRow, {
      title: "\uC140\uD504\uD615",
      description: "\uD544\uD130: 4\uAC1C\uC6D4\uB9C8\uB2E4 \uBC30\uC1A1\uB418\uBA70 \uACE0\uAC1D\uC774 \uC9C1\uC811 \uAD50\uCCB4 / \uC810\uAC80: \uC804\uBB38 MC\uAC00 12\uAC1C\uC6D4\uB9C8\uB2E4 \uBC29\uBB38 \uC810\uAC80",
      selected: mtype === "self",
      onClick: () => setMtype("self")
    }), /*#__PURE__*/React.createElement(OptionRow, {
      title: "\uBB34\uBC29\uBB38\uD615",
      description: "\uD544\uD130: 4\uAC1C\uC6D4\uB9C8\uB2E4 \uBC30\uC1A1\uB418\uBA70 \uACE0\uAC1D\uC774 \uC9C1\uC811 \uAD50\uCCB4 / \uC810\uAC80: \uC140\uD504 \uC810\uAC80",
      selected: mtype === "none",
      onClick: () => setMtype("none")
    }))), /*#__PURE__*/React.createElement(Section, {
      label: "\uBCF4\uC0C1 \uBC0F \uD560\uC778 \uC2E0\uCCAD \uC5EC\uBD80\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uBCF4\uC0C1 \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, [["크로스 할인 신청", cross, setCross], ["패밀리 보상 신청", family, setFamily], ["보상 판매 신청", resale, setResale]].map(([lab, val, set], i) => /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: "var(--text-body)",
        marginBottom: 8
      }
    }, lab), /*#__PURE__*/React.createElement(TogglePair, {
      value: val,
      onChange: set,
      options: [{
        value: "none",
        label: "신청 안함"
      }, {
        value: "apply",
        label: "신청"
      }]
    }))))), /*#__PURE__*/React.createElement(Section, {
      label: "\uC120\uACB0\uC81C \uAE08\uC561\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uC120\uACB0\uC81C \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 10
      }
    }, [["0", "미적용"], ["1000000", "1,000,000원"], ["2000000", "2,000,000원"]].map(([v, l]) => /*#__PURE__*/React.createElement(OptionPill, {
      key: v,
      selected: prepay === v,
      showCheck: v === "0",
      onClick: () => setPrepay(v)
    }, l)))), /*#__PURE__*/React.createElement(Section, {
      label: "\uC138\uC774\uD504\uCF00\uC5B4(\uC6D4 \uAD6C\uB3C5\uB8CC) \uC2E0\uCCAD \uC5EC\uBD80\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
      hint: "\uC138\uC774\uD504\uCF00\uC5B4 \uC548\uB0B4"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 10
      }
    }, [["none", "신청 안함"], ["basic", "베이직 4,000원"], ["plus", "플러스 12,900원"]].map(([v, l]) => /*#__PURE__*/React.createElement(OptionPill, {
      key: v,
      selected: safecare === v,
      showCheck: v === "none",
      onClick: () => setSafecare(v)
    }, l)))), /*#__PURE__*/React.createElement(Section, {
      label: "\uD544\uC694\uD558\uC2E0 \uC218\uB7C9\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
    }, /*#__PURE__*/React.createElement(Stepper, {
      value: qty,
      min: 1,
      max: 9,
      onChange: setQty
    })), /*#__PURE__*/React.createElement(Section, {
      label: "\uC6D4 \uAD6C\uB3C5\uB8CC \uD560\uC778\uBD80\uD130 \uBB34\uC774\uC790 \uD560\uBD80\uAE4C\uC9C0 \uB2E4\uC591\uD55C \uD61C\uD0DD\uC744 \uB9CC\uB098\uBCF4\uC138\uC694.",
      hint: "\uCE74\uB4DC \uD61C\uD0DD"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: "var(--text-strong)",
        marginBottom: 12
      }
    }, "\uB9E4\uC6D4 \uCD5C\uB300 2\uB9CC 8\uCC9C\uC6D0 \uAD6C\uB3C5 \uC694\uAE08 \uCD94\uAC00\uD560\uC778"), [["SK 인벨럭스 신한카드", "월 최대 28,000원"], ["SK 인벨럭스 삼성카드", "월 최대 26,000원"], ["KB국민 SK 인벨럭스 올림카드", "월 최대 20,000원"]].map(([a, b], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12.5,
        color: "var(--text-muted)",
        padding: "5px 0"
      }
    }, /*#__PURE__*/React.createElement("span", null, a), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "var(--text-body)"
      }
    }, b))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        background: "var(--mint-100)",
        color: "var(--mint-700)",
        borderRadius: "var(--radius-sm)",
        padding: "11px 14px",
        fontSize: 13,
        fontWeight: 700,
        textAlign: "center"
      }
    }, "\uCD5C\uB300 7\uAC1C\uC6D4 \uBB34\uC774\uC790 \uD61C\uD0DD"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        bottom: 16,
        marginTop: 8,
        background: "var(--ws-blue)",
        borderRadius: "var(--radius-lg)",
        padding: "16px 18px",
        color: "#fff",
        boxShadow: "var(--shadow-lg)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        opacity: .7
      }
    }, "\uC6D4"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 26,
        fontWeight: 700
      }
    }, "51,900"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, "\uC6D0")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        opacity: .72,
        textAlign: "right"
      }
    }, "\uAD6C\uB3C5\uAC00\uC785\uBE44 -100,000\uC6D0", /*#__PURE__*/React.createElement("br", null), "\uC124\uCE58\uBE44 -150,000\uC6D0")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "md",
      style: {
        flex: 1,
        background: "transparent",
        color: "#fff",
        borderColor: "rgba(255,255,255,.4)"
      }
    }, "\uBC29\uBB38\uC0C1\uB2F4 \uC2E0\uCCAD"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md",
      trailingArrow: true,
      style: {
        flex: 1.4
      }
    }, "\uB2E4\uC774\uB809\uD2B8 \uAD6C\uB3C5"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 40
      }
    }))));
  }
  window.ProductDetail = ProductDetail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/productDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/store/siteChrome.jsx
try { (() => {
/* NAMUH X — shared site chrome (logo, header, footer). Light + dark.
   Exposes window.NamuhLogo, window.StoreHeader, window.SiteFooter. */
(function () {
  const DS = window.NAMUHXDesignSystem_7766e9;
  function NamuhLogo({
    color = "var(--text-strong)",
    size = 22
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "flex-start",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        color,
        letterSpacing: "-0.02em",
        lineHeight: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: size
      }
    }, "NAMUH"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: size * 0.5,
        color: "var(--ws-mint)",
        marginLeft: 2,
        marginTop: -1
      }
    }, "X"));
  }
  const NAV = ["나무엑스", "스토어", "디스커버", "브랜드스토리", "고객지원"];
  function StoreHeader({
    active = "스토어",
    dark = false,
    onLogo
  }) {
    const fg = dark ? "var(--text-on-dark)" : "var(--text-strong)";
    const muted = dark ? "rgba(255,255,255,.66)" : "var(--text-muted)";
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: dark ? "rgba(8,9,11,.82)" : "rgba(255,255,255,.86)",
        backdropFilter: "saturate(160%) blur(14px)",
        borderBottom: `1px solid ${dark ? "var(--dark-hairline)" : "var(--border-subtle)"}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1320,
        margin: "0 auto",
        height: 62,
        padding: "0 var(--gutter)",
        display: "flex",
        alignItems: "center",
        gap: 36
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onLogo,
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(NamuhLogo, {
      color: fg
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: 28,
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        color: n === active ? fg : muted,
        cursor: "pointer",
        paddingBottom: 2,
        borderBottom: n === active ? `2px solid var(--ws-mint)` : "2px solid transparent"
      }
    }, n))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        color: fg
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "21",
      height: "21",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.5",
      y2: "16.5"
    })), /*#__PURE__*/React.createElement("svg", {
      width: "21",
      height: "21",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21c0-4 3.6-7 8-7s8 3 8 7"
    })), /*#__PURE__*/React.createElement("svg", {
      width: "21",
      height: "21",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 7h13l-1.4 9.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8L6 4H3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "20.5",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "20.5",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    })))));
  }
  function SiteFooter() {
    const cols = [["이용약관", "개인정보처리방침", "BIZ임직원등록"], ["계약서안내", "소비자분쟁해결기준", "오픈소스 라이센스", "사이트맵"]];
    return /*#__PURE__*/React.createElement("footer", {
      className: "ws-dark",
      style: {
        background: "var(--ws-black)",
        color: "rgba(255,255,255,.6)",
        marginTop: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1320,
        margin: "0 auto",
        padding: "44px var(--gutter)",
        display: "flex",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NamuhLogo, {
      color: "#fff",
      size: 20
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        marginTop: 20,
        fontSize: 12.5
      }
    }, cols.flat().map(c => /*#__PURE__*/React.createElement("a", {
      key: c,
      style: {
        color: "rgba(255,255,255,.6)",
        cursor: "pointer"
      }
    }, c))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "rgba(255,255,255,.32)",
        marginTop: 20,
        lineHeight: 1.8
      }
    }, "(\uC8FC)\uB098\uBB34\uC5D1\uC2A4 \xB7 \uB300\uD45C \uD64D\uAE38\uB3D9 \xB7 \uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uC885\uB85C\uAD6C \uC885\uB85C 1 \uB098\uBB34\uC5D1\uC2A4\uD0C0\uC6CC", /*#__PURE__*/React.createElement("br", null), "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638 000-00-00000 \xB7 \uD1B5\uC2E0\uD310\uB9E4\uC5C5\uC2E0\uACE0 \uC81C0000\uD638", /*#__PURE__*/React.createElement("br", null), "2026 Copyright NAMUH X. All Rights Reserved.")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "rgba(255,255,255,.5)"
      }
    }, "\uACE0\uAC1D\uC13C\uD130"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 28,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: ".02em",
        marginTop: 4
      }
    }, "1600-1937"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "rgba(255,255,255,.4)",
        marginTop: 6,
        lineHeight: 1.7
      }
    }, "\uD3C9\uC77C 09:00\u201318:00", /*#__PURE__*/React.createElement("br", null), "\uC8FC\uB9D0\xB7\uACF5\uD734\uC77C \uD734\uBB34"))));
  }
  window.NamuhLogo = NamuhLogo;
  window.StoreHeader = StoreHeader;
  window.SiteFooter = SiteFooter;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/siteChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/store/storeListing.jsx
try { (() => {
/* NAMUH X Store — listing page. Exposes window.StoreListing. */
(function () {
  const DS = window.NAMUHXDesignSystem_7766e9;
  const {
    ProductCard,
    Card,
    Tag,
    Button,
    PriceBlock
  } = DS;
  function SectionHead({
    title,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 26
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 26,
        fontWeight: "var(--fw-bold)",
        color: "var(--text-strong)"
      }
    }, title), sub && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        color: "var(--text-muted)",
        marginTop: 7
      }
    }, sub));
  }
  const Wrap = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "0 var(--gutter)",
      ...style
    }
  }, children);
  function ServiceCard({
    tag,
    name,
    price,
    free
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      elevated: true,
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 230
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: "mint",
      size: "sm"
    }, tag), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "grid",
        placeItems: "center",
        color: "var(--text-faint)",
        fontSize: 13
      }
    }, "\uC774\uBBF8\uC9C0"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: "var(--text-strong)",
        marginBottom: 10
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, free ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "var(--mint-600)"
      }
    }, "\uBB34\uB8CC \uC81C\uACF5") : /*#__PURE__*/React.createElement(PriceBlock, {
      amount: price,
      mode: "subscription",
      size: "sm"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      trailingArrow: true
    }, "\uAD6C\uB9E4\uD558\uAE30")));
  }
  function PromoCard({
    title,
    kicker,
    period,
    mint
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "16/10",
        background: mint ? "linear-gradient(140deg,#0f2a25,#06201c)" : "linear-gradient(140deg,#0c1430,#04122b)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--ws-mint)",
        marginBottom: 6
      }
    }, kicker), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.3
      }
    }, title)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: "var(--text-strong)"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--text-faint)",
        marginTop: 8
      }
    }, period)));
  }
  function StoreListing({
    onSelectProduct
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-page)",
        paddingTop: 36
      }
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 48
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        textAlign: "center",
        fontSize: 34,
        fontWeight: "var(--fw-bold)",
        color: "var(--text-strong)"
      }
    }, "\uC2A4\uD1A0\uC5B4")), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uC81C\uD488",
      sub: "\uAC00\uC871\uC758 \uD558\uB8E8\uB97C \uC0B4\uD53C\uB294 \uC6F0\uB2C8\uC2A4 \uB85C\uBD07"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(ProductCard, {
      image: "../../assets/products/robot-a1.png",
      name: /*#__PURE__*/React.createElement(React.Fragment, null, "\uB098\uBB34\uC5D1\uC2A4 A1 ", /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-muted)",
          fontWeight: 400
        }
      }, "(\uB098\uC774\uD2B8\uADF8\uB808\uC774)")),
      colors: [{
        name: "Night Gray",
        swatch: "#3A3D42"
      }, {
        name: "Dawn White",
        swatch: "#EDEEEF"
      }],
      amount: 51900,
      priceMode: "subscription",
      ctaLabel: "\uAD6C\uB3C5\uC2E0\uCCAD",
      onCta: onSelectProduct,
      onClick: onSelectProduct,
      style: {
        cursor: "pointer"
      }
    }), /*#__PURE__*/React.createElement(ProductCard, {
      image: "../../assets/products/airsensor.png",
      name: "\uC5D0\uC5B4\uC13C\uC11C",
      colors: [{
        name: "Night Gray",
        swatch: "#3A3D42"
      }],
      amount: 2000,
      priceMode: "subscription",
      ctaLabel: "\uAD6C\uB3C5\uC2E0\uCCAD"
    }))), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uAD6C\uB3C5 \uC11C\uBE44\uC2A4",
      sub: "\uC81C\uD488\uACFC \uD568\uAED8 \uB204\uB9AC\uB294 \uCF00\uC5B4"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(ServiceCard, {
      tag: "\uD5EC\uC2A4\uCF00\uC5B4 \uC11C\uBE44\uC2A4",
      name: "\uC6F0\uB2C8\uC2A4 \uB9AC\uD3EC\uD2B8",
      price: 4900
    }), /*#__PURE__*/React.createElement(ServiceCard, {
      tag: "\uD5EC\uC2A4\uCF00\uC5B4 \uC11C\uBE44\uC2A4",
      name: "\uC138\uC774\uD504\uCF00\uC5B4",
      free: true
    }), /*#__PURE__*/React.createElement(ServiceCard, {
      tag: "\uD5EC\uC2A4\uCF00\uC5B4 \uC11C\uBE44\uC2A4",
      name: "\uB77C\uC774\uBE0C\uBDF0",
      free: true
    }))), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uC18C\uBAA8\uD488"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        maxWidth: 720,
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement(ProductCard, {
      image: "../../assets/products/filter.png",
      tag: "\uC18C\uBAA8\uD488",
      name: "\uC62C\uC778\uC6D0 \uD544\uD130",
      amount: 125900,
      priceMode: "once",
      ctaLabel: "\uAD6C\uB9E4\uD558\uAE30",
      ctaVariant: "secondary"
    }), /*#__PURE__*/React.createElement(ProductCard, {
      tag: "\uC18C\uBAA8\uD488",
      name: "\uD504\uB9AC \uD544\uD130",
      amount: 4900,
      priceMode: "once",
      ctaLabel: "\uAD6C\uB9E4\uD558\uAE30",
      ctaVariant: "secondary"
    }))), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uC774\uBCA4\uD2B8 / \uD504\uB85C\uBAA8\uC158"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(PromoCard, {
      kicker: "\uC774\uBCA4\uD2B8",
      title: "\uC2A4\uD0C0\uBC85\uC2A4 \uC544\uBA54\uB9AC\uCE74\uB178 100% \uC99D\uC815",
      period: "2026.02.01 \u2013 2026.06.30"
    }), /*#__PURE__*/React.createElement(PromoCard, {
      kicker: "\uAD6C\uB3C5",
      title: "\uC644\uBCBD\uD55C Wellness\uC758 \uC2DC\uC791",
      period: "2026.02.01 \u2013 2026.06.30",
      mint: true
    }), /*#__PURE__*/React.createElement(PromoCard, {
      kicker: "\uD504\uB85C\uBAA8\uC158",
      title: "\uBCF4\uC0C1\uD310\uB9E4 \uD504\uB85C\uBAA8\uC158",
      period: "2026.02.01 \u2013 2026.03.31"
    }), /*#__PURE__*/React.createElement(PromoCard, {
      kicker: "\uD30C\uD2B8\uB108\uC2A4",
      title: "\uB098\uBB34\uC5D1\uC2A4 \uCD94\uCC9C \uCF54\uB4DC \uACF5\uC720",
      period: "2026.03.01 \u2013 2026.03.31",
      mint: true
    }))), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uCE74\uB4DC \uD61C\uD0DD"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-card)",
        padding: 24,
        background: "var(--mint-200)",
        display: "flex",
        alignItems: "center",
        minHeight: 150
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--mint-700)",
        marginBottom: 8
      }
    }, "\uC2E4\uC801\uC5D0 \uB530\uB77C"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 700,
        color: "var(--text-strong)",
        lineHeight: 1.35
      }
    }, "\uC6D4 \uC694\uAE08 \uD560\uC778 \uD61C\uD0DD"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "var(--mint-700)",
        marginTop: 8
      }
    }, "\uAD6C\uB3C5\xB7\uC2E0\uC6A9\uCE74\uB4DC \uD61C\uD0DD"))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-card)",
        padding: 24,
        background: "var(--blue-900)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        minHeight: 150
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--ws-mint)",
        marginBottom: 8
      }
    }, "\uC774\uB2EC\uC758"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.35
      }
    }, "\uCE74\uB4DC\uC0AC\uBCC4 \uD61C\uD0DD"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "rgba(255,255,255,.6)",
        marginTop: 8
      }
    }, "\uD2B9\uBCC4\uD61C\uD0DD / \uCCAD\uAD6C\uD560\uC778 / \uBB34\uC774\uC790\uD560\uBD80"))))), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      title: "\uB098\uBB34\uC5D1\uC2A4\uC640 \uD568\uAED8\uD55C \uC2A4\uD1A0\uB9AC"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16
      }
    }, [["kid-robot", "아이도 좋아하고 말도 한번 펀시리 시켜보고…"], ["sofa-robot", "자율주행 바이탈사인체크 멀티기능! 매일매일…"], ["kid-robot", "제 몫은 두 줄 까지, 제 몫은 최대 두 줄…"], ["sofa-robot", "부지런히 말은바 멸일마다 귀엽게 나무…"]].map(([img, txt], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/3",
        background: "var(--gray-100)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `../../assets/lifestyle/${img}.png`,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        padding: "12px 14px",
        fontSize: 12.5,
        color: "var(--text-muted)",
        lineHeight: 1.55
      }
    }, txt))))));
  }
  window.StoreListing = StoreListing;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/store/storeListing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.PriceBlock = __ds_scope.PriceBlock;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.RatingStars = __ds_scope.RatingStars;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ColorOption = __ds_scope.ColorOption;

__ds_ns.OptionPill = __ds_scope.OptionPill;

__ds_ns.OptionRow = __ds_scope.OptionRow;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.TogglePair = __ds_scope.TogglePair;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
