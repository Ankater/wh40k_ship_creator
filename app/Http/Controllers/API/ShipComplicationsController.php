<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\ShipComplicationResource;
use App\Models\ShipComplications;
use Illuminate\Http\JsonResponse;
use Knuckles\Scribe\Attributes as Scribe;

#[Scribe\Group('ShipComplication')]
#[Scribe\Subgroup('Index')]
#[Scribe\ResponseFromApiResource(
    ShipComplicationResource::class,
    ShipComplications::class,
    collection: true,
)]
#[Scribe\Authenticated]
class ShipComplicationsController extends BaseController
{
    public function index(): JsonResponse
    {
        $complications = ShipComplications::query()->orderBy('id')->get();

        return $this->sendCollectionResponse(ShipComplicationResource::collection($complications), 'Ship Complications retrieved successfully.');
    }
}
