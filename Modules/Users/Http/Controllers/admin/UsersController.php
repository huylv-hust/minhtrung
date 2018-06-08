<?php namespace Modules\Users\Http\Controllers\Admin;

use App\Helpers\Constants;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    protected function validator(array $data)
    {
        return Validator::make(
            $data,
            ['email' => 'unique:users',],
            ['email.unique'=>'Email đã tồn tại.']
        );
    }

    public function index(Request $request, User $user)
    {
        $title = 'Danh sách người dùng';
        $filters = $request->all();
        $users = $user->getList($filters);
        $query_string = empty($filters) ? '' : '?' . http_build_query($filters);
        $request->session()->put('list_user_url', $request->url() . $query_string);
        return view('users::admin/index', compact('title', 'filters', 'users'));
    }

    public function create()
    {
        $title = 'Tạo mới người dùng';
        return view('users::admin/register', compact('title'));
    }

    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        if (User::create($input)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
            return redirect()->route('admin_users_list');
        }
        Session::flash('error', Constants::$SAVE_FAILED);
        return redirect()->route('admin_users_list');
    }

    public function destroy(Request $request)
    {
        $ids = $request->input('id');
        if (empty($ids)) {
            Session::flash('error', Constants::$AT_LEAST_1_RECORD);
            return redirect()->back();
        }
        if (in_array(Auth::user()->id, $ids)) {
            Session::flash('error', 'Tài khoản đang đăng nhập, bạn không thể xóa.');
            return redirect()->back();
        }
        if (User::destroy($ids)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
        } else {
            Session::flash('error', Constants::$SAVE_FAILED);
        }
        return redirect()->back();
    }

    /**
     * action change status
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function status(Request $request)
    {
        $id = $request->id;
        $status = $request->post('change_status');
        $result = 'error';
        $message = Constants::$AT_LEAST_1_RECORD;
        if (!empty($id)) {
            $message = Constants::$SAVE_FAILED;
            if (User::whereIn('id', $id)->update(['status' => $status])) {
                $result = 'success';
                $message = Constants::$COMMON_SAVE_OK;
            }
        }
        $request->session()->flash($result, $message);
        return redirect()->back();
    }
}