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
    public function index()
    {
        return view('orders::index');
    }

    public function create($id)
    {
        $customer = Customer::findOrFail($id);
        $end_date = date('d-m-Y', strtotime('+50 day'));
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

    public function show()
    {
        return view('orders::show');
    }

    public function edit()
    {
        return view('orders::edit');
    }

    public function update(Request $request)
    {
    }

    public function destroy()
    {
    }
}