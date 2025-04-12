<?php

namespace App\Http\Resources;

use App\Models\TraitForHull;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin TraitForHull
 */
class TraitForHullResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'trait' => ShipTraitResource::make($this->whenLoaded('trait')),
        ];
    }
}
