<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'contest_name' => $this->contest_name,
            'total_winning_amount' => $this->total_winning_amount,
            'contest_size' => $this->contest_size,
            "entry_fees" => $this->entry_fees,
            "no_of_winners" => $this->no_of_winners,
            "join_multiple" => $this->join_multiple,
            "is_price_distributed" => $this->is_price_distributed,
            "contest_date" => $this->contest_date
        ];
    }
}
