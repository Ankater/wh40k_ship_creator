<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HullClass extends Model
{
    protected $fillable = ['name'];

    /**
     * @return HasMany<Hull, $this>
     */
    public function hulls(): HasMany
    {
        return $this->hasMany(Hull::class);
    }
}

