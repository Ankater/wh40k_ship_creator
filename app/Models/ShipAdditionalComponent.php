<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShipAdditionalComponent extends Model
{
    protected $fillable = ['ship_id', 'component_id'];

    /**
     * @return BelongsTo<Ship, $this>
     */
    public function ship()
    {
        return $this->belongsTo(Ship::class);
    }

    /**
     * @return BelongsTo<Component, $this>
     */
    public function component()
    {
        return $this->belongsTo(Component::class);
    }
}

