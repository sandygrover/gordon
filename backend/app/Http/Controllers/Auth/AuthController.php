<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\Card;
use App\Models\Country;
use App\Models\LoginSession;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'forgotPassword', 'socialLogin', 'verify', 'customMessage']]);
    }

    public function deleteAccount()
    {
        User::where('id', auth()->guard('api')->user()->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Account Deleted Successfully',
            'data' => []
        ]);
    }

    public function addCard(Request $request)
    {
        Card::where('user_id', auth()->guard('api')->user()->id)->delete();
        $card = Card::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Card Added Successfully',
            'data' => [$card]
        ]);
    }

    public function deleteCard($id)
    {
        $card = Card::where('id', $id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Deleted Card Successfully',
            'data' => [$card]
        ]);
    }

    public function getCard()
    {
        $card = Card::where('user_id', auth()->guard('api')->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'Card Get Successfully',
            'data' => $card
        ]);
    }

    public function addBank(Request $request)
    {
        Bank::where('user_id', auth()->guard('api')->user()->id)->delete();
        $bank = Bank::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Bank Added Successfully',
            'data' => [$bank]
        ]);
    }

    public function deleteBank($id)
    {
        $bank = Bank::where('id', $id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Deleted Bank Successfully',
            'data' => [$bank]
        ]);
    }

    public function getBank()
    {
        $bank = Bank::where('user_id', auth()->guard('api')->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'bank Get Successfully',
            'data' => $bank
        ]);
    }

    public function addSession(Request $request)
    {
        LoginSession::create($request->all());
        $sessions = LoginSession::where('user_id', auth()->guard('api')->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'Sessions Added Successfully',
            'data' => $sessions
        ]);
    }

    public function clearSession()
    {
        LoginSession::where('user_id', auth()->guard('api')->user()->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Sessions Delete Successfully',
            'data' => []
        ]);
    }

    public function getSessions()
    {
        $sessions = LoginSession::where('user_id', auth()->guard('api')->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'Session Get Successfully',
            'data' => $sessions
        ]);
    }

    public function getNotifications()
    {
        $notifications = Notification::where('user_id', auth()->guard('api')->user()->id)->get();

        foreach($notifications as $notification) {
            $notification->time = $notification->created_at->diffForHumans();
            $notification->color = $notification->type == 'liked' ? 'blue' : ( $notification->type == 'subscribed' ? 'yellow' : ( $notification->type == 'tip' ? 'red' : ( $notification->type == 'promotion' ? 'orange' : 'red' ) ) );
        }

        return response()->json([
            'status' => true,
            'message' => 'Notifications Get Successfully',
            'data' => $notifications
        ]);
    }

    public function getCountry()
    {
        return response()->json([
            'status' => true,
            'message' => 'Country Get Successfully',
            'data' => Country::all()
        ]);
    }

    public function changePassword(Request $request)
    {
        $input = $request->all();
        $userid = auth()->guard('api')->user()->id;
        $rules = array(
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        );
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        } else {
            try {
                if ((Hash::check(request('old_password'), auth()->guard('api')->user()->password)) == false) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Check your old password.',
                        'data' => []
                    ]);
                } else {
                    User::where('id', $userid)->update(['password' => Hash::make($input['new_password'])]);
                    return response()->json([
                        'status' => true,
                        'message' => 'Password updated successfully.',
                        'data' => []
                    ]);
                }
            } catch (\Exception $ex) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something Went Wrong.',
                    'data' => []
                ]);
            }
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }

        $token = Str::random(64);

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        Password::sendResetLink($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Reset password link sent on your email id.',
            'data' => []
        ]);
    }

    public function customMessage()
    {
        if (!session('status')) {
            return redirect()->to(Cookie::get('previous_page'));
        } else {
            Cookie::queue('previous_page',URL::previous(), 60);
        }
        return view('auth.message');
    }

    public function creatorList(Request $request)
    {
        $users = User::where('role', 'creator')->get();
        foreach($users as $user)
        {
            if($user->profile != null) {
                $user->profile = url('images').'/'.$user->profile;
            }
        }
        return response()->json([
            'status' => true,
            'message' => 'Reset password link sent on your email id.',
            'data' => $users
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails())
        {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'username' => Str::replace(" ", "_", Str::lower($request->username)),
                'name' => $request->username,
                'role' => $request->role
            ]
        ));
        $user->sendEmailVerificationNotification();
        return response()->json([
            'status' => true,
            'message' => 'Verification Email Send Successfully',
            'data' => [$user]
        ]);
    }

    public function verify($user_id, Request $request) {
        if (!$request->hasValidSignature()) {
            return redirect('customMessage')
                        ->with('errorMessage', true)
                        ->with('status', 'Invalid/Expired url provided.')
                        ->with('title', 'Verify Email');
        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return redirect('customMessage')
                        ->with('errorMessage', false)
                        ->with('status', 'Email Verify Successfully')
                        ->with('title', 'Verify Email');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }

        if (! $token = auth()->guard('api')->attempt($validator->validated())) {
            return response()->json([
                'status' => false,
                'message' => "Wrong credentials given",
                'data' => []
            ]);
        }

        $user = User::findOrFail(auth()->guard('api')->user()->id);

        if (!$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
            return response()->json([
                'status' => false,
                'message' => "Please Verify Your Email.",
                'data' => []
            ]);
        }

        return $this->createNewToken($token);
    }

    /**
     * socialLogin
     */
    public function socialLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3',
            'provider' => 'required|string',
            'social_token'    => 'required|string'
        ]);
        if ($validator->fails())
        {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }

        $loginData = [];
        $loginData['username'] = $request->username;
        $loginData['name'] = $request->name;
        $loginData['phone_number'] = $request->phone_number;
        $loginData['email'] = $request->email;
        $loginData['provider'] = $request->provider;
        if($request->provider == 'google')
        {
            $loginData['google_id'] = $request->social_token;
        }
        else
        {
            $loginData['facebook_id'] = $request->social_token;
        }
        $user = User::where('email',$request->email)->first();
        if(!isset($user->id)) {
            $user = User::create($loginData);
        }

        $token = auth()->guard('api')->login($user);

        if (!$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
            return response()->json([
                'status' => false,
                'message' => "Please Verify Your Email.",
                'data' => []
            ]);
        }

        return $this->createNewToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->guard('api')->logout();

        return response()->json([
            'statue' => true,
            'message' => 'User successfully signed out',
            'date' => []
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->guard('api')->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        $user = User::find(auth()->user()->id);
        if($user->profile != null) {
            $user->profile = url('images').'/'.$user->profile;
        }
        if($user->cover_image != null) {
            $user->cover_image = url('images').'/'.$user->cover_image;
        }
        return response()->json([
            'status' => true,
            'message' => 'User Profile get Successfully',
            'data' => [$user]
        ]);
    }

    /**
     * update profile authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function updateProfile(Request $request) {
        $validator = Validator::make($request->all(), [
            // 'email' => 'required|email',
            'username' => 'required|string',
            // 'last_name' => 'required|string',
            // 'phone_number' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'data' => []
            ]);
        }

        $updateData = [];

        if($request->hasFile('profile')) {
            $imageName = time().'.'.$request->profile->extension();
            $request->profile->move(public_path('images'), $imageName);
            $updateData['profile'] = $imageName;
        }

        if($request->hasFile('cover_image')) {
            $imageName = time().'.'.$request->cover_image->extension();
            $request->cover_image->move(public_path('images'), $imageName);
            $updateData['cover_image'] = $imageName;
        }

        $updateData['username'] = $request->username;
        $updateData['name'] = $request->name;
        $updateData['phone_number'] = $request->phone_number;

        $updateData['subscription_fee'] = $request->subscription_fee;
        $updateData['website'] = $request->website;
        $updateData['location'] = $request->location;
        // $updateData['email'] = $request->email;

        User::where('id',auth()->user()->id)->update($updateData);

        $user = User::find(auth()->user()->id);
        if($user->profile != null && $user->profile != "") {
            $user->profile = url('images').'/'.$user->profile;
        }
        if($user->cover_image != null && $user->cover_image != "") {
            $user->cover_image = url('images').'/'.$user->cover_image;
        }

        return response()->json([
            'status' => true,
            'message' => 'user profile updated successfully',
            'data' => [$user]
        ]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        $user = User::find(auth()->guard('api')->user()->id);
        $user->token = $token;
        if($user->profile != null) {
            $user->profile = url('images').'/'.$user->profile;
        }
        if($user->cover_image != null) {
            $user->cover_image = url('images').'/'.$user->cover_image;
        }
        return response()->json([
            'status' => true,
            'message' => 'User Logged In Successfully',
            'data' => [
                $user
                // 'access_token' => $token,
                // 'token_type' => 'bearer',
                // 'expires_in' => auth()->guard('api')->factory()->getTTL() * 60,
                // 'user' => [User::find(auth()->guard('api')->user()->id)]
            ]
        ]);
    }
}
