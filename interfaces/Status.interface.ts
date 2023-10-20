interface Fuel {
  /** mass in tons */
  FuelMain: number
  /** mass in tons */
  FuelReservoir: number
}

enum GuiFocus {
  'NoFocus',
  /**right hand side*/
  'InternalPanel',
  /**left hand side */
  'ExternalPanel',
  /**top */
  'CommsPanel',
  /**bottom */
  'RolePanel',
  'StationServices',
  'GalaxyMap',
  'SystemMap',
  'Orrery',
  'FSS mode',
  'SAA mode',
  'Codex',
}

type LegalState = 'Clean' | 'IllegalCargo' | 'Speeding' | 'Wanted' | 'Hostile' | 'PassengerWanted' | 'Warrant'

export interface Status {
  timestamp: Date
  event: 'Status'
  Flags: number
  DockedOnPad: number
  LandedOnSurface: number
  LandingGearDown: number
  ShieldsUp: number
  Shield: number
  Health: number
  Oxygen: number
  Supercruise: number
  FlightAssistOff: number
  HardpointsDeployed: number
  InWing: number
  LightsOn: number
  CargoScoopDeployed: number
  SilentRunning: number
  ScoopingFuel: number
  SrvHandbrake: number
  SrvusingTurretview: number
  SrvTurretRetracted: number
  SrvDriveAssist: number
  FsdMassLocked: number
  FsdCharging: number
  FsdCooldown: number
  LowFuel: number
  OverHeating: number
  HasLatLong: number
  IsInDanger: number
  BeingInterdicted: number
  InMainShip: number
  InFighter: number
  InSRV: number
  HudinAnalysismode: number
  NightVision: number
  AltitudefromAverageradius: number
  fsdJump: number
  srvHighBeam: number
  /** an array of 3 integers representing energy distribution (in half-pips) */
  Pips?: number[]
  /**the currently selected firegroup number  */
  FireGroup?: number
  Fuel?: Fuel
  /** mass in tons */
  Cargo: number
  /**the selected GUI screen  */
  GuiFocus?: GuiFocus
  BodyName?: string
  /** if on or near a planet */
  Latitude?: number
  Longitude?: number
  Heading?: number
  Altitude?: number
  Speed: number
  /** In meter */
  PlanetRadius?: number
  LegalState?: LegalState
}
