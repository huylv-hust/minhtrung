<?php

namespace App\Helpers;

class Constants
{
    public static $per_page = 10;
    public static $COMMON_SAVE_OK = 'Xử lý thành công.';
    public static $SAVE_FAILED = 'Xử lý thất bại.';
    public static $AT_LEAST_1_RECORD = 'Bạn phải chọn ít nhất 1 bản ghi.';
    public static $role = [
        1 => 'Nhân viên',
        2 => 'Quản trị'
    ];
    public static $status = [
        '' => 'Trạng thái',
        0 => 'Ngừng hoạt động',
        1 => 'Đang hoạt động'
    ];
    public static $package = [
        50 => '50 Ngày',
        100 => '100 Ngày'
    ];
    public static $type = [
        1 => 'Cầm đồ',
        2 => 'Vay lãi',
        3 => 'Trả góp'
    ];
    public static $pay = [
        0 => 'Chưa thanh toán',
        1 => 'Đã thanh toán'
    ];
}