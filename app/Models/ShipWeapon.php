<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShipWeapon extends Model
{
    protected $fillable = ['ship_id', 'weapon_id'];

    /**
     * @return BelongsTo<Ship, $this>
     */
    public function ship(): BelongsTo
    {
        return $this->belongsTo(Ship::class);
    }

    /**
     * @return BelongsTo<Weapon, $this>
     */
    public function weapon(): BelongsTo
    {
        return $this->belongsTo(Weapon::class);
    }
}
