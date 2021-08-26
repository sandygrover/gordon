<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StockDetailResource extends JsonResource
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
            'id' => $this['id'],
            'ccy' => $this['ccy'],
            'exch' => $this['exch'],
            'isin' => $this['isin'],
            'no_of_employee' => $this['no_of_employee'],
            'equity_type' => $this['equity_type'],
            'industry' => $this['industry'],
            'full_name' => $this['full_name'],
            'symbol' => $this['symbol'],
            'country' => $this['country'],
            "sector" => $this['sector'],
            "info" => [
                "locality" => $this['sector'],
                "postalCode" => $this['sector'],
                "country" => $this['sector'],
                "phone" => $this['sector'],
                "fax" => $this['sector'],
                "website" => $this['sector']
            ],
        ];
    }
}
