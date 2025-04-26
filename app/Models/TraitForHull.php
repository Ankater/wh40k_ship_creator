<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraitForHull extends Model
{
    /** @use HasFactory<\Database\Factories\HullFactory> */
    use HasFactory;

    protected $fillable = ['hull_id', 'trait_id'];

    protected $with = ['trait'];

    /**
     * @return BelongsTo<Hull, $this>
     */
    public function hull()
    {
        return $this->belongsTo(Hull::class);
    }

    /**
     * @return BelongsTo<ShipTrait, $this>
     */
    public function trait()
    {
        return $this->belongsTo(ShipTrait::class);
    }
}
