<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ship extends Model
{
    protected $fillable = [
        'hull_id',
        'plasma_engine_id',
        'warp_drive_id',
        'gellar_field_id',
        'void_shield_id',
        'ship_bridge_id',
        'life_support_id',
        'sensors_id',
        'machine_oddity_id',
        'past_history_id',
        'origin'
    ];

    /**
     * @return BelongsTo<Hull, $this>
     */
    public function hull(): BelongsTo
    {
        return $this->belongsTo(Hull::class);
    }

    /**
     * @return BelongsTo<ShipComplications, $this>
     */
    public function machineOddity(): BelongsTo
    {
        return $this->belongsTo(ShipComplications::class, 'machine_oddity_id');
    }

    /**
     * @return BelongsTo<ShipComplications, $this>
     */
    public function pastHistory(): BelongsTo
    {
        return $this->belongsTo(ShipComplications::class, 'past_history_id');
    }

    /**
     * @return HasMany<ShipLivingQuarter, $this>
     */
    public function livingQuarters(): HasMany
    {
        return $this->hasMany(ShipLivingQuarter::class);
    }

    /**
     * @return HasMany<ShipAdditionalComponent, $this>
     */
    public function additionalComponents(): HasMany
    {
        return $this->hasMany(ShipAdditionalComponent::class);
    }
}
