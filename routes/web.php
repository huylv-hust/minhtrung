<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/admin', function() {
    return redirect(route('login'));
});
Route::get('/admin/login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
Route::post('/admin/login', ['uses' => 'Auth\LoginController@login']);
Route::get('/admin/logout', ['uses' => 'Auth\LoginController@logout'])->name('logout');
Route::group(['middleware' => ['auth','web'], 'prefix' => 'admin'], function () {
    Route::get('/dashboard', 'AdminController@dashboard')->name('admin_dashboard');
});
Route::get('/admin/permission', ['middleware' => ['web', 'auth'], function() {
    $title = 'Bạn không có quyền truy cập.';
    return view('layouts.admin.permission_denied', compact('title'));
}])->name('insufficient_permission');