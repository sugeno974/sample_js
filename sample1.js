var getCancelPolicy = function(params, target) {
	var detail = $(target).find('p.canceldetail');
	detail.empty().append('Loading...');

	$.ajax({
		url: '/avail/getCancelPolicy',
		data: { cmd:'getCP', s:params.s, c:params.c, ci:params.ci, sd:params.sd, ct:params.ct, pc:params.pc },
		cache: false,
		success: function(response) {
			if (response && response.Cancellation) {
				detail.empty().append(response.Cancellation);
			} else {
				detail.empty().append('エラーが発生しました。<br>お手数ですが、再度、ホテルの検索からやり直して下さい。<br>');
			}
		}
	});
};

var getCancelPolicyToCheck = function(params) {
	var result = $.ajax({
		url: '/avail/getCancelPolicy',
		data: { cmd:'getCP', s:params.s, c:params.c, ci:params.ci, sd:params.sd, ct:params.ct, pc:params.pc },
		cache: false,
		async: false,
		success: function(response) {
		}
	}).responseText;
	return result;
};

(function($) {
	$('.button_cancel_policy').on('touchstart click', function( event ){
		var params = {
				"s": sid,
				"c": cid,
				"ci": checkin,
				"sd": stay_days,
				"ct": city_code,
				"pc": $(this).attr("data-plancode")
		};
		getCancelPolicy(params, this.nextElementSibling);
	});
})(jQuery);
