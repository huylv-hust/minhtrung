<?php

namespace Modules\Orders\Http\Controllers\Admin;

use App\Customer;
use App\Helpers\Constants;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;

class OrdersController extends Controller
{
    public function index(Request $request, Order $order)
    {
        $title = 'Danh sách khoản vay';
        $filters = $request->all();
        $orders = $order->getList($filters);
        $query_string = empty($filters) ? '' : '?' . http_build_query($filters);
        $request->session()->put('list_order_url', $request->url() . $query_string);
        return view('orders::admin/index', compact('title', 'filters', 'orders'));
    }

    public function create($id)
    {
        $customer = Customer::findOrFail($id);
        $end_date = date('d-m-Y', strtotime('+49 day'));
        $title = 'Tạo khoản vay';
        return view('orders::admin/create', compact('title' , 'customer', 'end_date'));
    }

    public function store(Request $request, $id)
    {
        $input = $request->all();
        $input['cus_id'] = $id;
        $input['end_date'] = date('Y-m-d', strtotime($input['end_date']));
        if (Order::create($input)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
            return redirect()->route('admin_orders_list');
        }
        Session::flash('error', Constants::$SAVE_FAILED);
        return redirect()->route('admin_orders_list');
    }

    public function pay($id)
    {
        $title = 'Thanh toán hóa đơn';
        $pay = true;
        $order = Order::findOrFail($id);
        $customer = Customer::findOrFail($order->cus_id);
        return view('orders::admin/create', compact('title' , 'order', 'customer', 'pay'));
    }

    public function edit($id)
    {
        $title = 'Sửa hóa đơn';
        $order = Order::findOrFail($id);
        $customer = Customer::findOrFail($order->cus_id);
        return view('orders::admin/create', compact('title' , 'order', 'customer'));
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $order = Order::findOrFail($id);
        $input['end_date'] = date('Y-m-d', strtotime($input['end_date']));
        if ($order->update($input)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
            return redirect()->route('admin_orders_list');
        }
        Session::flash('error', Constants::$SAVE_FAILED);
        return redirect()->route('admin_orders_list');
    }

    public function destroy(Request $request)
    {
        $ids = $request->input('id');
        if (empty($ids)) {
            Session::flash('error', Constants::$AT_LEAST_1_RECORD);
            return redirect()->back();
        }
        if (Order::destroy($ids)) {
            Session::flash('success', Constants::$COMMON_SAVE_OK);
        } else {
            Session::flash('error', Constants::$SAVE_FAILED);
        }
        return redirect()->back();
    }
}