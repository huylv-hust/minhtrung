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
        $start_day = $request->post('start_day');
        $day = $request->post('day');
        echo response()->view('ajax::admin/table', compact('start_day', 'day'))
            ->header('Content-Type', 'application/json')->content();
        exit;
    }
}