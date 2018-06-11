<?php

Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'admin/customers', 'namespace' => 'Modules\Customers\Http\Controllers\Admin'], function()
{
    Route::get('/', 'CustomersController@index')->name('admin_customers_list');
    Route::get('/create', 'CustomersController@create')->name('admin_customers_show_create');
    Route::post('/create', 'CustomersController@store')->name('admin_customers_create');
    Route::get('/edit/{id}', 'CustomersController@edit')->name('admin_customers_edit');
    Route::post('/edit/{id}', 'CustomersController@update');
    Route::post('/delete', 'CustomersController@destroy')->name('admin_customers_delete');
    Route::post('/status', 'CustomersController@status');
});