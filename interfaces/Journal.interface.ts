export interface ShipTargeted {
  timestamp: Date
  event: 'ShipTargeted'
  TargetLocked: boolean
  Ship?: string
  Ship_Localised?: string
  ScanStage?: number
  PilotName?: string
  PilotName_Localised?: string
  PilotRank?: string
  ShieldHealth?: number
  HullHealth?: number
  Faction?: string
  LegalStatus?: 'Clean' | 'Wanted' | 'Hunter'
  Bounty?: number
  Power?: ''
}
