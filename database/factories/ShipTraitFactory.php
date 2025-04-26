<?php

namespace Database\Factories;

use App\Models\ShipTrait;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShipTrait>
 */
class ShipTraitFactory extends Factory
{
    protected $model = ShipTrait::class;

    /**
     * Define the model's default state.
     *
     * @return array{
     *     label: string,
     *     description: mixed,
     * }
     */
    public function definition(): array
    {
        return [
            'label'       => $this->faker->randomAscii(),
            'description' => $this->faker->sentence(12),
        ];
    }
}

