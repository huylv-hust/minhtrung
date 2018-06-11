@extends('layouts/admin/default')
@section('content')
    <script src="{{ asset('js/modules/customers.js') }}"></script>
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <!---BREADCRUMB-->
                <ol class="breadcrumb">
                    <li>
                        <a href="{{ route('admin_customers_list') }}">
                            <i class="material-icons">mood</i> Khách hàng
                        </a>
                    </li>
                    <li class="active">
                        <a href="javascript:void(0)">
                            <i class="material-icons">person_add</i> {{ $title }}
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
                            {{ Form::open(array('url' => isset($customer) ? route('admin_customers_edit', ['id' => $customer->id]) : route('admin_customers_create'), 'id' => 'form_create_customer', 'class'=>'form-horizontal', 'method'=>'post', 'role' => 'form', 'files' => true)) }}

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
                                            <input type="text" name="name" class="form-control" value="{{ isset($customer) ? $customer->name : old('name') }}" placeholder="Nhập tên">
                                        </div>
                                        <label id="name-error" class="error" for="name"></label>
                                    </div>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                    <label for="address">CMND</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" name="cmt" class="form-control" value="{{ isset($customer) ? $customer->cmt : old('cmt') }}" placeholder="Nhập CMND">
                                        </div>
                                        <label id="cmt-error" class="error" for="cmt">{{ $errors->has('cmt') ? $errors->first('cmt') : '' }}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                    <label for="address">Năm sinh</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" name="birthday" class="datepicker form-control" value="{{ isset($customer) ? date('d-m-Y', strtotime($customer->birthday)) : old('birthday') }}" placeholder="Nhập năm sinh">
                                        </div>
                                        <label id="birthday-error" class="error" for="birthday"></label>
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
                                            <input type="text" name="address" class="form-control" value="{{ isset($customer) ? $customer->address : old('address') }}" placeholder="Nhập địa chỉ">
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
                                            <input type="text" name="phone" class="form-control" value="{{ isset($customer) ? $customer->phone : old('phone') }}" placeholder="Nhập số điện thoại">
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
                                            <input type="email" name="email" class="form-control" value="{{ isset($customer) ? $customer->email : old('email') }}" placeholder="Nhập email">
                                        </div>
                                        <label id="email-error" class="error" for="email"></label>
                                    </div>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                    <label for="email">Người giám hộ</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" name="person" class="form-control" value="{{ isset($customer) ? $customer->person : old('person') }}" placeholder="Nhập thông tin">
                                        </div>
                                        <label id="person-error" class="error" for="person"></label>
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