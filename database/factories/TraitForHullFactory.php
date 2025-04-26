<?php

namespace Database\Factories;

use App\Models\Hull;
use App\Models\ShipTrait;
use App\Models\TraitForHull;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<TraitForHull> */
class TraitForHullFactory extends Factory
{
    protected $model = TraitForHull::class;

    /**
     * Base attributes for a fresh TraitForHull.
     *
     * @return array{trait_id: ShipTraitFactory}
     */
    public function definition(): array
    {
        return [
            'trait_id' => ShipTrait::factory(),
        ];
    }

    /**
     * Attach the generated TraitForHull to a particular Hull (or create one).
     *
     * @param  Hull|null  $hull
     * @return self
     */
    public function forHull(?Hull $hull = null): self
    {
        return $this->state(fn () => [
            'hull_id' => $hull->id ?? Hull::factory(),
        ]);
    }
}
