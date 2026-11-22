import type { SyncStatus } from './sync'

export const STATUS_DOT: Record<SyncStatus, { text: string; dot: string }> = {
  off: { text: 'Sur cet appareil', dot: 'bg-line' },
  'signed-out': { text: 'Non connecté', dot: 'bg-line' },
  syncing: { text: 'Synchronisation…', dot: 'bg-gold animate-pulse' },
  synced: { text: 'Synchronisé', dot: 'bg-primary' },
  offline: { text: 'Hors ligne', dot: 'bg-gold' },
  error: { text: 'Erreur de synchronisation', dot: 'bg-danger' },
}
