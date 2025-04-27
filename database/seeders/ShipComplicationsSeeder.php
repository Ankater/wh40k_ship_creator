<?php

namespace Database\Seeders;

use App\Enums\ShipComplicationTypeEnum;
use App\Models\ShipComplications;
use Illuminate\Database\Seeder;

class ShipComplicationsSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'label'       => 'A Nose for Trouble',
                'description' => 'Something about this ship quivers at the thought of battle, always probing the cosmos for a new victim. Add +5 to the ship’s Detection, and reduce this ship’s Armour by 1, due to its many battles. Occasionally, the crew may find themselves in fights they might have preferred to avoid.',
                'source'      => 'Rogue Trader Core Rulebook',
                'type'        => ShipComplicationTypeEnum::MACHINE_SPIRIT_ODDITY->value,
                'order'       => 1,
            ],
            [
                'label'       => 'Blasphemous Tendencies',
                'description' => 'Some unidentifiable aspect of this vessel’s spirit resonates sympathetically with the Immaterium. Captains find this ship swims through the warp more easily, as if it was more at home there... All Navigation Tests made to pilot this vessel through the warp gain a +15 bonus. However, while aboard the ship, all crew suffer –5 to Willpower based Tests.',
                'source'      => 'Rogue Trader Core Rulebook',
                'type'        => ShipComplicationTypeEnum::MACHINE_SPIRIT_ODDITY->value,
                'order'       => 2,
            ],
            [
                'label'       => 'Reliquary of Mars',
                'description' => 'Somehow, this vessel has been outfitted with ancient archaeo-tech systems from mankind’s forgotten past. When constructing this vessel, players must select 1 Archeotech Component of their choice. However, any Tech-Use Tests to repair the ship suffer a –20, due to the highly complex nature of the machinery. Additionally, the tech priests of Mars regard the vessel as holy, or at least having holy components. Some may petition to visit the vessel, others may want it for themselves.',
                'source'      => 'Rogue Trader Core Rulebook',
                'type'        => ShipComplicationTypeEnum::PAST_HISTORY->value,
                'order'       => 1,
            ],
            [
                'label'       => 'Haunted',
                'description' => 'Some nameless horror haunts this vessel’s past, leaving voidsmen to whisper stories of ghosts wandering through the corridors and cabins. Reduce Morale permanently by 10. However, strange premonitions flicker on the auger arrays, granting a +6 to the ship’s Detection. Additionally, all non-crewmembers suffer –5 to Command Tests involving boarding actions or hit and run actions against the haunted vessel.',
                'source'      => 'Rogue Trader Core Rulebook',
                'type'        => ShipComplicationTypeEnum::PAST_HISTORY->value,
                'order'       => 2,
            ],
        ];

        ShipComplications::query()->upsert($data, ['label']);
    }
}
