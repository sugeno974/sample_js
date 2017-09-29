$(document).ready(function() {
	var today = new Date();
	$("#checkin").datepicker({
		dateFormat: "yy-mm-dd",
		minDate: new Date(today.getTime() + 4 *24*60*60*1000),
		maxDate: new Date(today.getTime() + 730 *24*60*60*1000)
	});
	$("#checkout").datepicker({
		dateFormat: "yy-mm-dd",
		minDate: new Date(today.getTime() + 15 *24*60*60*1000),
		maxDate: new Date(today.getTime() + 730 *24*60*60*1000)
	});

	var checkinDate = new Date();
	checkinDate.setDate(checkinDate.getDate() + 14);
	$("#checkin").val(checkinDate.getFullYear() + '-' + ('0' + (checkinDate.getMonth() + 1)).slice(-2) + '-' + ('0' + checkinDate.getDate()).slice(-2));

	var checkoutDate = new Date();
	checkoutDate.setDate(checkoutDate.getDate() + 15);
	$("#checkout").val(checkoutDate.getFullYear() + '-' + ('0' + (checkoutDate.getMonth() + 1)).slice(-2) + '-' + ('0' + checkoutDate.getDate()).slice(-2));

	$("#checkin").change(function() {
		var changeDate = new Date($("#checkin").val());
		changeDate.setDate(changeDate.getDate() + 1);
		$("#checkout").datepicker("option", "minDate", changeDate);
		$("#checkout").val(changeDate.getFullYear() + '-' + ('0' + (changeDate.getMonth() + 1)).slice(-2) + '-' + ('0' + changeDate.getDate()).slice(-2));
	});

	$("#checkin, #checkout").change(function() {
		var checkinDate = new Date($("#checkin").val());
		var checkoutDate = new Date($("#checkout").val());
		var stayDays = (checkoutDate - checkinDate) / (24*60*60*1000);
		$(".stay_days").text(stayDays + '泊');
		$("#stay_days").val(stayDays);
	});
});
