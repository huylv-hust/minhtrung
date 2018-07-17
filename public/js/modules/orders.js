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

    var validate = function(id){
        $(id).validate({
            rules: {
                item: {
                    required: true,
                    check_all_space: true,
                    maxlength: 255
                },
                item_info: {
                    required: true,
                    check_all_space: true,
                    maxlength: 255
                },
                price: {
                    required: true,
                    check_all_space: true,
                    maxlength: 10,
                    number: true
                },
                real_price: {
                    required: true,
                    check_all_space: true,
                    maxlength: 10,
                    number: true
                },
                interest: {
                    required: true,
                    check_all_space: true,
                    maxlength: 10,
                    number: true
                },
                end_date: {
                    required: true
                },
                money: {
                    required: true,
                    check_all_space: true,
                    maxlength: 10,
                    number: true
                }
            },
            messages: {
                item: {
                    required: 'Hãy nhập item',
                    check_all_space: 'Hãy nhập item',
                    maxlength: 'Hãy nhập ít hơn 255 ký tự'
                },
                item_info: {
                    required: 'Hãy nhập thông tin',
                    check_all_space: 'Hãy nhập thông tin',
                    maxlength: 'Nhập tối đa 255 ký tự'
                },
                price: {
                    required: 'Hãy nhập vào giá/khoản vay',
                    check_all_space: 'Hãy nhập vào giá/khoản vay',
                    maxlength: 'Nhập tối đa 10 ký tự',
                    number: 'Chỉ được nhập số'
                },
                real_price: {
                    required: 'Nhập tiền sau trừ lãi',
                    check_all_space: 'Nhập tiền sau trừ lãi',
                    maxlength: 'Nhập tối đa 10 ký tự',
                    number: 'Chỉ được nhập số'
                },
                interest: {
                    required: 'Hãy nhập vào tiền lãi',
                    check_all_space: 'Hãy nhập vào tiền lãi',
                    maxlength: 'Nhập tối đa 10 ký tự',
                    number: 'Chỉ được nhập số'
                },
                end_date: {
                    required: 'Hãy nhập vào ngày đáo hạn'
                },
                money: {
                    required: 'Hãy nhập vào tiền đáo hạn',
                    check_all_space: 'Hãy nhập vào tiền đáo hạn',
                    maxlength: 'Nhập tối đa 10 ký tự',
                    number: 'Chỉ được nhập số'
                }
            }
        });
    };

    var submit_tab_1 = function() {
        var form = '#form_create_handle';
        validate(form);
        submit(form)
    };
    var submit_tab_2 = function() {
        var form = '#form_create_loans';
        validate(form);
        submit(form)
    };
    var submit_tab_3 = function() {
        var form = '#form_create_installment';
        validate(form);
        submit(form)
    };

    var submit = function(id){
        var form = $(id);
        var valid;

        form.on('submit', function() {
            valid = form.valid();
            if(valid == false)
                return false;

            if(confirm('Bạn có muốn tạo tài khoản không?'))
                return true;

            return false;
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
    var calculator_money =  function () {
        $('.end_date, .price, .interest').on('change', function () {
            console.log($(this).closest('form').find('.end_date').val())
            var form = $(this).closest('form'),
                end_date = form.find('.end_date').val().split('-').reverse().join('-'),
                today = new Date.today().toString('yyyy-MM-dd'),
                day = (new Date(end_date) - new Date(today))/86400000,
                price = form.find('.price').val(),
                interest = form.find('.interest').val();
            form.find('.money').val(parseInt((price/1000000) * day * interest) + parseInt(price));
        });
    };

    var create_table = function () {
        $('#package').on('change', function () {
            var package = $('#package option:selected').val();
            var request = $.ajax({
                headers: {'X-CSRF-TOKEN': token},
                type: 'post',
                data: {day: package},
                url: baseUrl + '/ajax/table'
            });
            var response = request.done(function(data){
                $('#day_table').html(data);
            });
        });
    };

    var pay = function () {
        $('.btn_pay').off('click').on('click', function () {
            $(this).removeClass('btn_pay bg-deep-orange').addClass('btn-success');
            var money = $('#money').val(),
                interest = $('#interest').val(),
                pay_date = $('#pay_date').val();
            if (!money)
                money = 0;
            $('#money').val(parseInt(money) + parseInt(interest));
            $('#pay_date').val(pay_date + ',' + $(this).text())
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
            calculator_money();
            create_table();
            pay();
            submit_tab_1();
            submit_tab_2();
            submit_tab_3();
            submit();
        }
    };
}();

$(function () {
    Customer.init();
});