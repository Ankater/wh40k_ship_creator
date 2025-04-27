<?php

namespace App\Models;

use Database\Factories\ShipComplicationsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipComplications extends Model
{
    /** @use HasFactory<ShipComplicationsFactory> */
    use HasFactory;

    protected $fillable = ['label', 'description', 'source', 'type', 'order'];
}
