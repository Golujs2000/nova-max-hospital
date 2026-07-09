import { createContext, useContext, useState, useEffect } from 'react'
import { getSettings } from '../services/settings'
import { updateSiteDataDynamic } from '../data/siteData'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSettings()
      .then((dbSettings) => {
        if (dbSettings && Object.keys(dbSettings).length > 0) {
          updateSiteDataDynamic(dbSettings)
        }
        setLoaded(true)
      })
      .catch((err) => {
        console.error('Error fetching dynamic settings:', err)
        setError(err)
        setLoaded(true)
      })
  }, [])

  return (
    <SettingsContext.Provider value={{ loaded, error }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
