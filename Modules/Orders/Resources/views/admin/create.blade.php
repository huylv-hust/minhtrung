@extends('layouts/admin/default')
@section('content')
    <script> var token = '<?php echo csrf_token()?>';</script>
    <script src="{{ asset('js/modules/orders.js') }}"></script>
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
                            <i class="material-icons">attach_money</i> {{ $title }}
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
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#handle" data-toggle="tab">
                                        <i class="material-icons">account_balance</i> CẦM ĐỒ
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#loans" data-toggle="tab">
                                        <i class="material-icons">local_atm</i> VAY LÃI
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#installment" data-toggle="tab">
                                        <i class="material-icons">casino</i> TRẢ GÓP
                                    </a>
                                </li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <!-- Tab handle -->
                                <div role="tabpanel" class="tab-pane fade in active" id="handle">
                                    {{ Form::open(array('url' => isset($order) ? route('admin_orders_edit', ['id' => $order->id]) : route('admin_orders_create', ['id' => $customer->id]), 'id' => 'form_create_handle', 'class'=>'form-horizontal form', 'method'=>'post', 'role' => 'form', 'files' => true)) }}
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
                                    <input type="hidden" name="type" value="1">
                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="name">Khách hàng</label>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                            <div class="form-group">
                                                {{ $customer->name }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="item">Đồ vật</label>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="item" class="form-control" value="{{ isset($order) ? $order->item : old('item') }}" placeholder="Nhập tên đồ vật">
                                                </div>
                                                <label id="item-error" class="error" for="item"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="item_info">Thông tin vật</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="item_info" class="form-control" value="{{ isset($order) ? $order->item_info : old('item_info') }}" placeholder="Nhập thông tin vật">
                                                </div>
                                                <label id="item_info-error" class="error" for="item_info"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="price">Giá ước tính</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="price" class="price form-control" value="{{ isset($order) ? $order->price : old('price') }}" placeholder="Nhập giá ước tính">
                                                </div>
                                                <label id="price-error" class="error" for="price"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="interest">Lãi suất</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="interest" class="interest form-control" value="{{ isset($order) ? $order->interest : old('address') }}" placeholder="Lãi suất của 1 triệu / ngày">
                                                </div>
                                                <label id="interest-error" class="error" for="interest"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="end_date">Ngày đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="end_date" class="end_date datepicker form-control" value="{{ isset($order) ? date('d-m-Y', strtotime($order->end_date)) : old('end_date') }}" placeholder="Nhập ngày đáo hạn">
                                                </div>
                                                <label id="end_date-error" class="error" for="end_date"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="money">Tiền đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="money" class="money form-control" value="{{ isset($order) ? $order->money : old('money') }}" placeholder="Số tiền đáo hạn">
                                                </div>
                                                <label id="money-error" class="error" for="money"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5">
                                            <button type="submit" class="btn btn-primary waves-effect">
                                                <i class="material-icons">note_add</i> Lưu
                                            </button>
                                        </div>
                                    </div>
                                    {{ Form::close() }}
                                </div>
                                <!-- Tab loans -->
                                <div role="tabpanel" class="tab-pane fade" id="loans">
                                    {{ Form::open(array('url' => isset($order) ? route('admin_orders_edit', ['id' => $order->id]) : route('admin_orders_create', ['id' => $customer->id]), 'id' => 'form_create_loans', 'class'=>'form-horizontal', 'method'=>'post', 'role' => 'form', 'files' => true)) }}
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
                                    <input type="hidden" name="type" value="2">
                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="name">Khách hàng</label>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                            <div class="form-group">
                                                {{ $customer->name }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="price">Khoản vay</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="price" class="price form-control" value="{{ isset($order) ? $order->price : old('price') }}" placeholder="Nhập khoản vay">
                                                </div>
                                                <label id="price-error" class="error" for="price"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="interest">Lãi suất</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="interest" class="interest form-control" value="{{ isset($order) ? $order->interest : old('address') }}" placeholder="Lãi suất của 1 triệu / ngày">
                                                </div>
                                                <label id="interest-error" class="error" for="interest"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="end_date">Ngày đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="end_date" class="end_date datepicker form-control" value="{{ isset($order) ? date('d-m-Y', strtotime($order->end_date)) : old('end_date') }}" placeholder="Nhập ngày đáo hạn">
                                                </div>
                                                <label id="end_date-error" class="error" for="end_date"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="money">Tiền đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="money" class="money form-control" value="{{ isset($order) ? $order->money : old('money') }}" placeholder="Số tiền đáo hạn">
                                                </div>
                                                <label id="money-error" class="error" for="money"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5">
                                            <button type="submit" class="btn btn-primary waves-effect">
                                                <i class="material-icons">note_add</i> Lưu
                                            </button>
                                        </div>
                                    </div>
                                    {{ Form::close() }}
                                </div>
                                <!-- Tab installment -->
                                <div role="tabpanel" class="tab-pane fade" id="installment">
                                    {{ Form::open(array('url' => isset($order) ? route('admin_orders_edit', ['id' => $order->id]) : route('admin_orders_create', ['id' => $customer->id]), 'id' => 'form_create_installment', 'class'=>'form-horizontal', 'method'=>'post', 'role' => 'form', 'files' => true)) }}
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
                                    <input type="hidden" name="type" value="3">
                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="name">Khách hàng</label>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7 m-t--8">
                                            <div class="form-group">
                                                {{ $customer->name }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="price">Khoản vay</label>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="price" id="price" class="form-control" value="{{ isset($order) ? $order->price : old('price') }}" placeholder="Nhập khoản vay">
                                                </div>
                                                <label id="price-error" class="error" for="price"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="real_price">Thực nhận</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="real_price" id="real_price" class="form-control" value="{{ isset($order) ? $order->real_price : old('real_price') }}" placeholder="Nhập tiền sau trừ lãi">
                                                </div>
                                                <label id="real_price-error" class="error" for="real_price"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="interest">Gói vay</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    {{ Form::select('package',\App\Helpers\Constants::$package, isset($order) ? $order->package : old('package'), array('class' => 'form-control', 'id' => 'package')) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="package">Tiền theo ngày</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="interest" id="interest" class="form-control" value="{{ isset($order) ? $order->interest : old('interest') }}" placeholder="Tiền phải trả / ngày">
                                                </div>
                                                <label id="interest-error" class="error" for="interest"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="end_date">Ngày đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="end_date" id="end_date" class="datepicker form-control" value="{{ isset($order) ? date('d-m-Y', strtotime($order->end_date)) : (old('end_date') ?: $end_date) }}" placeholder="Nhập ngày đáo hạn">
                                                </div>
                                                <label id="end_date-error" class="error" for="end_date"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="money">Tiền đáo hạn</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="text" name="money" id="money" class="form-control" value="{{ isset($order) ? $order->money : old('money') }}" placeholder="Số tiền đáo hạn">
                                                </div>
                                                <label id="money-error" class="error" for="money"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                            <label for="pay_date">Thanh toán</label>
                                        </div>
                                        <div id="day_table" class="col-lg-6 col-md-6 col-sm-8 col-xs-7" style="padding-left: 0">
                                            <input type="hidden" name="pay_date" id="pay_date" class="form-control" value="{{ isset($order) ? $order->money : '' }}">
                                            @include('ajax::admin.table', ['day' => isset($order) ? $order->pay_date : 50])
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5">
                                            <button type="submit" class="btn btn-primary waves-effect">
                                                <i class="material-icons">note_add</i> Lưu
                                            </button>
                                        </div>
                                    </div>
                                    {{ Form::close() }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Inline Layout -->
            </div>
        </div>
    </section>
@stop