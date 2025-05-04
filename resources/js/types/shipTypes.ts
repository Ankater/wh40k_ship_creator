export interface Hull {
  id: string;
  name: string;
  classShip: string;
  speed: number;
  manoeuvrability: number;
  detection: number;
  turretRating: number;
  armour: number;
  hullIntegrity: number;
  traits: { name: string; description: string }[];
}

export interface Ship {
    id: string;
    name: string;
    classShip?: string;
    hull?: string | null;
    speed?: number;
    manoeuvrability?: number;
    detection?: number;
    turretRating?: number;
    shields?: number | null;
    armour?: number;
    hullIntegrity?: number;
    traits?: Trait[];
    machineSpiritOddity?: Oddity | null;
    shipHistory?: Oddity | null;
    essentialComponents?: EssentialComponents;
    additionalComponents?: AdditionalComponents;
    weaponSlots?: WeaponSlot[];
}

export interface Trait {
  name: string;
  description: string;
}

export interface Oddity {
  id: string;
  name: string;
}

export interface EssentialComponents {
  plasmaDrives?: Component | null;
  warpDrives?: Component | null;
  gellerField?: Component | null;
  voidShields?: ShieldComponent | null;
  shipBridge?: Component | null;
  lifeSupport?: Component | null;
  crewQuarters?: Component | null;
  augurArrays?: Component | null;
}

export interface AdditionalComponents {
  cargoHolds?: Component[];
  passengerCompartments?: Component[];
  auxiliarySystems?: Component[];
  specialBlocks?: Component[];
}

export interface Component {
  id: string;
  name: string;
  power: number;
  space: number;
  price: number;
}

export interface ShieldComponent extends Component {
  shieldValue: number;
}

export interface Weapon {
  id: string;
  name: string;
  power: number;
  space: number;
  price: number;
  damage?: string;
  strength?: number | null;
  range?: number;
}

export interface WeaponSlot {
  location: string;
  count: number;
  weapons: (Weapon | null)[];
}
