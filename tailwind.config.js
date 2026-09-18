/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
          screens: {
        // Header-in tam naviqasiya ilə tələb etdiyi minimum en 1320px-dir.
        hd: { min: '1181px' },
        'to-1320': { max: '1320px' },
        'to-1280': { max: '1280px' },
        'to-1180': { max: '1180px' },
        'to-1100': { max: '1100px' },
        'to-lg': { max: '1024px' },
        'to-900': { max: '900px' },
        'to-820': { max: '820px' },
        'to-720': { max: '720px' },
        'to-640': { max: '640px' },
        'to-540': { max: '540px' },
        'to-480': { max: '480px' },
        'to-420': { max: '420px' },
        'to-360': { max: '360px' },
        'to-320': { max: '320px' },
      },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brend
        brand: {
          DEFAULT: '#0E6E6E',
          dark: '#0a5252',
        },
        // Mətn / tünd səthlər
        ink: {
          DEFAULT: '#111418',
          black: '#161616',
          800: '#2a3038',
          700: '#3a4048',
          600: '#5a616a',
          550: '#6b7178',
          500: '#8a9099',
          400: '#a0a6ac',
          300: '#b3b9bf',
          200: '#c7ccd1',
        },
        // Fon səthləri
        surface: {
          DEFAULT: '#F7FBFE',
          soft: '#F5F6F7',
          muted: '#F1F4F7',
          deep: '#EDF1F5',
          row: '#FAFCFE',
          grey: '#eceef0',
        },
        // Kart aksent rəngləri (dyn palitrası)
        accent: {
          1: '#0E6E6E',
          2: '#146C94',
          3: '#1F7A5C',
          4: '#12607F',
          5: '#1F6E5C',
          6: '#2A8560',
          7: '#136B7D',
          8: '#1A7A8F',
        },
        // Sənəd növü tonları
        tone: {
          legal: '#12607F',
          report: '#1F6E5C',
          method: '#7A5C1F',
          new: '#8A4B08',
        },
        // Nazik cizgilər / kölgəli sərhədlər
        hair: {
          4: 'rgba(17,20,24,0.04)',
          5: 'rgba(17,20,24,0.05)',
          6: 'rgba(17,20,24,0.06)',
          7: 'rgba(17,20,24,0.07)',
          8: 'rgba(17,20,24,0.08)',
          9: 'rgba(17,20,24,0.09)',
          10: 'rgba(17,20,24,0.1)',
          11: 'rgba(17,20,24,0.11)',
          12: 'rgba(17,20,24,0.12)',
          16: 'rgba(17,20,24,0.16)',
          18: 'rgba(17,20,24,0.18)',
          20: 'rgba(17,20,24,0.2)',
        },
        // Brend şəffaflıqları
        brandA: {
          6: 'rgba(14,110,110,0.06)',
          8: 'rgba(14,110,110,0.08)',
          9: 'rgba(14,110,110,0.09)',
          15: 'rgba(14,110,110,0.15)',
          18: 'rgba(14,110,110,0.18)',
          20: 'rgba(14,110,110,0.2)',
          35: 'rgba(14,110,110,0.35)',
        },
      },
      // Orijinal max-width media sorğularının birə-bir qarşılığı

      maxWidth: {
        container: '1320px',
        prose: '720px',
      },
      boxShadow: {
        header: '0 4px 20px rgba(17,20,24,0.08)',
        card: '0 16px 36px rgba(17,20,24,0.12)',
        dropdown: '0 12px 32px rgba(17,20,24,0.12)',
        menu: '0 14px 34px rgba(17,20,24,0.14)',
        popover: '0 12px 28px rgba(17,20,24,0.12)',
        auth: '0 10px 40px rgba(17,20,24,0.06)',
        drawer: '-8px 0 40px rgba(17,20,24,0.18)',
        sheet: '0 -8px 34px rgba(17,20,24,0.2)',
        page: '0 3px 14px rgba(17,20,24,0.08)',
        btn: '0 1px 2px rgba(0,0,0,0.25)',
        'btn-lg': '0 1px 3px rgba(0,0,0,0.25)',
      },
      transitionTimingFunction: {
        card: 'cubic-bezier(.2,.8,.3,1)',
        icon: 'cubic-bezier(.3,1.4,.4,1)',
        drop: 'cubic-bezier(.2,.9,.3,1.3)',
        line: 'cubic-bezier(.2,.8,.2,1)',
      },
      keyframes: {
        huePulse: {
          '0%,100%': { backgroundColor: '#0E6E6E' },
          '33%': { backgroundColor: '#146C94' },
          '66%': { backgroundColor: '#1F7A5C' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatBlob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.08)' },
          '66%': { transform: 'translate(-25px,25px) scale(0.94)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
        dropIn: {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pulseDot: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.35' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-420px 0' },
          '100%': { backgroundPosition: '420px 0' },
        },
      },
      animation: {
        'hue-pulse': 'huePulse 6s ease-in-out infinite',
        'grad-text': 'gradientShift 8s ease infinite',
        'cta-bg': 'gradientShift 10s ease infinite',
        'btn-bg': 'gradientShift 6s ease infinite',
        blob: 'floatBlob 14s ease-in-out infinite',
        'blob-rev': 'floatBlob 18s ease-in-out infinite reverse',
        'drop-in': 'dropIn .22s cubic-bezier(.2,.9,.3,1.3) both',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [],
};
