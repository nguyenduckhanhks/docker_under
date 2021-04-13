<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Users;
use App\Models\Shops;
use App\Models\Ctvs;
use App\Models\Wallets;

class UsersController extends Controller {
    /**
     * create new user by admin
     * @api {POST} /api/admin/users/create-users-by-admin
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @apiSuccessExample: {
     *      'success' => true,
     *      'message' => 'Đăng ký tài khoản mới thành công!'
     * }
     */
    public function createUsersByAdmin (Request $request) {
        // Check if user login is admin
        $user = Auth::user();
        if($user->type !== Users::USER_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền thực hiện hành động này!',
            ]);
        }
        // Validate input
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string',
            'password' => 'bail|required|string|confirmed',
            'birthday' => 'bail|required|date',
            'tel' => 'bail|required|string|unique:users',
            'email' => 'bail|required|email|unique:users',
            'user_type' => 'bail|required|in:1,2,3,4'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Thông tin nhập vào không hợp lệ hoặc tài khoản đã tồn tài trước đó!',
                'error' => $validator->errors()
            ]);
        }

        try {
            DB::beginTransaction();
            $userType = $request->user_type;
            $newUser = new Users([
                'name' => $request->name,
                'password' => bcrypt($request->password),
                'birthday' => date('Y-m-d', strtotime($request->birthday)),
                'tel' => $request->tel,
                'email' => $request->email,
                'status' => Users::STATUS_ACTIVE,
                'type' => $userType,
                'is_delete' => 0
            ]);
            $newUser->save();

            if($userType == Users::USER_SHOP || $userType == Users::USER_CTV) {
                $validator = Validator::make($request->all(), [
                    'address' => 'bail|required|string',
                    'gender' => 'bail|required|in:0,1',
                    'banking_account_number' => 'bail|required|string',
                    'banking_account_name' => 'bail|required|string',
                    'banking_name' => 'bail|required|string'
                ]);

                if($validator->fails()) {
                    DB::rollback();
                    return response()->json([
                        'success' => false,
                        'message' => 'Thông tin nhập vào không hợp lệ!',
                        'error' => $validator->errors()
                    ]);
                }
                $newWallet = new Wallets([
                    'user_id' => $newUser->id,
                    'amount' => 0,
                    'is_delete' => 0
                ]);
                $newWallet->save();
            }

            if($userType == Users::USER_SHOP) {
                $validator = Validator::make($request->all(), [
                    'shop_alias' => 'bail|required|string',
                    'price_service_max' => 'bail|required',
                    'price_service_percent' => 'bail|required'
                ]);

                if($validator->fails()) {
                    DB::rollback();
                    return response()->json([
                        'success' => false,
                        'message' => 'Thông tin nhập vào không hợp lệ!',
                        'error' => $validator->errors()
                    ]);
                }

                $newShop = new Shops([
                    'user_id' => $newUser->id,
                    'address' => $request->address,
                    'gender' => $request->gender,
                    'shop_alias' => preg_replace('/\s+/', '_', $request->shop_alias),
                    'banking_account_number' => $request->banking_account_number,
                    'banking_account_name' => $request->banking_account_name,
                    'banking_name' => $request->banking_name,
                    'price_service_max' => $request->price_service_max,
                    'price_service_percent' => $request->price_service_percent,
                    'is_delete' => 0
                ]);
                $newShop->save();
            }

            if($userType == Users::USER_CTV) {
                $validator = Validator::make($request->all(), [
                    'trademark' => 'bail|required|string'
                ]);

                if($validator->fails()) {
                    DB::rollback();
                    return response()->json([
                        'success' => false,
                        'message' => 'Thông tin nhập vào không hợp lệ!',
                        'error' => $validator->errors()
                    ]);
                }

                $newCtv = new Ctvs([
                    'user_id' => $newUser->id,
                    'address' => $request->address,
                    'gender' => $request->gender,
                    'trademark' => $request->trademark,
                    'banking_account_number' => $request->banking_account_number,
                    'banking_account_name' => $request->banking_account_name,
                    'banking_name' => $request->banking_name,
                    'is_delete' => 0
                ]);
                print(json_encode($newUser->id));
                $newCtv->save();
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Đăng ký tài khoản mới thành công!'
            ]);
        } catch (\Exception $e) {
            DB::rollback(); // database query error
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
    }

    /**
     * get all user by admin
     * @api {GET} /api/admin/users/all-users
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     *
     */
    public function getAllUsers () {
        $user = Auth::user();
        if($user->type !== Users::USER_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền thực hiện hành động này'
            ]);
        }

        $allUserData = Users::where('is_delete', 0)
                            ->get();
        if(empty($allUserData) || $allUserData->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu người dùng!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu người dùng thành công!',
            'data' => $allUserData
        ]);
    }

    /**
     * get user data by user id
     * @api {POST} /api/admin/users/get-user-by-id
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

     public function getUserDataById(Request $request) {
         $user = Auth::user();
         if($user->type !== Users::USER_ADMIN) {
             return response()->json([
                 'success' => false,
                 'message' => 'Bạn không có quyền thực hiện hành động này!'
             ]);
         }
         $userId = $request->user_id;
         if(empty($userId)) {
            return response()->json([
                'success' => false,
                'message' => 'Thiếu tham số truyền lên!'
            ]);
         }

        $userData = Users::where('id', $userId)
                        ->where('is_delete', 0)
                        ->first();
        if(empty($userData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu người dùng!'
            ]);
        }

        if($userData->type == Users::USER_SHOP) {
            $shop = Shops::where('user_id', $userId)
                            ->where('is_delete', 0)
                            ->first();
            $wallet = Wallets::where('user_id', $userId)
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
            $userData->shop = $shop;
        }

        if($userData->type == Users::USER_CTV) {
            $ctv = Ctvs::where('user_id', $userId)
                        ->where('is_delete', 0)
                        ->first();
            $wallet = Wallets::where('user_id', $userId)
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
            $userData->ctv = $ctv;
        }

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu người dùng thành công!',
            'data' => $userData
        ]);
    }

    /**
     * api search user
     * @api {POST} /api/admin/users/search-user
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function searchUserByAdmin(Request $request) {
        $user = Auth::user();
        if(empty($user) || $user->type !== Users::USER_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền thực hiện hành động này!'
            ]);
        }

        $name = $request->name ?? null;
        $tel = $request->tel ?? null;
        $email = $request->email ?? null;
        $type = $request->user_type ?? null;
        $status = $request->active ?? null;
        $result = Users::query();

        if(!empty($name)) {
            $result = $result->where('name', 'like', '%' . $name . '%');
        }

        if(!empty($tel)) {
            $result = $result->where('tel', $tel);
        }

        if(!empty($email)) {
            $result = $result->where('email', $email);
        }

        if(!empty($type)) {
            $result = $result->where('type', $type);
        }

        if(!empty($status)) {
            $result = $result->where('status', $status);
        }

        $result = $result->get();
        if(empty($result)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu người dùng!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => ' Đã tìm thấy ' . count($result) . ' kết quả!',
            'data' => $result
        ]);
    }

    /**
     * api update user by admin
     * @api {POST} /api/admin/users/update-users-by-admin
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function updateUsersByAdmin(Request $request) {
        $user = Auth::user();
        if($user->type !== Users::USER_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền thực hiện hành động này!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'id' => 'bail|required',
            'name' => 'bail|required|string',
            'birthday' => 'bail|required|date',
            'tel' => 'bail|required|string',
            'email' => 'bail|required|email',
            'user_type' => 'bail|required|in:1,2,3,4'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Thông tin nhập vào không hợp lệ!',
                'error' => $validator->errors()
            ]);
        }

        $userId = $request->id;
        if($userId == $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không thể chỉnh sửa tài khoản của mình ở đây! Vui lòng đến profile của mình để thực hiện!'
            ]);
        }

        $userData = Users::where('id', $userId)
                        ->where('is_delete', 0)
                        ->first();
        if(empty($userData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu người dùng!'
            ]);
        }

        $validateUser = Users::where('is_delete', 0)
                            ->where(function($query) use ($request) {
                                $query->where('email', $request->email)
                                    ->orwhere('tel', $request->tel);
                            })
                            ->where('id', '!=', $userId)
                            ->get();

        if(!$validateUser->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc số điện thoại đã được sử dụng trước đó!'
            ]);
        }

        $userData->email = $request->email;
        $userData->name = $request->name;
        $userData->tel = $request->tel;
        $userData->birthday = date('Y-m-d', strtotime($request->birthday));

        $ctvData = null;
        if($userData->type == Users::USER_CTV) {
            $validator = Validator::make($request->all(), [
                'address' => 'bail|required|string',
                'banking_account_number' => 'bail|required|string',
                'banking_account_name' => 'bail|required|string',
                'banking_name' => 'bail|required|string',
                'trademark' => 'bail|required|string'
            ]);

            if($validator->fails()) {
                DB::rollback();
                return response()->json([
                    'success' => false,
                    'message' => 'Thông tin nhập vào không hợp lệ!',
                    'error' => $validator->errors()
                ]);
            }
            $ctvData = Ctvs::where('user_id', $userId)
                            ->where('is_delete')
                            ->first();
            if(empty($ctvData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu người dùng!'
                ]);
            }

            $ctvData->address = $request->address;
            $ctvData->trademark = $request->trademark;
            $ctvData->banking_account_number = $request->banking_account_number;
            $ctvData->banking_account_name = $request->banking_account_name;
            $ctvData->banking_name = $request->banking_name;
        }

        $shopData = null;
        if($userData->type == Users::USER_SHOP) {
            $validator = Validator::make($request->all(), [
                'address' => 'bail|required|string',
                'banking_account_number' => 'bail|required|string',
                'banking_account_name' => 'bail|required|string',
                'banking_name' => 'bail|required|string',
                'price_service_max' => 'bail|required',
                'price_service_percent' => 'bail|required'
            ]);

            if($validator->fails()) {
                DB::rollback();
                return response()->json([
                    'success' => false,
                    'message' => 'Thông tin nhập vào không hợp lệ!',
                    'error' => $validator->errors()
                ]);
            }

            $shopData = Shops::where('user_id', $userId)
                            ->where('is_delete', 0)
                            ->first();
            if(empty($shopData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu người dùng!'
                ]);
            }

            $shopData->address = $request->address;
            $shopData->price_service_percent = $request->price_service_percent;
            $shopData->price_service_max = $request->price_service_max;
            $shopData->banking_account_number = $request->banking_account_number;
            $shopData->banking_account_name = $request->banking_account_name;
            $shopData->banking_name = $request->banking_name;
        }

        try{
            DB::beginTransaction();

            $userData->save();
            if(!empty($shopData)) $shopData->save();
            if(!empty($ctvData)) $ctvData->save();

            DB::commit();

        } catch(\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Xảy ra lỗi trong quá trình lưu dữ liệu!',
                'error' => $e
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật tài khoản thành công!'
        ]);
    }

    /**
     * api update status by admin
     * @api {POST} /api/admin/users/update-status-users
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function updateStatusUserbyAdmin(Request $request) {
        $user = Auth::user();
        if($user->type != Users::USER_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền thực hiện hành động này!'
            ]);
        }

        $userId = $request->user_id ?? null;
        if(empty($userId)) {
            return response()->json([
                'success' => false,
                'message' => 'Thiếu tham số truyền lên!'
            ]);
        }

        if($userId == $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể tự cập nhật tài khoản của bạn!'
            ]);
        }

        $userData = Users::where('is_delete', 0)
                        ->where('id', $userId)
                        ->first();
        if(empty($userData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu người dùng!'
            ]);
        }

        $userData->status = !$userData->status;
        if(!$userData->save()) {
            return response()->json([
                'success' => false,
                'message' => 'Xảy ra lỗi trong quá trình lưu dữ liệu!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật dữ liệu thành công!'
        ]);
    }
}
