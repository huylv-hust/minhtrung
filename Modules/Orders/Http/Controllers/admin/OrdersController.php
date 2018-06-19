<?php

namespace Modules\Orders\Http\Controllers\Admin;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class OrdersController extends Controller
{
    public function index()
    {
        return view('orders::index');
    }

    public function create($id)
    {
        $customer = Customer::findOrFail($id);
        $title = 'Tạo khoản vay';
        return view('orders::admin/create', compact('title' , 'customer'));
    }

    public function store(Request $request)
    {
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