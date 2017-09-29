$(function() {
	$("#nextbtn").click(function() {
		var validationResult = $("#booking-entry").validationEngine('validate');

		if (validationResult) {
			if (!checkEmailDomain($('#email').val())) {
				alertify.alert('<span style="margin-bottom:10px; font-size:13px; line-height:1.8;">お手数ですが、下記のお電話番号までお問合せください。<br><br>Please contact the following number for any inquiries.</span>');
				return false;
			}
			checkCustomerBeforeSubmit();
		}
	});
});

function checkCustomerBeforeSubmit() {
	var loginFormOffset = $("#signin").offset();
	if (loginFormOffset !== undefined) {
		$.post("/booking_entry/customer", {
				email: $("#email").val(),
				cid: $("#cid").val(),
				sid: $("#sid").val()
			},
			onCheckCustomerBeforeSubmit
		);
	} else {
		$("#booking-entry").submit();
	}
}

function onCheckCustomerBeforeSubmit(data) {
	if (data.result) {
		alertify.set({
			labels: {
				ok: "予約に進む",
				cancel: "ログインする"
			}
		});
		alertify.confirm(
			'<span style="margin-bottom:10px; font-size:13px; line-height:1.8;">入力いただいたメールアドレスは登録済みです。<br />ログインしない場合は新しくランダムなパスワードを発行し、<br />ご予約に進みます。</span>',
			function(/* var ok boolean */ok) {
				if (ok) {
					$("#booking-entry").submit();
				} else {
					var top = $("#booking_payment_entry").offset().top;
					$("html, body").animate({scrollTop: top}, "fast");
					$("#login_email").val($("#email").val());
					$("#login_password").focus();
				}
			}
		);
	} else {
		$("#booking-entry").submit();
	}
}

function checkEmailDomain(email) {
//	ml = /.+@.+\.com$|.+@.+\.ne\.jp$|.+@.+\.co\.jp$/;
	ml = /@163.com$/;
	if (email.match(ml)) {
		return false;
	} else {
		return true;
	}
}
