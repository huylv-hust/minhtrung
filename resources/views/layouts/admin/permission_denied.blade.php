@extends('layouts/admin/default')
@section('content')
    <section class="content">
        <div class="four-zero-four-container">
            <div class="alert alert-warning">
                <strong>Lỗi!</strong> Bạn không có quyền truy cập vào trang này.
            </div>
            <a href="{{ url()->previous() }}" class="btn btn-info waves-effect btn-sm">
                <i class="glyphicon glyphicon-backward"></i> Quay lại
            </a>
        </div>
    </section>
@stop
