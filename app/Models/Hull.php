<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hull extends Model
{
    protected $fillable = [
        'name',
        'space',
        'price',
        'source',
        'hull_class',
        'speed',
        'detection',
        'armor',
        'maneuver',
        'hull_integrity',
        'turret_mounts',
        'length',
        'width',
        'mass',
        'crew',
        'acceleration'
    ];

    /**
     * @return HasMany<TraitForHull, $this>
     */
    public function traits(): HasMany
    {
        return $this->hasMany(TraitForHull::class);
    }
}
