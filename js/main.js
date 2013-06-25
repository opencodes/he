$(document).ready( function() {
	//Load Today Expense
	var deviceId = '1221dqwe12e1';
	var params = {
			cache: false,
			action:'daily',
			device_id:deviceId,
			format:'json'	
	};
	var APIUrl = "http://rkjha.com/android/expense_api.php?jsonp_callback=?";
	 $.ajax({
			type: 'GET',
			url: APIUrl,
			data: params,
			dataType: 'jsonp'
			}).done(function(data){
				if(data && data.expense){
					var html = new EJS({url: './views/daily.ejs'}).render({data:data.expense});
					$('#news-container').html(html);
					$('.loader').hide();
				}
			}).fail(function(error){
				console.log('error');
	 });
	$.getJSON(APIUrl,params,function(data){
		$('.loader').show();
		if(data && data.expense){
			var html = new EJS({url: './views/daily.ejs'}).render({data:data.expense});
			$('#news-container').html(html);
			$('.loader').hide();
		}
		
	});	
	//Refresh Data
	$('#refresh-data').click(function(event){
		$('.loader').show();
		event.preventDefault();
		var selected = $('.logo-text select').val();
		params.action = selected;
		$.getJSON(APIUrl,params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				$('#news-container').html(html);
				$('.loader').hide();
			}
			
		});	
	});
	//Add Expense Form Display
	$('#add-expense').click(function(event){		
		$('#refresh-data').hide();
		var html = new EJS({url: './views/add.ejs'}).render();
		$('#news-container').html(html);
	});
	
	//Add Expense
	$('#news-container').on('click','#add-expense-submit',function(event){
		event.preventDefault();
		$('.loader').show();
		params.action = 'add';
		params.amount = $('#amount').val(); 
		params.payment_method = $('#payment_method').val(); 
		params.note = $('#note').val(); 
		$.ajax({
			type: 'POST',
			url: APIUrl,
			data:params,
			dataType: 'jsonp'
			}).done(function(data){
				if(data && data.expense){
					var html = new EJS({url: './views/daily.ejs'}).render({data:data.expense});
					$('#news-container').html(html);
					$('.loader').hide();
				}
			}).fail(function(error){
				console.log('error');
	  });		
	});
	//Active Tab
	$('.footer-menu').click(function(){
		$('.loader').show();
		$('.footer-menu').removeClass('active');
		$(this).addClass('active');
		$('.row table tr').hide();		
		$('.row table tr.'+$(this).attr('id')).show();
		$('.loader').hide();
	});	
	//Show Different Result
	$('.logo-text select').on('change',function(event){
		event.preventDefault();
		$('.loader').show();
		var selected = $(this).val();
		params.action = selected;
		$.getJSON(APIUrl,params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				$('.loader').hide();
				$('#news-container').html(html);
			}
			
		});	
	});
});