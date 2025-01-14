<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ship extends Model
{
    protected $fillable = [
        'hull_id',
        'plasma_engine_id',
        'warp_engine_id',
        'gellar_field_id',
        'void_shield_id',
        'bridge_id',
        'life_support_id',
        'sensors_id'
    ];

    /**
     * @return BelongsTo<Hull, $this>
     */
    public function hull(): BelongsTo
    {
        return $this->belongsTo(Hull::class);
    }

    /**
     * @return HasMany<ShipComponent, $this>
     */
    public function components(): HasMany
    {
        return $this->hasMany(ShipComponent::class);
    }

    /**
     * @return HasMany<ShipWeapon, $this>
     */
    public function weapons(): HasMany
    {
        return $this->hasMany(ShipWeapon::class);
    }
}
