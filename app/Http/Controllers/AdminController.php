<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 9/7/2017
 * Time: 1:13 PM
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function dashboard()
    {
        $title = 'Dashboard';
        return view('layouts.admin.dashboard', compact('title'));
    }
}