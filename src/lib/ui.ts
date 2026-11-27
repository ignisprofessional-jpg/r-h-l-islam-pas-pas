import { create } from 'zustand'

/** État d'interface partagé (non sauvegardé) : titre de la page, recherche ouverte. */
export const useUI = create<{ title: string; searchOpen: boolean; setSearchOpen: (v: boolean) => void }>((set) => ({
  title: '',
  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),
}))
