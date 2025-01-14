<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class ShipTrait extends Model
{

    protected $fillable = ['label', 'description'];

    /**
     * @return MorphToMany<Hull, $this>
     */
    public function hulls(): MorphToMany
    {
        return $this->morphedByMany(Hull::class, 'traitable');
    }

    /**
     * @return MorphToMany<Component, $this>
     */
    public function components(): MorphToMany
    {
        return $this->morphedByMany(Component::class, 'traitable');
    }

    /**
     * @return MorphToMany<Weapon, $this>
     */
    public function weapons(): MorphToMany
    {
        return $this->morphedByMany(Weapon::class, 'traitable');
    }
}
