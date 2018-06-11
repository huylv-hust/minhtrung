$(function() {
    $("#check_all").click(function () {
        var check = $("#check_all").is(':checked');
        if (check == true) {
            $("#check_one").prop('checked', true);
        }
        else {
            $("#check_one").prop('checked', false);
        }
    });

    //field required contain all space
    jQuery.validator.addMethod("check_all_space", function(value,element) {
        if(value.trim() != '') return true;
        return false;
    },'Không được nhập toàn dấu cách');

    //Datetimepicker plugin
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
});