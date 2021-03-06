<?php

Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'admin/users', 'namespace' => 'Modules\Users\Http\Controllers\Admin'], function()
{
    Route::get('/', 'UsersController@index')->name('admin_users_list');
    Route::get('/edit/{id}', 'UsersController@edit')->name('admin_users_edit');
    Route::post('/edit/{id}', 'UsersController@update');
    Route::get('/profile', 'UsersController@profile')->name('profile');
});

Route::group(['middleware' => ['web', 'auth', 'admin'], 'prefix' => 'admin/users', 'namespace' => 'Modules\Users\Http\Controllers\Admin'], function()
{
    Route::post('/status', 'UsersController@status');
    Route::post('/delete', 'UsersController@destroy')->name('admin_users_delete');
    Route::get('/create', 'UsersController@create')->name('admin_users_show_create');
    Route::post('/create', 'UsersController@store')->name('admin_users_create');
});
