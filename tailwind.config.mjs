/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Satoshi", "Geist", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Oxland brand ramp
        brand: {
          blue: "#2F5BFF",
          indigo: "#4F46E5",
          purple: "#7C3AED",
          lavender: "#A78BFA",
          navy: "#0B1437",
          ink: "#0A0A23",
        },
        success: "#16A34A",
        warning: "#F59E0B",
        cyan: "#22D3EE",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(79,70,229,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.06) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(135deg, #2F5BFF 0%, #4F46E5 45%, #7C3AED 100%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,20,55,0.04), 0 12px 32px -12px rgba(47,91,255,0.18)",
        float: "0 24px 60px -20px rgba(79,70,229,0.35)",
        card: "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 40px -16px rgba(11,20,55,0.18)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "dash-flow": {
          to: { "stroke-dashoffset": "-200" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 0.75rem))" },
        },
        "marquee-x-reverse": {
          from: { transform: "translateX(calc(-50% - 0.75rem))" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "dash-flow": "dash-flow 2.4s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "marquee-x": "marquee-x var(--marquee-duration, 40s) linear infinite",
        "marquee-x-reverse": "marquee-x-reverse var(--marquee-duration, 40s) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
