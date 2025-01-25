<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraitModifier extends Model
{
    protected $fillable = ['trait_id', 'attribute_type', 'modifier'];

    /**
     * @return BelongsTo<ShipTrait, $this>
     */
    public function trait()
    {
        return $this->belongsTo(ShipTrait::class);
    }
}
