<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DreamTeam;
use App\Services\StockService;
use Illuminate\Http\Request;
use stdClass;

class DreamTeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $stock_array = array();
        $stock_data = json_decode($request->stock_data);
        foreach($stock_data as $value) {
            $obj = new \stdClass();
            $obj->stock_id = $value;
            $obj->stock_name = StockService::getStockDetailWeb($value);
            array_push($stock_array, $obj);
        }
        $dreamTeam = DreamTeam::create($request->all());
        $dreamTeam->stock_data = $stock_array;
        return response()->json([
            'status' => true,
            'message' => 'Portfolio Created successfully',
            'data' => [$dreamTeam]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
