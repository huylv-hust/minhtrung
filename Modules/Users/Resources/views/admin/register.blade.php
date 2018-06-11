@extends('layouts/admin/default')
@section('content')
    <script src="{{ asset('js/modules/users.js') }}"></script>
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <!---BREADCRUMB-->
                <ol class="breadcrumb">
                    <li>
                        <a href="{{ route('admin_users_list') }}">
                            <i class="material-icons">people</i> Người dùng
                        </a>
                    </li>
                    <li class="active">
                        <a href="javascript:void(0)">
                            <i class="material-icons">person_add</i>
                        </a>
                    </li>
                </ol>
            </div>
            <!-- Inline Layout -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                {{ mb_strtoupper($title, 'UTF-8') }}
                            </h2>
                        </div>
                        <div class="body">
                            {{ Form::open(array('url' => isset($user) ? route('admin_users_edit', ['id' => $user->id]) : route('admin_users_create'), 'id' => 'form_create_user', 'class'=>'form-horizontal', 'method'=>'post', 'role' => 'form', 'files' => true)) }}

                            <div class="row clearfix">
                                @if(Session::has('error'))
                                    <div class="alert alert-danger m-l-15 m-r-15">
                                        <a class="close" data-dismiss="alert">×</a>
                                        <strong>Lỗi!</strong> {{ Session::get('error')}}
                                    </div>
                                @endif
                                @if(Session::has('success'))
                                    <div class="alert alert-info m-l-15 m-r-15">
                                        <a class="close" data-dismiss="alert">×</a>
                                        <strong>Thành công!</strong> {{ Session::get('success')}}
                                    </div>
                                @endif
                            </div>

                            <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="name">Họ Tên</label>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" name="name" class="form-control" value="{{ isset($user) ? $user->name : old('name') }}" placeholder="Nhập tên">
                                            </div>
                                            <label id="name-error" class="error" for="name"></label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="address">Địa chỉ</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" name="address" class="form-control" value="{{ isset($user) ? $user->address : old('address') }}" placeholder="Nhập địa chỉ">
                                            </div>
                                            <label id="address-error" class="error" for="address"></label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="phone">Điện thoại</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" name="phone" class="form-control" value="{{ isset($user) ? $user->phone : old('phone') }}" placeholder="Nhập số điện thoại">
                                            </div>
                                            <label id="phone-error" class="error" for="phone"></label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="email" name="email" class="form-control" value="{{ isset($user) ? $user->email : old('email') }}" placeholder="Nhập email">
                                            </div>
                                            <label id="email-error" class="error" for="email">{{ $errors->has('email') ? $errors->first('email') : '' }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="name">Quyền</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                {{ Form::select('role',\App\Helpers\Constants::$role, isset($user) ? $user->role : old('role'), array('class' => 'form-control')) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="password">Mật khẩu</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="password" name="password" class="form-control" placeholder="Nhập mật khẩu">
                                            </div>
                                            <label id="password-error" class="error" for="password"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5">
                                        <button type="submit" class="btn btn-primary waves-effect">
                                            <i class="material-icons">person_add</i> Lưu
                                        </button>
                                    </div>
                                </div>
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>
                <!-- #END# Inline Layout -->
            </div>
        </div>
    </section>
@stop