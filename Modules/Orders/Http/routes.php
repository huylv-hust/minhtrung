<?php

Route::group(['middleware' =>  ['web', 'auth'], 'prefix' => 'admin/orders', 'namespace' => 'Modules\Orders\Http\Controllers\Admin'], function()
{
    Route::get('/', 'OrdersController@index')->name('admin_orders_list');
    Route::get('/create/{id}', 'OrdersController@create')->name('admin_orders_show_create');
    Route::post('/create/{id}', 'OrdersController@store')->name('admin_orders_create');
    Route::get('/pay/{id}', 'OrdersController@pay')->name('admin_orders_pay');
    Route::get('/edit/{id}', 'OrdersController@edit')->name('admin_orders_edit');
    Route::post('/edit/{id}', 'OrdersController@update');
    Route::post('/delete', 'OrdersController@destroy')->name('admin_orders_delete');
    Route::post('/status', 'OrdersController@status');
});
