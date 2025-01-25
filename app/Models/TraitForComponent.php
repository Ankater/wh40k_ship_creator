<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraitForComponent extends Model
{
    protected $fillable = ['component_id', 'trait_id'];

    /**
     * @return BelongsTo<Component, $this>
     */
    public function component()
    {
        return $this->belongsTo(Component::class);
    }

    /**
     * @return BelongsTo<ShipTrait, $this>
     */
    public function trait()
    {
        return $this->belongsTo(ShipTrait::class);
    }
}
