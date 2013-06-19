$(document).ready( function() {
	var home_page = "";
	$.getJSON('./js/data.js',{cache: false},function(data){
		home_page = new EJS({url: './views/monthly.ejs'}).render(data);
		$('#news-container').html(home_page);
	});
	//Add Expense
	$('#add-expense').click(function(event){
		$('.loader').show();
		var html = new EJS({url: './views/add.ejs'}).render();
		$('#news-container').html(html);
	});
	$('#add-expense-submit').on('click',function(event){
		alert('sadsd');
		event.preventDefault();
		var params = $('#add-expense-form').serialize();
		$.post('expense_api.php',{cache: false,param:params},function(data){
			var html = new EJS({url: './views/monthly.ejs'}).render(data);
			$('#news-container').html(html);
		});
	});
});