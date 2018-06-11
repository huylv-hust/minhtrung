<?php namespace Modules\Customers\Http\Controllers\Admin;

use App\Customer;
use App\Helpers\Constants;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class CustomersController extends Controller
{
    protected function validator(array $data)
    {
        return Validator::make(
            $data,
            ['cmt' => 'unique:customers'],
            ['cmt.unique' => 'Số CMND đã tồn tại.']
        );
    }

    public function index(Request $request, Customer $customer)
    {
        $title = 'Danh sách khách hàng';
        $filters = $request->all();
        $customers = $customer->getList($filters);
        $query_string = empty($filters) ? '' : '?' . http_build_query($filters);
        $request->session()->put('list_customer_url', $request->url() . $query_string);
        return view('customers::admin/index', compact('title', 'filters', 'customers'));
    }

    public function create()
    {
        $title = 'Tạo mới khách hàng';
        return view('customers::admin/register', compact('title'));
    }

    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        $input = $request->all();
        $input['birthday'] = date('Y-m-d', strtotime($input['birthday']));
        if (Customer::create($input)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
            return redirect()->route('admin_customers_list');
        }
        Session::flash('error', Constants::$SAVE_FAILED);
        return redirect()->route('admin_customers_list');
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        $title = 'Sửa thông tin người dùng';
        return view('customers::admin/register', compact('title', 'customer'));
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $customer = Customer::findOrFail($id);
        $input['birthday'] = date('Y-m-d', strtotime($input['birthday']));
        if ($customer->update($input)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
            return redirect()->route('admin_customers_list');
        }
        Session::flash('error', Constants::$SAVE_FAILED);
        return redirect()->route('admin_customers_list');
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

    public function profile()
    {
        $title = 'Trang cá nhân';
        return view('customers::admin/profile', compact('title'));
    }

    public function status(Request $request)
    {
        $id = $request->id;
        $status = $request->post('change_status');
        $result = 'error';
        $message = Constants::$AT_LEAST_1_RECORD;
        if (!empty($id)) {
            $message = Constants::$SAVE_FAILED;
            if (Customer::whereIn('id', $id)->update(['status' => $status])) {
                $result = 'success';
                $message = Constants::$COMMON_SAVE_OK;
            }
        }
        $request->session()->flash($result, $message);
        return redirect()->back();
    }
}