<?php

Route::group(['middleware' => 'web', 'prefix' => 'orders', 'namespace' => 'Modules\Orders\Http\Controllers'], function()
{
    Route::get('/', 'OrdersController@index');
});
