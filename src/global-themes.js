const shared = {
  fonts: {
    heading: `obviously-wide, "Arial Black", Verdana, sans-serif`,
    jumbo: `obviously-wide, "Arial Black", Verdana, sans-serif`,
    skinny: `obviously-narrow, "Arial Narrow", sans-serif`,
    body: `covik-sans, Tahoma, sans-serif`,
    accent: `"Vulf Mono", monospace`,
  },
}

export const light = {
  colors: {
    accent: "var(--ripe-tomato)",
    background: "var(--porcelain)",
    darkAccent: "var(--kale)",
    embedded: "var(--sage)",
    text: "var(--aubergine)",
  },

  fonts: {
    heading: shared.fonts.heading,
    jumbo: shared.fonts.jumbo,
    skinny: shared.fonts.skinny,
    body: shared.fonts.body,
    accent: shared.fonts.accent,
  },
}

export const dark = {
  colors: {
    accent: "var(--sherbert)",
    background: "var(--squid-ink)",
    darkAccent: "var(--squid-ink)",
    embedded: "var(--spearmint)",
    text: "var(--sage)",
  },

  fonts: {
    heading: shared.fonts.heading,
    jumbo: shared.fonts.jumbo,
    skinny: shared.fonts.skinny,
    body: shared.fonts.body,
    accent: shared.fonts.accent,
  },
}
