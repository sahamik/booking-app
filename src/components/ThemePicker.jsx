import { THEMES } from '../utils/theme.js'

export default function ThemePicker({ currentTheme, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-3 block" style={{color: 'var(--color-primary)'}}>
        Teemaväri
      </label>
      <div className="grid grid-cols-4 gap-3">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className="group flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-200"
            style={{
              borderColor: currentTheme === theme.id ? theme.primary : 'transparent',
              background: currentTheme === theme.id ? theme.light : 'transparent',
              boxShadow: currentTheme === theme.id ? `0 0 0 2px ${theme.primary}` : 'none',
            }}
          >
            {/* Väripaletti */}
            <div className="flex gap-0.5">
              {theme.preview.map((color, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === 0 ? 20 : 14,
                    height: i === 0 ? 20 : 14,
                    background: color,
                    marginTop: i === 1 ? 3 : 0,
                  }}
                />
              ))}
            </div>
            {/* Nimi */}
            <span className="text-xs font-medium text-center leading-tight"
              style={{ color: currentTheme === theme.id ? theme.primary : '#666' }}>
              {theme.name}
            </span>
            {/* Valittu-merkki */}
            {currentTheme === theme.id && (
              <div className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: theme.primary }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs mt-2" style={{color: 'var(--color-primary)', opacity: 0.6}}>
        Väri näkyy varaussivulla ja kaikissa napeissa
      </p>
    </div>
  )
}