@extends('layouts/admin/default')
@section('content')
    <script src="{{ asset('js/modules/users.js') }}"></script>
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <!---BREADCRUMB-->
                <ol class="breadcrumb">
                    <li>
                        <a href="{{ route('admin_dashboard') }}">
                            <i class="material-icons">home</i> Trang chủ
                        </a>
                    </li>
                    <li class="active">
                        <a href="javascript:void(0)">
                            <i class="material-icons">person</i> {{ $title }}
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
                            {{ Form::open(array('id' => 'form_profile', 'class'=>'form-horizontal')) }}

                            <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="name">Họ Tên</label>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                        {{ Auth::user()->name }}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="address">Địa chỉ</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                        {{ Auth::user()->address }}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="phone">Điện thoại</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                        {{ Auth::user()->phone }}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                        {{ Auth::user()->email }}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <label for="name">Quyền</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                        {{ \App\Helpers\Constants::$role[Auth::user()->role] }}
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-offset-5 col-md-offset-5 col-sm-offset-4 col-xs-offset-2">
                                        <a href="{{ url()->previous() }}" class="btn btn-info waves-effect">
                                            <i class="glyphicon glyphicon-backward"></i> Quay lại
                                        </a>
                                        <a href="{{ route('admin_users_edit', ['id' => Auth::user()->id]) }} }}" class="btn btn-primary waves-effect">
                                            <i class="glyphicon glyphicon-edit"></i> Sửa thông tin
                                        </a>
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