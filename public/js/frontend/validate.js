function hideerror() {
	$(".formError").remove();
}
function hidemsg() {
	$(".contact-success").remove();
	$(".register-success").remove();
}

function checkEmail(id) {
	var email = document.getElementById(id);
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email.value)) {
		return false;
	}
	return true;
}

function checkNull(form, id, mess, defaultvalue, left, top) {
	var name = $('#' + id).val();
	if (name == '' || name == defaultvalue) {
		if ($('#' + form + ' #error_' + id).length > 0) {
			$('#' + form + ' #error_' + id).html(mess);
		} else {
			$('#' + form + ' #' + id).after('<div class="nameformError parentFormfrm_contact formError" style="left: ' + left + 'px; margin-top: ' + top + 'px; opacity: 0.8;"><div id="error_' + id + '" class="formErrorContent">' + mess + '<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}

	return true;
}

function checkMail(form, id, mess, defaultvalue, left, top) {
	if (!checkEmail(id)) {
		if ($('#' + form + ' #error_' + id).length > 0) {
			$('#' + form + ' #error_' + id).html(mess);
		} else {
			$('#' + form + ' #' + id).after('<div class="nameformError parentFormfrm_contact formError" style="left: ' + left + 'px; margin-top: ' + top + 'px; opacity: 0.8;"><div id="error_' + id + '" class="formErrorContent">' + mess + '<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}

	return true;
}

function checkCaptcha(id, mess, defaultvalue, left, top) {
	var captcha = $('#' + id).val();
	var captcha_bk = $('#' + id + '_bk').val();

	if (captcha != captcha_bk) {
		if ($('#error_' + id).length > 0) {
			$('#error_' + id).html(mess);
		} else {
			$('#' + id).after('<div class="nameformError parentFormfrm_contact formError" style="left: ' + left + 'px; margin-top: ' + top + 'px; opacity: 0.8;"><div id="error_' + id + '" class="formErrorContent">' + mess + '<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}

	return true;
}

function checkNullTwo(id, id1, mess, defaultvalue, defaultvalue1, left, top) {
	var name = $('#' + id).val(); var name1 = $('#' + id1).val(); if (name == '' || name == defaultvalue || name1 == '' || name1 == defaultvalue1) {
		if ($('#error_' + id).length > 0) { $('#error_' + id).html(mess); } else { $('#' + id).after('<div class="nameformError parentFormfrm_contact formError" style="left: ' + left + 'px; margin-top: ' + top + 'px; opacity: 0.8;"><div id="error_' + id + '" class="formErrorContent">' + mess + '<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>'); }
		return false;
	}
	return true;
}

function validateregister() {

	var flag = true;
	var name = checkNull('frm_register', 'name', "Vui lòng nhập tên!", "Họ và Tên (*)", '40', '-265');
	//var id_no = checkNull('id_no', "Vui lòng nhập chứng minh nhân dân!", "Số CMND (*)", '40', '-265');
	//var date_issue = checkNull('date_issue', "Vui lòng nhập ngày cấp!", "Ngày cấp (*)", '40', '-265');
	//var place_issue = checkNull('place_issue', "Vui lòng nhập nơi cấp!", "Nơi cấp (*)", '40', '-265');
	//var address = checkNull('address', "Vui lòng nhập địa chỉ!", "Địa chỉ (*)", '40', '-265');
	// var department = checkNull('department', "Vui lòng nhập mã căn hộ!", "Mã căn (*)", '40', '-265');
	// var floor = checkNullTwo('floor', 'building', "Vui lòng nhập tầng, tòa!", "Tầng (*)", "Tòa (*)", '40', '-265');
	// var building = checkNull('building', "Vui lòng nhập tòa!","Tòa (*)",'40','-265');
	var content = checkNull('frm_register','content', "Vui lòng nhập nội dung!", "Nội dung (*)", '40', '-265');
	var mobile = checkNull('frm_register','mobile', "Điện thoại không hợp lệ!", "Điện Thoại (*)", '40', '-265');
	var email = checkMail('frm_register','email', "Email không hợp lệ!", "Email (*)", '40', '-265');
	if (!name || !mobile || !email || !content) {
		flag = false;
		setTimeout(hideerror, 5000);
	}
	return flag;
}

$(document).ready(function () {
	$('#btn-register-submit').click(function () {
		if (validateregister() == true) {
			$("#register-loader").show();
			var name = $('#name').val();
			var mobile = $('#mobile').val();
			var email = $('#email').val();
			var id_no = $('#id_no').val();
			var date_issue = $('#date_issue').val();
			var place_issue = $('#place_issue').val();
			var address = $('#address').val();
			var department = $('#department').val();
			var floor = $('#floor').val();
			var building = $('#building').val();
			var content = $('#content').val();

			var dataString = {_token: _token, name: name, mobile: mobile, email: email, id_no: id_no, date_issue: date_issue, place_issue: place_issue, address: address, department: department, floor: floor, building: building, content: content};
			$.ajax({
				type: "POST",
				url: baseUrl + '/contact/register',
				data: dataString,

				success: function (success) {
					$("#register-loader").hide();
					$('.register-success').remove();
					if (success == '1') {
						$('.close-form').trigger('click');
						$('#btn-register-reset').trigger('click');
						$('#register-loader').after("<div  class='register-success color-blue'>Thông tin đăng ký của Bạn được gửi hoàn tất ! Cảm ơn Bạn !</div>");
					} else {
						$('#register-loader').after("<div  class='register-success color-red'>Thông tin đăng ký của bạn không gửi được, vui lòng kiểm tra lại!</div>");
					}

					setTimeout(hidemsg, 5000);
				},

				error: function(error) {
					var results = error.responseJSON.errors;
					$.each( results, function( key, value ) {
					    if (key == 'name') {
                            checkNull('frm_register', 'name', "Vui lòng nhập tên!", "Họ và Tên (*)", '40', '-265');
                        }
                        if (key == 'content') {
                            checkNull('frm_register', 'content', "Vui lòng nhập nội dung!", "Nội dung (*)", '40', '-265');
                        }
                        if (key == 'mobile') {
                            checkNull('frm_register', 'mobile', "Điện thoại không hợp lệ!", "Điện Thoại (*)", '40', '-265');
                        }
                        if (key == 'email') {
                            checkMail('frm_register', 'email', "Email không hợp lệ!", "Email (*)", '40', '-265');
                        }
					});

				}
			});  //end ajax 
			return false;
		}//end if	

		return false;
	});

	$("#phoneregister").numeric();
	$('#btn-register-reset').click(function () { hideerror(); });
	$(".formError").click(function () {
		$(this).hide();
	});

	$('.close-form, .overlay-dark').click(function () {
		$("#register-loader").hide();
		$('.register-success').remove();
	});
});

