@extends('layouts/admin/default')
@section('content')
    <script src="{{ asset('js/modules/orders.js') }}"></script>
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <!---BREADCRUMB-->
                <ol class="breadcrumb">
                    <li>
                        <a href="{{ route('admin_orders_list') }}">
                            <i class="material-icons">mood</i> Khách hàng
                        </a>
                    </li>
                    <li class="active">
                        <a href="javascript:void(0)">
                            <i class="material-icons">list</i> {{ $title }}
                        </a>
                    </li>
                </ol>
            </div>
            <!-- Inline Layout -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <!--TITLE-->
                        <div class="header">
                            <h2>
                                {{ mb_strtoupper($title, 'UTF-8') }}
                            </h2>
                        </div>
                        <!--CONTENT-->
                        <div class="body">
                        {{ Form::open(array('id'=>'form_order')) }}
                        <!--FORM SEARCH-->
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group">
                                        <div class="form-line">
                                            {{ Form::text('name',isset($filters['name']) ? $filters['name'] : '',array('placeholder'=>'Tên', 'class' => 'form-control')) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group">
                                        <div class="form-line">
                                            {{ Form::text('cmt',isset($filters['cmt']) ? $filters['cmt'] : '',array('placeholder'=>'Chứng minh nhân dân', 'class' => 'form-control')) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group">
                                        <div class="form-line">
                                            {{ Form::text('phone',isset($filters['phone']) ? $filters['phone'] : '',array('placeholder'=>'Số điện thoại', 'class' => 'form-control')) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group">
                                        <div class="form-line">
                                            {{ Form::text('end_date',isset($filters['end_date']) ? date('d-m-Y', strtotime($filters['end_date'])) : '',array('placeholder'=>'Ngày đáo hạn', 'class' => 'end_date datepicker form-control')) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <button id="btn_search" type="button" class="btn btn-success waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-search"></i> <span>Tìm kiếm</span>
                                    </button>
                                    <button id="btn_delete" type="button" class="btn btn-danger waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-trash"></i> <span>Xóa</span>
                                    </button>
                                </div>
                            </div>
                            <!---BUTTON ACTION-->

                            <!--ALERT MESSAGE-->
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
                            <!--START TABLE-->
                            <div class="table-responsive">
                                <table id="mainTable" class="table table-striped jambo_table responsive-utilities"
                                       style="cursor: pointer;">
                                    <thead>
                                    <tr>
                                        <th>
                                            <input class="filled-in" type="checkbox" value="" id="check_all">
                                            <label for="check_all" class="custom-label"></label>
                                        </th>
                                        <th>Tên</th>
                                        <th>CMND</th>
                                        <th>Điện thoại</th>
                                        <th>Khoản vay</th>
                                        <th>Ngày đáo hạn</th>
                                        <th>Hình thức</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($orders as $order)
                                        <tr>
                                            <td>
                                                {{ Form::checkbox('id[]', $order->id, false, array('class'=>'filled-in check_one'))}}
                                                <label for="check_one" class="custom-label"></label>
                                            </td>
                                            <td class="center">
                                                {{ $order->cus_name }}
                                            </td>
                                            <td class="center">
                                                {{ $order->cus_cmt }}
                                            </td>
                                            <td class="center">
                                                {{ $order->cus_phone }}
                                            </td>
                                            <td class="center">
                                                {{ $order->price }}
                                            </td>
                                            <td class="center">
                                                {{ date("d-m-Y", strtotime($order->end_date)) }}
                                            </td>
                                            <td class="center">
                                                <b>{{ \App\Helpers\Constants::$type[$order->type] }}</b>
                                            </td>
                                            <td class="center">
                                                @if($order->status == 1)
                                                    <span class="label label-success label-sts">{{ \App\Helpers\Constants::$pay[$order->status] }}</span>
                                                @else
                                                    <span class="label bg-deep-orange label-sts">{{ \App\Helpers\Constants::$pay[$order->status] }}</span>
                                                @endif
                                            </td>
                                            <td>
                                                @if($order->status == 0)
                                                    <a class="btn bg-purple btn-xs waves-effect"
                                                       href="{{ route('admin_orders_pay',array('id'=>$order->id)) }}">
                                                        <i class="glyphicon glyphicon-ok"></i> <span>Thanh toán</span>
                                                    </a>
                                                <a class="btn bg-purple btn-xs waves-effect"
                                                   href="{{ route('admin_orders_edit',array('id'=>$order->id)) }}">
                                                    <i class="glyphicon glyphicon-edit"></i> <span>Sửa</span>
                                                </a>
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <!--PAGINATION-->
                            <nav>
                                <?php if (isset($filters)) {
                                    echo $orders->appends($filters)->links('helpers.pagination');
                                } else {
                                    echo $orders->links('helpers.pagination');
                                } ?>
                            </nav>
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>
                <!-- #END# Inline Layout -->
            </div>
        </div>
    </section>
@stop