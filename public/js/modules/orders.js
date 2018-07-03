var Customer = function () {
    var search = function () {
        $('#btn_search').on('click', function () {
            $('#form_customer').attr('method', 'GET').attr('action', baseUrl + '/customers').submit();
        });
    };

    var active = function () {
        $('#btn_active').on('click', function () {
            if(confirm('Ban có muốn thay đổi trạng thái?')) {
                $('input[name = "change_status"]').attr('value', '1');
                $('#form_customer').attr('action', baseUrl + '/customers/status').attr('method', 'POST').submit();
            }
        });
    };
    var inactive = function () {
        $('#btn_inactive').on('click', function () {
            if(confirm('Ban có muốn thay đổi trạng thái?')) {
                $('input[name = "change_status"]').attr('value', '0');
                $('#form_customer').attr('action', baseUrl + '/customers/status').attr('method', 'POST').submit();
            }
        });
    };

    var del = function () {
        $('#btn_delete').on('click', function () {
            if(confirm('Ban có muốn xóa khách hàng?'))
                $('#form_customer').attr('action', baseUrl + '/customers/delete').attr('method', 'POST').submit();
        });
    };

    var validate = function(){
        $('#form_create_customer').validate({
            rules: {
                name: {
                    required: true,
                    check_all_space: true,
                    maxlength: 50
                },
                cmt: {
                    required: true,
                    check_all_space: true,
                    maxlength: 50,
                    number: true
                },
                birthday: {
                    required: true
                },
                address: {
                    required: true,
                    check_all_space: true,
                    maxlength: 200
                },
                phone: {
                    required: true,
                    check_all_space: true,
                    maxlength: 11,
                    number: true
                },
                email: {
                    required: true,
                    check_all_space: true,
                    maxlength: 100
                }
            },
            messages: {
                name: {
                    required: 'Hãy nhập họ tên.',
                    check_all_space: 'Hãy nhập họ tên.',
                    maxlength: 'Nhập tối đa 50 kí tự.'
                },
                cmt: {
                    required: 'Hãy nhập số CMND.',
                    check_all_space: 'Hãy nhập số CMND.',
                    maxlength: 'Nhập tối đa 50 kí tự.',
                    number: 'Chỉ nhập số.'
                },
                birthday: {
                    required: 'Hãy nhập năm sinh.'
                },
                address: {
                    required: 'Hãy nhập địa chỉ.',
                    check_all_space: 'Hãy nhập địa chỉ.',
                    maxlength: 'Nhập tối đa 200 kí tự.'
                },
                phone: {
                    required: 'Hãy nhập số điện thoại.',
                    check_all_space: 'Hãy nhập số điện thoại.',
                    maxlength: 'Nhập tối đa 11 kí tự.',
                    number: 'Chỉ nhập số.'
                },
                email: {
                    required: 'Hãy nhập email.',
                    check_all_space: 'Hãy nhập email.',
                    maxlength: 'Nhập tối đa 100 kí tự.'
                },
                password: {
                    required: 'Hãy nhập mật khẩu',
                    maxlength: 'Nhập tối đa 100 kí tự.'
                }
            }
        });
    };

    var calculator =  function () {
        $('#price, #package').on('change', function () {
            var price = $('#price').val(),
                package = $('#package option:selected').val(),
                next_day = new Date.today().addDays(package).toString("dd-MM-yyyy");
            $('#form_create_installment input[name="interest"]').val(price/package);
            $('#form_create_installment input[name="end_date"]').val(next_day);
        });
    };

    var submit = function(){
        var form = $('#form_create_customer'),
            valid;
        form.on('submit', function() {
            valid = form.valid();
            if(valid == false)
                return false;

            if(confirm('Bạn có muốn tạo tài khoản không?'))
                return true;

            return false;
        });
    };

    return {
        init: function () {
            search();
            active();
            inactive();
            del();
            validate();
            calculator();
            submit();
        }
    };
}();

$(function () {
    Customer.init();
});