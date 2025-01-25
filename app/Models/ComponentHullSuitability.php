<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComponentHullSuitability extends Model
{
    protected $fillable = [
        'component_id',
        'hull_class',
    ];

    /**
     * Define the relationship to the Component model.
     *
     * @return BelongsTo<Component, $this>
     */
    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class);
    }
}
