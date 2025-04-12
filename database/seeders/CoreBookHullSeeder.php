<?php

namespace Database\Seeders;

use App\Enums\HullClass;
use App\Models\Hull;
use App\Models\ShipTrait;
use App\Models\TraitForHull;
use Illuminate\Database\Seeder;

class CoreBookHullSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cargoHaulerTrait = ShipTrait::create([
            'label' => 'Cargo Hauler',
            'description' => 'This vessel was designed for transporting goods, and no amount of retrofitting can fully change this. This hull comes pre-equipped with one Main Cargo Hold Component. The hull’s Space has already been reduced to account for this, however, when the ship is constructed it must be able to provide 2 Power to this Component.',
        ]);

        $jerichoHull = Hull::create([
            'name'            => 'Паломничье судно типа "Иерихон"',
            'cost'            => 20,
            'hull_class'      => HullClass::TRANSPORT,
            'speed'           => 3,
            'detection'       => 5,
            'armor'           => 12,
            'space'           => 45,
            'maneuver'        => -10,
            'hull_integrity'  => 50,
            'turret_mounts'   => 1,
            'length'          => 2.25,
            'width'           => 0.3,
            'mass'            => 9,
            'crew'            => 20,
            'acceleration'    => 1.6,
        ]);
        TraitForHull::create([
            'hull_id'  => $jerichoHull->id,
            'trait_id' => $cargoHaulerTrait->id,
        ]);

        $wandererHull = Hull::create([
            'name'            => 'Купец типа "Бродяга"',
            'cost'            => 20,
            'hull_class'      => HullClass::TRANSPORT,
            'speed'           => 4,
            'detection'       => 10,
            'armor'           => 13 ,
            'space'           => 40,
            'maneuver'        => -5,
            'hull_integrity'  => 40,
            'turret_mounts'   => 1,
            'length'          => 2,
            'width'           => 0.4,
            'mass'            => 8,
            'crew'            => 18,
            'acceleration'    => 2.1,
        ]);
        TraitForHull::create([
            'hull_id'  => $wandererHull->id,
            'trait_id' => $cargoHaulerTrait->id,
        ]);

        Hull::create([
            'name'            => 'Капер типа "Асироф"',
            'cost'            => 30,
            'hull_class'      => HullClass::RAIDER,
            'speed'           => 10,
            'detection'       => 12,
            'armor'           => 14 ,
            'space'           => 35,
            'maneuver'        => 23,
            'hull_integrity'  => 32,
            'turret_mounts'   => 1,
            'length'          => 1.5,
            'width'           => 0.25,
            'mass'            => 5,
            'crew'            => 22,
            'acceleration'    => 5.6,
        ]);

        Hull::create([
            'name'            => 'Коммерческий рейдер типа "Грабитель"',
            'cost'            => 35,
            'hull_class'      => HullClass::RAIDER,
            'speed'           => 9,
            'detection'       => 10,
            'armor'           => 16 ,
            'space'           => 40,
            'maneuver'        => 25,
            'hull_integrity'  => 30,
            'turret_mounts'   => 1,
            'length'          => 1.6,
            'width'           => 0.4,
            'mass'            => 6,
            'crew'            => 24,
            'acceleration'    => 5,
        ]);

        Hull::create([
            'name'            => 'Фрегат типа "Меч"',
            'cost'            => 40,
            'hull_class'      => HullClass::FRIGATE,
            'speed'           => 8,
            'detection'       => 15,
            'armor'           => 18 ,
            'space'           => 40,
            'maneuver'        => 20,
            'hull_integrity'  => 35,
            'turret_mounts'   => 2,
            'length'          => 1.6,
            'width'           => 0.3,
            'mass'            => 6,
            'crew'            => 26,
            'acceleration'    => 4.5,
        ]);

        Hull::create([
            'name'            => 'Ударный фрегат типа "Буря"',
            'cost'            => 40,
            'hull_class'      => HullClass::FRIGATE,
            'speed'           => 8,
            'detection'       => 12,
            'armor'           => 19 ,
            'space'           => 42,
            'maneuver'        => 18,
            'hull_integrity'  => 36,
            'turret_mounts'   => 2,
            'length'          => 1.5,
            'width'           => 0.4,
            'mass'            => 6.1,
            'crew'            => 26,
            'acceleration'    => 4.5,
        ]);

        Hull::create([
            'name'            => 'Лёгкий крейсер типа "Неустрашимый"',
            'cost'            => 55,
            'hull_class'      => HullClass::LIGHT_CRUISER,
            'speed'           => 7,
            'detection'       => 20,
            'armor'           => 19 ,
            'space'           => 60,
            'maneuver'        => 15,
            'hull_integrity'  => 60,
            'turret_mounts'   => 1,
            'length'          => 4.5,
            'width'           => 0.5,
            'mass'            => 20,
            'crew'            => 65,
            'acceleration'    => 4.3,
        ]);
        Hull::create([
            'name'            => 'Крейсер типа "Лунный"',
            'cost'            => 60,
            'hull_class'      => HullClass::CRUISER,
            'speed'           => 5,
            'detection'       => 10,
            'armor'           => 20 ,
            'space'           => 75,
            'maneuver'        => 10,
            'hull_integrity'  => 70,
            'turret_mounts'   => 2,
            'length'          => 5,
            'width'           => 0.8,
            'mass'            => 28,
            'crew'            => 95,
            'acceleration'    => 2.5,
        ]);
    }
}
