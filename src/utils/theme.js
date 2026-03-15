/**
 * theme.js — Teemavärien hallinta
 * Väri tallennetaan asetuksiin ja sovelletaan CSS-muuttujina koko sovellukseen
 */

export const THEMES = [
  {
    id: 'sage',
    name: 'Salvia',
    description: 'Luonnonläheinen vihreä',
    primary: '#3d6340',
    light: '#f4f7f4',
    medium: '#a5c1a5',
    dark: '#1e3320',
    preview: ['#3d6340', '#527d52', '#a5c1a5'],
  },
  {
    id: 'navy',
    name: 'Tummansininen',
    description: 'Ammattimainen ja luotettava',
    primary: '#1e3a5f',
    light: '#f0f4f9',
    medium: '#93b4d4',
    dark: '#0f1e30',
    preview: ['#1e3a5f', '#2d5f8a', '#93b4d4'],
  },
  {
    id: 'teal',
    name: 'Turkoosi',
    description: 'Raikas ja moderni',
    primary: '#0d7377',
    light: '#f0fafa',
    medium: '#7ecaca',
    dark: '#063638',
    preview: ['#0d7377', '#14a0a5', '#7ecaca'],
  },
  {
    id: 'rose',
    name: 'Vaaleanpunainen',
    description: 'Lämmin ja kutsuva',
    primary: '#9d3f6e',
    light: '#fdf4f8',
    medium: '#d4a0bb',
    dark: '#4d1a34',
    preview: ['#9d3f6e', '#c45f8f', '#d4a0bb'],
  },
  {
    id: 'slate',
    name: 'Harmaa',
    description: 'Minimalistinen ja neutraali',
    primary: '#3d4f5c',
    light: '#f4f6f8',
    medium: '#9ab0be',
    dark: '#1a2530',
    preview: ['#3d4f5c', '#5a7384', '#9ab0be'],
  },
  {
    id: 'amber',
    name: 'Kulta',
    description: 'Lämmin ja energinen',
    primary: '#92610a',
    light: '#fdf8f0',
    medium: '#d4aa6a',
    dark: '#3d2804',
    preview: ['#92610a', '#b87d20', '#d4aa6a'],
  },
  {
    id: 'violet',
    name: 'Violetti',
    description: 'Luova ja rohkea',
    primary: '#5b3a8a',
    light: '#f6f2fc',
    medium: '#b09ed4',
    dark: '#2a1545',
    preview: ['#5b3a8a', '#7c55b0', '#b09ed4'],
  },
  {
    id: 'coral',
    name: 'Korallinpunainen',
    description: 'Erottuva ja iloinen',
    primary: '#c0442a',
    light: '#fdf2f0',
    medium: '#e0a090',
    dark: '#5c1a10',
    preview: ['#c0442a', '#d45f45', '#e0a090'],
  },
]

export function getTheme(themeId) {
  return THEMES.find(t => t.id === themeId) || THEMES[0]
}

export function applyTheme(themeId) {
  const theme = getTheme(themeId)
  const root = document.documentElement

  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-primary-light', theme.light)
  root.style.setProperty('--color-primary-medium', theme.medium)
  root.style.setProperty('--color-primary-dark', theme.dark)

  // Generoidaan väriskaala CSS-muuttujina
  root.style.setProperty('--theme-50', theme.light)
  root.style.setProperty('--theme-100', hexToRgba(theme.primary, 0.12))
  root.style.setProperty('--theme-200', hexToRgba(theme.primary, 0.25))
  root.style.setProperty('--theme-400', hexToRgba(theme.primary, 0.55))
  root.style.setProperty('--theme-500', theme.primary)
  root.style.setProperty('--theme-600', theme.primary)
  root.style.setProperty('--theme-700', darken(theme.primary, 15))
  root.style.setProperty('--theme-800', darken(theme.primary, 25))
  root.style.setProperty('--theme-900', theme.dark)
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function darken(hex, pct) {
  const r = Math.max(0, parseInt(hex.slice(1,3), 16) - Math.round(255 * pct / 100))
  const g = Math.max(0, parseInt(hex.slice(3,5), 16) - Math.round(255 * pct / 100))
  const b = Math.max(0, parseInt(hex.slice(5,7), 16) - Math.round(255 * pct / 100))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}