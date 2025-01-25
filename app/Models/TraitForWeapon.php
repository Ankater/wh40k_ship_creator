<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraitForWeapon extends Model
{
    protected $fillable = ['weapon_id', 'trait_id'];

    /**
     * @return BelongsTo<Weapon, $this>
     */
    public function weapon()
    {
        return $this->belongsTo(Weapon::class);
    }

    /**
     * @return BelongsTo<ShipTrait, $this>
     */
    public function trait()
    {
        return $this->belongsTo(ShipTrait::class);
    }
}
