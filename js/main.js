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
	
	//Refresh Data
	$('#refresh-data').click(function(event){
		$('.loader').show();
		event.preventDefault();
		var selected = $('.top-menu li.active').data('value');
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
		if(!$('#amount').val()){
			$('.amount-help').text('This is a required field.');
			return true;
		}else if(!$('#note').val()){
			$('.note-help').text('This is a required field.');
			return true;
		}
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
		
		if($('.top-menu li.active').data('value') == 'daily'){
			$('.loader').show();
			$('.footer-menu').removeClass('active');
			$('#news-container table tr').hide();		
			$('#news-container table tr.'+$(this).attr('id')).show();
			$('#news-container table tr.total').show();
			$('.loader').hide();
		}
		
	});	
	//Show Different Result
	$('.top-menu').on('click','li',function(event){
		event.preventDefault();
		$('.loader').show();
		$('.top-menu li').removeClass('active');
		$('#hideshowmenu').trigger('click');
		var selected = $(this).data('value');
		$(this).addClass('active');
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