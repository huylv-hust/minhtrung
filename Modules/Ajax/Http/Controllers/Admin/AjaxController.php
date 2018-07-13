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
        $day = $request->post('day');
        echo response()->view('ajax::admin/table', compact('day'))
            ->header('Content-Type', 'application/json')->content();
        exit;
    }
}