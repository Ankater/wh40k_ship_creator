<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Hull extends Model
{
    protected $fillable = [
        'name',
        'space',
        'price',
        'source',
        'hull_class_id'
    ];

    /**
     * @return BelongsTo<HullClass, $this>
     */
    public function hullClass(): BelongsTo
    {
        return $this->belongsTo(HullClass::class);
    }

    /**
     * @return MorphToMany<ShipTrait, $this>
     */
    public function traits(): MorphToMany
    {
        return $this->morphToMany(ShipTrait::class, 'traitable');
    }
}
