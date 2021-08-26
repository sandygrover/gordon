<?php
namespace App\Services;

use App\Http\Resources\ForexResource;
use App\Http\Resources\StockDetailResource;
use App\Http\Resources\StockResource;
use Illuminate\Support\Facades\Http;

Class StockService {

    public static function getStock() {
        $response = Http::get(env('FSC_URL').'stock/list?country=United-states&access_key='.env('FCS_TOKEN'));
        if(!isset($response['response'])) {
            return response()->json([
                'status' => false,
                'message' => 'Something Went Wrong',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Stock List Get Successfully',
            'data' => StockResource::collection($response['response'])
        ]);
    }

    public static function getForex() {
        $response = Http::get(env('FSC_URL').'/forex/list?type=forex&access_key='.env('FCS_TOKEN'));
        if(!isset($response['response'])) {
            return response()->json([
                'status' => false,
                'message' => 'Something Went Wrong',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Forex List Get Successfully',
            'data' => ForexResource::collection($response['response'])
        ]);
    }

    public static function getStockDetail($id) {
        $response = Http::get(env('FSC_URL').'stock/profile?id='.$id.'&access_key='.env('FCS_TOKEN'));
        if(!isset($response['response'])) {
            return response()->json([
                'status' => false,
                'message' => 'Something Went Wrong',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Stock Detail Get Successfully',
            'data' => StockDetailResource::collection($response['response'])
        ]);
    }

    public static function getStockDetailWeb($id) {
        $response = Http::get(env('FSC_URL').'stock/profile?id='.$id.'&access_key='.env('FCS_TOKEN'));
        if(!isset($response['response'])) {
            return 'Not Known';
        }
        return $response['response'][0]['full_name'];
    }

}
