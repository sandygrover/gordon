<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostLike;
use App\Models\PostReport;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request) {
        $search = $request->get('search', null);
        $filter = $request->input('filter', null);
        $user_id = auth()->user()->id;
        if($search != null && $search != '') {
            $posts = Post::orderBy('id', 'desc')->where('title', 'like',  '%' .$search.  '%' )->orWhere('description', 'like',  '%' .$search.  '%' )->with('like')->with('comment')->where('user_id', $user_id)->get();
        } else {
            $posts = Post::orderBy('id', 'desc')->with('like')->with('comment')->where('user_id', $user_id)->get();
        }
        foreach($posts as $post) {
            $user = User::where('id', $user_id)->first();
            if($user->profile != null) {
                $user->profile = url('images').'/'.$user->profile;
            }
            $post->user = $user;
            $post->meta_data = url('images').'/'.$post->meta_data;
            $postLike = PostLike::where('user_id', Auth::guard('api')->user()->id)->where('post_id', $post->id)->first();
            if(isset($postLike->id)) {
                $post->is_like = 1;
            } else {
                $post->is_like = 0;
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Post List Get Successfully',
            'data' => $posts
        ]);
    }

    public function otheruserpost() {
        $posts = Post::orderBy('id', 'desc')->with('like')->with('comment')->with('user')->where('user_id', '!=', auth()->user()->id)->where('is_hide', 0)->get();
        foreach($posts as $post) {
            if($post->user != null) {
                $post->user->profile = url('images').'/'.$post->user->profile;
            }
            $post->meta_data = url('images').'/'.$post->meta_data;
            $postLike = PostLike::where('user_id', Auth::guard('api')->user()->id)->where('post_id', $post->id)->first();
            if(isset($postLike->id)) {
                $post->is_like = 1;
            } else {
                $post->is_like = 0;
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Post List Get Successfully',
            'data' => $posts
        ]);
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'meta_data' => 'max:500000',
        ]);
        if ($validator->fails())
        {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }
        $updateData = [];
        if($request->hasFile('meta_data')) {
            $imageName = time().'.'.$request->meta_data->extension();
            $request->meta_data->move(public_path('images'), $imageName);
            $updateData['meta_data'] = $imageName;
        }
        $updateData['title'] = $request->title;
        $updateData['description'] = $request->description;

        $post = Post::create($updateData);
        return response()->json([
            'status' => true,
            'message' => 'Post Created Successfully',
            'data' => [$post]
        ]);
    }

    public function update(Request $request, $id) {
        $post = Post::where('id', $id)->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Post Update Successfully',
            'data' => [$post]
        ]);
    }

    public function destroy($id) {
        $post = Post::where('id', $id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Post Delete Successfully',
            'data' => [$post]
        ]);
    }

    public function hide($id) {

        $is_hide = Post::where('id', $id)->first()->is_hide;
        $is_hide = $is_hide == 0 ? 1 : 0;

        $post = Post::where('id', $id)->update(
            [
                'is_hide' => $is_hide
            ]
        );
        return response()->json([
            'status' => true,
            'message' => 'Post Status Changed Successfully',
            'data' => [$post]
        ]);
    }

    public function getComment(Request $request) {
        $post = PostComment::where('post_id', $request->post_id)->with('user')->get();
        return response()->json([
            'status' => true,
            'message' => 'Post get Commented Successfully',
            'data' => $post
        ]);
    }

    public function postComment(Request $request) {
        $post = PostComment::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Post Commented Successfully',
            'data' => [$post]
        ]);
    }

    public function postLike(Request $request) {
        $like = 0;
        $PostLike = PostLike::where('post_id', $request->post_id)->where('user_id', auth()->guard('api')->user()->id)->first();
        if(isset($PostLike->id)) {
            $Notification = new Notification();
            $Notification->message = auth()->guard('api')->user()->name. ' UnLiked Your Post';
            $Notification->user_id = auth()->guard('api')->user()->id;
            $Notification->type = 'liked';
            $Notification->save();
            $msg = 'Post UnLike Successfully';
            $post = PostLike::where('post_id', $request->post_id)->where('user_id', auth()->guard('api')->user()->id)->delete();
        } else {
            $Notification = new Notification();
            $Notification->message = auth()->guard('api')->user()->name. ' Liked Your Post';
            $Notification->user_id = auth()->guard('api')->user()->id;
            $Notification->type = 'liked';
            $Notification->save();
            $like = 1;
            $msg = 'Post Like Successfully';
            $post = PostLike::create([
                'post_id' => $request->post_id,
                'like' => 1
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => $msg,
            'data' => $like
        ]);
    }

    public function postReport(Request $request) {
        $post = PostReport::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Post Reported Successfully',
            'data' => [$post]
        ]);
    }

}
