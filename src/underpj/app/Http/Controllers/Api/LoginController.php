<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\Users;
use App\Models\Shops;
use App\Models\Ctvs;
use App\Models\Wallets;

class LoginController extends Controller {
    /**
     * @api {POST} /api/admin/login
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @apiParam {String} email Email
     * @apiParam {String} password Mật khẩu
     * @apiParam {Bool} remember Nhớ người dùng
     * @apiSuccessExample:
     * {
     *       access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiODFlNWQ2MDhmOWRjZDFmZjRiYzk5YjBiZjM1NjJiZjU4YzUzN2VhMzY4ODI5MmI1OTBlODM3Y2NkYjEwODJmNTcwZmU3YzZhMmRmM2E2NmQiLCJpYXQiOjE2MTgwNzk3MDMsIm5iZiI6MTYxODA3OTcwMywiZXhwIjoxNjQ5NjE1NzAzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.rbNxnerpXt8zVZwkgY-boJCsW3Rz-bM9saxlv4mNMgvTm4kZrF1hKjhWKLvYyoNjd6E5MOVg5LJRaLCSYtsow_hDGL67Jn6tYqEVaCjYUPqoFjXkusf73vyuQfr-gj6o3CU8NcjNVM80wX0CVICgPtMUbuCz7iTnqqV1_O7pR4MEQxVyC9bOc12iiMdvEQvooM0oiaHoIaxIQn8XTFzNbKQOIp0v5tOiRKTLNM93DBD0O5DlH2bdrUVOkbc4CmX6viASQTbTzWJWxPFWufxQRalKIy5CKACAtXu48qFry0CUBR7Mwrjknf_kEkG7w0crne2px-dADkzS47y8goCcpQF5jbDWFEVIbLhSiU4TJXfpPdLcyN5OELiRibRyTZTalKwMVaojNH39D2Qlv7nBcYDJebBmVXSmoZD-nn2L_OTvuzjyDK666dAwFfNwspdfpbNgKstoq74WpBBjwfUE3K-znbz0uWU3WO2FK1yqyYKKvD2ItLSTk6iDiHi2rSQWpnQMDvOsHWMRw_nZpQLtpU9Cauz9-dcAo6JPZ8ZkewCxfKYnVSYaIj3QNgUZNihSZQXR6SnkZiSSI7Bx6gWKfWmaHUFybEKC4VSx56-ROFAIHfE3_ftCxilR_UN1PP2sfFabHMuedjmC1vAVgkeeN5CXGB5tiSISiFBTB9VaT-E"
     *       birthday: "2000-12-11"
     *       created_at: null
     *       email: "shop@gmail.com"
     *       id: 3
     *       is_delete: 0
     *       name: "shop 1"
     *       status: 1
     *       tel: "0782569842"
     *       type: 3
     *       updated_at: null
     *       expires_at: "2022-04-10 18:35:03"
     *       message: "Đăng nhập thành công!"
     *       success: true
     *       token_type: "Bearer"
     * }
     */
    public function authenticate(Request $request) {

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
            'status' => Users::STATUS_ACTIVE,
            'is_delete' => 0
        ];

        $remember = $request->remember ?? false;

