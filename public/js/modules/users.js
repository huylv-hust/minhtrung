var Users = function () {
    var search = function () {
        $('#btn_search').on('click', function () {
            console.log(111)
            $('#form_user').attr('method', 'GET').attr('action', baseUrl + '/users').submit();
        });
    };

    var active = function () {
        $('#btn_active').on('click', function () {
            if(confirm('Ban có muốn thay đổi trạng thái?')) {
                $('input[name = "change_status"]').attr('value', '1');
                $('#form_user').attr('action', baseUrl + '/users/status').attr('method', 'POST').submit();
            }
        });
    };
    var inactive = function () {
        $('#btn_inactive').on('click', function () {
            if(confirm('Ban có muốn thay đổi trạng thái?')) {
                $('input[name = "change_status"]').attr('value', '0');
                $('#form_user').attr('action', baseUrl + '/users/status').attr('method', 'POST').submit();
            }
        });
    };

    var del = function () {
        $('#btn_delete').on('click', function () {
            if(confirm('Ban có muốn xóa tài khoản người dùng?'))
                $('#form_user').attr('action', baseUrl + '/users/delete').attr('method', 'POST').submit();
        });
    };

    var validate = function(){
        $('#form_create_user').validate({
            rules: {
                name: {
                    required: true,
                    check_all_space: true,
                    maxlength: 50
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
                },
                password: {
                    required: true,
                    maxlength: 100
                }
            },
            messages: {
                name: {
                    required: 'Hãy nhập họ tên.',
                    check_all_space: 'Hãy nhập họ tên.',
                    maxlength: 'Nhập tối đa 50 kí tự.'
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

    var submit = function(){
        var form = $('#form_create_user'),
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
            submit();
        }
    };
}();

$(function () {
    Users.init();
});