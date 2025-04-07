<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hull extends Model
{
    protected $fillable = [
        'name',
        'hull_class',
        'space',
        'cost',
        'source',
        'speed',
        'detection',
        'armor',
        'maneuver',
        'hull_integrity',
        'turret_mounts',
        'length',
        'width',
        'mass',
        'crew',         // stored as 'tens of thousands'
        'acceleration',
    ];

    /**
     * The attributes that should be cast to native types (or enums).
     *
     * @var array<string, string>
     */
    protected $casts = [
        'hull_class'    => \App\Enums\HullClass::class,
        'length'        => 'float',
        'width'         => 'float',
        'acceleration'  => 'float',
    ];

    /**
     * @return HasMany<TraitForHull, $this>
     */
    public function traits(): HasMany
    {
        return $this->hasMany(TraitForHull::class);
    }
}
