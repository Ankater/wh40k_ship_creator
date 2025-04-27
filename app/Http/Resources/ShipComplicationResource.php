<?php

namespace App\Http\Resources;

use App\Models\ShipComplications;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ShipComplications
 */
class ShipComplicationResource extends JsonResource
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
            'id'          => $this->id,
            'label'       => $this->label,
            'description' => $this->description,
            'source'      => $this->source,
            'type'        => $this->type,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
            'order'       => $this->order,
        ];
    }
}
