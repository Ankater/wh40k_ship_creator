import { LoginResponse } from '../types/apiTypes';
import {
  Component,
  Hull,
  Oddity,
  ShieldComponent,
  Ship,
  Weapon
} from '../types/shipTypes';

const mockApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          resolve({ success: true, user: { name: 'Admin User' } });
        } else {
          reject(new Error('Неверный логин или пароль'));
        }
      }, 500);
    });
  },

  getShips: async (): Promise<Ship[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Rocinante', class: 'Corvette', hull: 'Martian Corvette' },
          { id: '2', name: 'Donnager', class: 'Battleship', hull: 'Jupiter Class' },
          { id: '3', name: 'Canterbury', class: 'Freighter', hull: 'Ice Hauler' },
        ]);
      }, 500);
    });
  },

  deleteShip: async (_shipId: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  getShipDetails: async (shipId: string): Promise<Ship> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (shipId === 'new') {
          resolve({
            id: 'new',
            name: '',
            hull: null,
            class: '',
            speed: 0,
            manoeuvrability: 0,
            detection: 0,
            turretRating: 0,
            shields: null,
            armour: 0,
            hullIntegrity: 0,
            traits: [],
            essentialComponents: {
              plasmaDrives: null,
              warpDrives: null,
              gellerField: null,
              voidShields: null,
              shipBridge: null,
              lifeSupport: null,
              crewQuarters: null,
              augurArrays: null,
            },
            additionalComponents: {
              cargoHolds: [],
              passengerCompartments: [],
              auxiliarySystems: [],
              specialBlocks: [],
            },
            weaponSlots: [],
          });
        } else {
          resolve({
            id: shipId,
            name: `Ship ${shipId}`,
            hull: { id: 'hull_corvette', name: 'Corvette Hull', class: 'Corvette', speed: 5, manoeuvrability: 10, detection: 5, turretRating: 2, armour: 50, hullIntegrity: 200, traits: [{ name: 'Fast', description: 'Moves quickly' }], weaponSlots: [] },
            class: 'Corvette',
            speed: 5,
            manoeuvrability: 10,
            detection: 5,
            turretRating: 2,
            shields: 100,
            armour: 50,
            hullIntegrity: 200,
            traits: [{ name: 'Fast', description: 'Moves quickly' }],
            machineSpiritOddity: { id: 'odd1', name: 'Stubborn' },
            essentialComponents: {
              plasmaDrives: { id: 'pd1', name: 'Basic Plasma Drive', power: 10, space: 5, price: 100 },
              voidShields: { id: 'vs1', name: 'Standard Void Shield', power: 15, space: 10, price: 200, shieldValue: 100 },
            },
            additionalComponents: {
              cargoHolds: [],
              passengerCompartments: [],
              auxiliarySystems: [],
              specialBlocks: [],
            },
            weaponSlots: [
              { location: 'Prow', count: 1, weapons: [] },
              { location: 'Port', count: 2, weapons: [null, { id: 'wep1', name: 'Laser Cannon', power: 5, space: 2, price: 50, damage: '1d10', strength: 5, range: 30 }] },
              { location: 'Starboard', count: 2, weapons: [null, null] },
              { location: 'Dorsal', count: 1, weapons: [] },
            ],
          });
        }
      }, 500);
    });
  },

  getHullTypes: async (): Promise<Hull[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'hull_corvette', name: 'Corvette Hull', class: 'Corvette', speed: 5, manoeuvrability: 10, detection: 5, turretRating: 2, armour: 50, hullIntegrity: 200, traits: [{ name: 'Fast', description: 'Moves quickly' }], weaponSlots: [{ location: 'Prow', count: 1 }, { location: 'Port', count: 2 }, { location: 'Starboard', count: 2 }, { location: 'Dorsal', count: 1 }] },
          { id: 'hull_frigate', name: 'Frigate Hull', class: 'Frigate', speed: 4, manoeuvrability: 8, detection: 7, turretRating: 3, armour: 75, hullIntegrity: 300, traits: [{ name: 'Balanced', description: 'Good all-around' }], weaponSlots: [{ location: 'Prow', count: 2 }, { location: 'Port', count: 3 }, { location: 'Starboard', count: 3 }, { location: 'Dorsal', count: 2 }] },
          { id: 'hull_cruiser', name: 'Cruiser Hull', class: 'Cruiser', speed: 3, manoeuvrability: 5, detection: 10, turretRating: 4, armour: 100, hullIntegrity: 500, traits: [{ name: 'Tough', description: 'Can take a beating' }], weaponSlots: [{ location: 'Prow', count: 2 }, { location: 'Port', count: 4 }, { location: 'Starboard', count: 4 }, { location: 'Keel', count: 1 }, { location: 'Dorsal', count: 2 }] },
        ]);
      }, 300);
    });
  },

  getComponents: async (type: string): Promise<Component[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let components: Component[] = [];
        if (type === 'plasmaDrives') {
          components = [
            { id: 'pd1', name: 'Basic Plasma Drive', power: 10, space: 5, price: 100 },
            { id: 'pd2', name: 'Advanced Plasma Drive', power: 15, space: 7, price: 200 },
          ];
        } else if (type === 'voidShields') {
          components = [
            { id: 'vs1', name: 'Standard Void Shield', power: 15, space: 10, price: 200, shieldValue: 100 },
            { id: 'vs2', name: 'Heavy Void Shield', power: 25, space: 15, price: 400, shieldValue: 200 },
          ] as ShieldComponent[];
        } else if (type === 'cargoHolds') {
          components = [
            { id: 'ch1', name: 'Small Cargo Hold', power: 1, space: 20, price: 50 },
            { id: 'ch2', name: 'Large Cargo Hold', power: 2, space: 50, price: 150 },
          ];
        }
        resolve(components);
      }, 300);
    });
  },

  getWeapons: async (location: string): Promise<Weapon[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'wep1', name: 'Laser Cannon', power: 5, space: 2, price: 50, damage: '1d10', strength: 5, range: 30 },
          { id: 'wep2', name: 'Macro Cannon', power: 10, space: 5, price: 150, damage: '2d10', strength: 7, range: 45 },
          { id: 'wep3', name: 'Torpedo Tube', power: 8, space: 10, price: 200, damage: 'Special', strength: null, range: 60 },
        ]);
      }, 300);
    });
  },

  getOddities: async (type: string): Promise<Oddity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === 'machine_spirit') {
          resolve([
            { id: 'odd1', name: 'Stubborn' },
            { id: 'odd2', name: 'Inquisitive' },
            { id: 'odd3', name: 'Belligerent' },
          ]);
        } else if (type === 'history') {
          resolve([
            { id: 'hist1', name: 'Relic of Mars' },
            { id: 'hist2', name: 'Former Pirate Vessel' },
            { id: 'hist3', name: 'Survived Warp Storm' },
          ]);
        } else {
          resolve([]);
        }
      }, 300);
    });
  },

  getRandomOddity: async (type: string): Promise<Oddity | null> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const oddities = await mockApi.getOddities(type);
        if (oddities.length > 0) {
          const randomIndex = Math.floor(Math.random() * oddities.length);
          resolve(oddities[randomIndex]);
        } else {
          resolve(null);
        }
      }, 200);
    });
  },

  saveShip: async (shipData: Ship): Promise<Ship> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...shipData, id: shipData.id === 'new' ? Date.now().toString() : shipData.id });
      }, 700);
    });
  },
};

export default mockApi;