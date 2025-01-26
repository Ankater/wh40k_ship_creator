<?php

namespace App\Enums;

enum HullClass: string
{
    case TRANSPORT = 'TRANSPORT';
    case RAIDER = 'RAIDER';
    case FRIGATE = 'FRIGATE';
    case LIGHT_CRUISER = 'LIGHT_CRUISER';
    case CRUISER = 'CRUISER';
    case BATTLECRUISER = 'BATTLECRUISER';
    case GRAND_CRUISER = 'GRAND_CRUISER';
}