        if(!$token = Auth::attempt($credentials, $remember)) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu nhập vào không chính xác!'
            ]);
        }

        $user = Auth::user();

        if($user->type == Users::USER_SHOP) {
            $shop = Shops::where('user_id', $user->id)
                            ->where('is_delete', 0)
                            ->first();
            $wallet = Wallets::where('user_id', $user->id)
                            ->where('is_delete', 0)
                            ->first();
            if(empty($shop) || empty($wallet)) {
                $this->logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu cửa hàng'
                ]);
            }
            $shop->amount = $wallet->amount;
            $user->shop = $shop;
        }

        if($user->type == Users::USER_CTV) {
            $ctv = Ctvs::where('user_id', $user->id)
                        ->where('is_delete', 0)
                        ->first();
            $wallet = Wallets::where('user_id', $user->id)
                        ->where('is_delete', 0)
                        ->first();
            if(empty($ctv) || empty($wallet)) {
                $this->logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu cộng tác viên'
                ]);
            }
            $ctv->amount = $wallet->amount;
            $user->ctv = $ctv;
        }

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công!',
            'data' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Log the user out of the application.
     * @api {POST} /api/admin/users/logout
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @apiSuccessExample Success-Response:
     * {
     *      'success' => true,
     *       'message' => 'Đăng xuất thành công'
     * }
     */
    public function logout(Request $request) {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công'
        ]);
    }

    /**
     * Get the current user login
     * @api {GET} /api/admin/users/user-login
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @apiSuccessExample Success-Response:
     * {
     *      'success' => true,
     *      'message' => 'Lấy dữ liệu thành công,
     *      'data' =>  {
     *          access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiODFlNWQ2MDhmOWRjZDFmZjRiYzk5YjBiZjM1NjJiZjU4YzUzN2VhMzY4ODI5MmI1OTBlODM3Y2NkYjEwODJmNTcwZmU3YzZhMmRmM2E2NmQiLCJpYXQiOjE2MTgwNzk3MDMsIm5iZiI6MTYxODA3OTcwMywiZXhwIjoxNjQ5NjE1NzAzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.rbNxnerpXt8zVZwkgY-boJCsW3Rz-bM9saxlv4mNMgvTm4kZrF1hKjhWKLvYyoNjd6E5MOVg5LJRaLCSYtsow_hDGL67Jn6tYqEVaCjYUPqoFjXkusf73vyuQfr-gj6o3CU8NcjNVM80wX0CVICgPtMUbuCz7iTnqqV1_O7pR4MEQxVyC9bOc12iiMdvEQvooM0oiaHoIaxIQn8XTFzNbKQOIp0v5tOiRKTLNM93DBD0O5DlH2bdrUVOkbc4CmX6viASQTbTzWJWxPFWufxQRalKIy5CKACAtXu48qFry0CUBR7Mwrjknf_kEkG7w0crne2px-dADkzS47y8goCcpQF5jbDWFEVIbLhSiU4TJXfpPdLcyN5OELiRibRyTZTalKwMVaojNH39D2Qlv7nBcYDJebBmVXSmoZD-nn2L_OTvuzjyDK666dAwFfNwspdfpbNgKstoq74WpBBjwfUE3K-znbz0uWU3WO2FK1yqyYKKvD2ItLSTk6iDiHi2rSQWpnQMDvOsHWMRw_nZpQLtpU9Cauz9-dcAo6JPZ8ZkewCxfKYnVSYaIj3QNgUZNihSZQXR6SnkZiSSI7Bx6gWKfWmaHUFybEKC4VSx56-ROFAIHfE3_ftCxilR_UN1PP2sfFabHMuedjmC1vAVgkeeN5CXGB5tiSISiFBTB9VaT-E"
     *          birthday: "2000-12-11"
     *          created_at: null
     *          email: "shop@gmail.com"
     *          id: 3
     *          is_delete: 0
     *          name: "shop 1"
     *          status: 1
     *          tel: "0782569842"
     *          type: 3
     *          updated_at: null
     *          expires_at: "2022-04-10 18:35:03"
     *          message: "Đăng nhập thành công!"
     *          success: true
     *          token_type: "Bearer"
     *          ctv => {ctv data}
     *      }
     * }
     */
    public function getUserLogin(Request $request) {
        $user = Auth::user();

        if($user->type == Users::USER_SHOP) {
            $shop = Shops::where('user_id', $user->id)
                            ->where('is_delete', 0)
                            ->first();
            $wallet = Wallets::where('user_id', $user->id)
                            ->where('is_delete', 0)
                            ->first();
            if(empty($shop) || empty($wallet)) {
                $this->logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu cửa hàng'
                ]);
            }
            $shop->amount = $wallet->amount;
            $user->shop = $shop;
        }

        if($user->type == Users::USER_CTV) {
            $ctv = Ctvs::where('user_id', $user->id)
                        ->where('is_delete', 0)
                        ->first();
            $wallet = Wallets::where('user_id', $user->id)
                        ->where('is_delete', 0)
                        ->first();
            if(empty($ctv) || empty($wallet)) {
                $this->logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu cộng tác viên'
                ]);
            }
            $ctv->amount = $wallet->amount;
            $user->ctv = $ctv;
        }

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu thành công',
            'data' => $user
        ]);
    }
}
