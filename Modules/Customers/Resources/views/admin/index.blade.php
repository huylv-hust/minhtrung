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
                        {{ Form::open(array('id'=>'form_customer')) }}
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
                                            {{ Form::text('email',isset($filters['email']) ? $filters['email'] : '',array('placeholder'=>'Email', 'class' => 'form-control')) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <button id="btn_search" type="submit" class="btn btn-success waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-search"></i> <span>Tìm kiếm</span>
                                    </button>
                                    <a href="{{ route('admin_customers_show_create') }}" class="btn btn-primary waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-plus"></i> <span>Thêm mới</span>
                                    </a>
                                    <button id="btn_delete" type="button" class="btn btn-danger waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-trash"></i> <span>Xóa</span>
                                    </button>
                                </div>
                            </div>
                            <!---BUTTON ACTION-->
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <button id="btn_active" type="button" class="btn btn-success waves-effect btn-sm">
                                        <i class="glyphicon glyphicon glyphicon-ok-circle"></i> <span>Hoạt động</span>
                                    </button>
                                    <button id="btn_inactive" type="button" class="btn bg-deep-orange waves-effect btn-sm">
                                        <i class="glyphicon glyphicon-ban-circle"></i> <span>Ngừng hoạt động</span>
                                    </button>
                                </div>
                                <input type="hidden" name="change_status" value="">
                            </div>
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
                                        <th>Địa chỉ</th>
                                        <th>Điện thoại</th>
                                        <th>Email</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($customers as $customer)
                                        <tr>
                                            <td>
                                                {{ Form::checkbox('id[]', $customer->id, false, array('class'=>'filled-in check_one'))}}
                                                <label for="check_one" class="custom-label"></label>
                                            </td>
                                            <td class="center">
                                                {{ $customer->name }}
                                            </td>
                                            <td class="center">
                                                {{ $customer->cmt }}
                                            </td>
                                            <td class="center">
                                                {{ $customer->address }}
                                            </td>
                                            <td class="center">
                                                {{ $customer->phone }}
                                            </td>
                                            <td class="center">
                                                {{ $customer->email }}
                                            </td>
                                            <td class="center">
                                                @if($customer->status == 1)
                                                    <span class="label label-success label-sts">{{ \App\Helpers\Constants::$status[$customer->status] }}</span>
                                                @else
                                                    <span class="label bg-deep-orange label-sts">{{ \App\Helpers\Constants::$status[$customer->status] }}</span>
                                                @endif
                                            </td>
                                            <td>
                                                <a class="btn bg-purple btn-xs waves-effect"
                                                   href="{{ route('admin_customers_edit',array('id'=>$customer->id)) }}">
                                                    <i class="glyphicon glyphicon-edit"></i> <span>Sửa</span>
                                                </a>
                                                <a class="btn bg-purple btn-xs waves-effect"
                                                   href="{{ route('admin_orders_show_create',array('id'=>$customer->id)) }}">
                                                    <i class="glyphicon glyphicon-usd"></i> <span>Vay</span>
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <!--PAGINATION-->
                            <nav>
                                <?php if (isset($filters)) {
                                    echo $customers->appends($filters)->links('helpers.pagination');
                                } else {
                                    echo $customers->links('helpers.pagination');
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