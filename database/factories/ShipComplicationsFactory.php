<?php

namespace Database\Factories;

use App\Enums\ShipComplicationTypeEnum;
use App\Models\ShipComplications;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ShipComplications>
 */
class ShipComplicationsFactory extends Factory
{
    protected $model = ShipComplications::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'label'       => $this->faker->unique()->sentence(3),
            'description' => $this->faker->paragraph(3),
            'source'      => $this->faker->randomElement([
                'Rogue Trader Core Rulebook',
                'Into the Storm Supplement',
                'Battlefleet Koronus',
            ]),
            'type'        => $this->faker->randomElement(ShipComplicationTypeEnum::cases()),
            'order'       => $this->faker->numberBetween(1, 10),
        ];
    }
}
