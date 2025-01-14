<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Component extends Model
{
    protected $fillable = [
        'name',
        'energy',
        'space',
        'price',
        'source',
        'component_type_id',
        'is_archaotech',
        'is_xenotech'
    ];

    /**
     * @return BelongsTo<ComponentType, $this>
     */
    public function componentType(): BelongsTo
    {
        return $this->belongsTo(ComponentType::class);
    }

    /**
     * @return MorphToMany<ShipTrait, $this>
     */
    public function traits(): MorphToMany
    {
        return $this->morphToMany(ShipTrait::class, 'traitable');
    }
}
