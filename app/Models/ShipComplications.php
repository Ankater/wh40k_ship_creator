<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShipComplications extends Model
{
    protected $fillable = ['label', 'description', 'source'];
}
