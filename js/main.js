$(document).ready( function() {
	var home_page = "";
	$.postJSON = function(url, data, func) { $.post(url+(url.indexOf("?") == -1 ? "?" : "&")+"callback=?", data, func, "json"); }
	//Load Today Expense
	$.getJSON('./server/expense_api.php',{cache: false,param:'action=list&format=json'},function(data){
		home_page = new EJS({url: './views/gmail.ejs'}).render({data:data.expense});
		$('#news-container').html(home_page);
	});
	
	//Add Expense Form Display
	$('#add-expense').click(function(event){
		$('.loader').show();
		var html = new EJS({url: './views/add.ejs'}).render();
		$('#news-container').html(html);
	});
	
	//Add Expense
	$('#news-container').on('click','#add-expense-submit',function(event){
		event.preventDefault();
		var params = $('#add-expense-form').serialize();
		$.postJSON('./server/expense_api.php',{cache: false,param:params+'&action=add&format=json'},function(data){
			var html = new EJS({url: './views/monthly.ejs'}).render(data);
			$('#news-container').html(html);
		});
	});
	
	
});