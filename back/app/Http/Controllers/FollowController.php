<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;

class FollowController extends Controller
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
        $follow = Follow::where('follower_id', auth()->user()->id)->where('follower_id', $request->following_id)->first();
        if(isset($follow->id)) {
            $post = Follow::where('follower_id', auth()->user()->id)->where('follower_id', $request->following_id)->delete();
            $message = 'Un Follow Successfully';
        } else {
            $post = Follow::create($request->all());
            $message = 'Follow Successfully';
        }
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => [$post]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function show(Follow $follow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function edit(Follow $follow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Follow $follow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follow $follow)
    {
        //
    }

    public function followerList() {
        $post = Follow::where('follower_id', auth()->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'User Follower List get Successfully',
            'data' => [$post]
        ]);
    }

    public function followingList() {
        $post = Follow::where('following_id', auth()->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'User Following List get Successfully',
            'data' => [$post]
        ]);
    }
}
