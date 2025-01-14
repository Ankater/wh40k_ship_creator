<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Weapon extends Model
{
    protected $fillable = [
        'name',
        'energy',
        'space',
        'price',
        'strength',
        'damage',
        'critical',
        'range',
        'source',
        'is_archaotech',
        'is_xenotech'
    ];

    /**
     * @return MorphToMany<ShipTrait, $this>
     */
    public function traits(): MorphToMany
    {
        return $this->morphToMany(ShipTrait::class, 'traitable');
    }
}
