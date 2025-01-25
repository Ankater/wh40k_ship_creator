<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeaponHullSuitability extends Model
{
    protected $fillable = [
        'weapon_id',
        'hull_id',
    ];

    /**
     * @return BelongsTo<Weapon, $this>
     */
    public function weapon(): BelongsTo
    {
        return $this->belongsTo(Weapon::class);
    }

    /**
     * @return BelongsTo<Hull, $this>
     */
    public function hull(): BelongsTo
    {
        return $this->belongsTo(Hull::class);
    }
}
