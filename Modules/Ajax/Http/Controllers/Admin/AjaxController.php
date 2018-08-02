<?php

namespace Modules\Ajax\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\View\View;

class AjaxController extends Controller
{
    public function createTable(Request $request)
    {
        $pay_date = $request->post('pay_date');
        $start_date = $request->post('start_date');
        $day = $request->post('day');
        echo response()->view('ajax::admin/table', compact('pay_date', 'start_date', 'day'))
            ->header('Content-Type', 'application/json')->content();
        exit;
    }
}