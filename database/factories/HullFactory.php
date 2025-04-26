<?php

namespace Database\Factories;

use App\Models\Hull;
use App\Models\TraitForHull;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\HullClass;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hull>
 */
class HullFactory extends Factory
{
    protected $model = Hull::class;

    /**
     * Define the model's default state.
     *
     * @return array{
     *     name: string,
     *     hull_class: mixed,
     *     space: int,
     *     cost: int,
     *     source: string,
     *     speed: int,
     *     detection: int,
     *     armor: int,
     *     armor: int,
     *     maneuver: int,
     *     maneuver: int,
     *     hull_integrity: int,
     *     turret_mounts: int,
     *     length: float,
     *     width: float,
     *     mass: int,
     *     crew: int,
     *     acceleration: float,
     * }
     */
    public function definition(): array
    {
        return [
            'name'           => $this->faker->randomAscii(),
            'hull_class'     => $this->faker->randomElement(HullClass::cases()), // enum case
            'space'          => $this->faker->numberBetween(25, 120),
            'cost'           => $this->faker->numberBetween(20, 100),
            'source'         => $this->faker->optional()->word(),
            'speed'          => $this->faker->numberBetween(3, 10),
            'detection'      => $this->faker->numberBetween(5, 25),
            'armor'          => $this->faker->numberBetween(10, 25),
            'maneuver'       => $this->faker->numberBetween(-15, 30),
            'hull_integrity' => $this->faker->numberBetween(30, 100),
            'turret_mounts'  => $this->faker->numberBetween(0, 5),
            'length'         => $this->faker->randomFloat(1, 1.0, 6.0),   // km
            'width'          => $this->faker->randomFloat(1, 0.2, 1.0),   // km
            'mass'           => $this->faker->numberBetween(5, 40),       // megatonnes
            'crew'           => $this->faker->numberBetween(10, 150),     // “tens of thousands”
            'acceleration'   => $this->faker->randomFloat(1, 1.0, 6.0),   // gravities
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Hull $hull) {
            /** @param \App\Models\Hull $hull */
            TraitForHull::factory()
                ->count(rand(0, 2))
                ->forHull($hull)
                ->create();
        });
    }
}
