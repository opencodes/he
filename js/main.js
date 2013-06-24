$(document).ready( function() {
	//Load Today Expense
	var deviceId = '1221dqwe12e1';
	var params = {
			cache: false,
			action:'list',
			device_id:deviceId,
			format:'json'	
	};
	$.getJSON('./server/expense_api.php',params,function(data){
		if(data && data.expense){
			var html = new EJS({url: './views/daily.ejs'}).render({data:data.expense});
			$('#news-container').html(html);
		}
		
	});	
	//Refresh Data
	$('#refresh-data').click(function(event){
		event.preventDefault();
		var selected = $('.logo-text select').val();
		params.action = selected;
		$.getJSON('./server/expense_api.php',params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				$('#news-container').html(html);
			}
			
		});	
	});
	//Add Expense Form Display
	$('#add-expense').click(function(event){
		$('.loader').show();
		$('#refresh-data').hide();
		var html = new EJS({url: './views/add.ejs'}).render();
		$('#news-container').html(html);
	});
	
	//Add Expense
	$('#news-container').on('click','#add-expense-submit',function(event){
		event.preventDefault();
		params.action = 'add';
		params.amount = $('#amount').val(); 
		params.payment_method = $('#payment_method').val(); 
		params.note = $('#note').val(); 
		$.post('./server/expense_api.php',params,function(data){
			var datas = JSON.parse(data);
			$('#refresh-data').show();
			if(datas && datas.expense){
				var html = new EJS({url: './views/daily.ejs'}).render({data:datas.expense});
				$('#news-container').html(html);
			}
		});
	});
	//Active Tab
	$('.footer-menu').click(function(){
		$('.footer-menu').removeClass('active');
		$(this).addClass('active');
		$('.row table tr').hide();
		$('.row table tr.'+$(this).attr('id')).show();
	});	
	//Show Different Result
	$('.logo-text select').on('change',function(event){
		event.preventDefault();
		var selected = $(this).val();
		params.action = selected;
		$.getJSON('./server/expense_api.php',params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				$('#news-container').html(html);
			}
			
		});	
	});
});