<?php

Route::group(['middleware' =>  ['web', 'auth'], 'prefix' => 'admin/ajax', 'namespace' => 'Modules\Ajax\Http\Controllers\Admin'], function()
{
    Route::post('/table', 'AjaxController@createTable');
});
