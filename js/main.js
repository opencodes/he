function init(device_id) {
	//Load Today Expense
	var deviceId = device_id;
	var params = {
			cache: false,
			action:'daily',
			device_id:deviceId,
			format:'json'
	};
	var APIUrl = "http://rkjha.com/android/expense_api.php?jsonp_callback=?";
	//var APIUrl = "http://127.0.0.1/html/he/server/expense_api.php?jsonp_callback=?";
	var mysqlDate = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var dateTime = d.getFullYear()+'-'+("0" + month).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
		return dateTime;
	};
	var mysqlTime = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var dateTime = ("0" + d.getHours()).slice(-2)+':'+("0" + d.getMinutes()).slice(-2)+':'+("0" + d.getSeconds()).slice(-2);
		return dateTime;
	};
	params.date = mysqlDate()+' '+mysqlTime();
	//var html = new EJS({url: './views/index.ejs'}).render();
	//$('#news-container').html(html);
	$(window).load(function(){
		var selected = $('.top-menu li:first').data('value');
		$('.top-menu li:first').addClass('active');
		params.action = selected;
		params.date = mysqlDate()+' '+mysqlTime();
		$.getJSON(APIUrl,params,function(data){
			if(data && data.expense){
				
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});				
				$('#news-container').html(html);
			}else{
				$('#news-container').html('<div class="alert alert-info"> No Record Found !</div>');
			}
			$('.loader').hide();
			
		});	
	});
	
	//Refresh Data
	$('#refresh-data').click(function(event){
		$('.loader').show();
		event.preventDefault();
		var selected = $('.top-menu li.active').data('value');
		params.action = selected;
		params.date = mysqlDate()+' '+mysqlTime();
		$.getJSON(APIUrl,params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				$('#news-container').html(html);
				
			}else{
				$('#news-container').html('<div class="alert alert-info" > No Record Found !</div>');
			}
			$('.loader').hide();
		});	
	});
	//Add Expense Form Display
	$('#add-expense').click(function(event){		
		var d = new Date();
		var month = d.getMonth()+1;
		var dates = d.getFullYear()+'-'+("0" + month).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
		var data = {
				id:'',payment_mode:'',note:'',amount:'',fdate:dates
		};
		var html = new EJS({url: './views/add.ejs'}).render(data);
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
		params.date = $('#date').val()+' '+mysqlTime();
		params.id = $('#id').val(); 	
		$.ajax({
			type: 'POST',
			url: APIUrl,
			data:params,
			dataType: 'jsonp'
			}).done(function(data){
				if(data && data.expense){
					var html = new EJS({url: './views/daily.ejs'}).render({data:data.expense});
					$('#news-container').html(html);
					
				}else{
					$('#news-container').html('<div class="alert alert-info"> No Record Found !</div>');
				}
				$('.loader').hide();
			}).fail(function(error){
				console.log('error');
				$('.loader').hide();
	  });		
	});
	//Active Tab
	$('.footer-menu').click(function(){
		
			$('.loader').show();
			$('.footer-menu').removeClass('active');
			var selected = $('.top-menu li.active').data('value');
			params.action = selected;
			params.date = mysqlDate()+' '+mysqlTime();
			params.filter = ($(this).attr('id')!='all')?$(this).attr('id'):'';
			$.getJSON(APIUrl,params,function(data){
				if(data && data.expense){
					var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
					
					$('#news-container').html(html);
				}else{
					$('#news-container').html('<div class="alert alert-info"> No Record Found !</div>');
				}
				$('.loader').hide();				
			});	
		
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
		params.date = mysqlDate()+' '+mysqlTime();
		$.getJSON(APIUrl,params,function(data){
			if(data && data.expense){
				var html = new EJS({url: './views/'+selected+'.ejs'}).render({data:data.expense});
				
				$('#news-container').html(html);
			}else{
				$('#news-container').html('<div class="alert alert-info"> No Record Found !</div>');
			}
			$('.loader').hide();
			
		});	
	});
	
	$('#news-container').on('click','tr.all td.data',function(e){
		e.preventDefault();
		var data = JSON.parse($(this).attr('data-values'));		
		var html = new EJS({url: './views/add.ejs'}).render(data);
		$('#news-container').html(html);

	});
	$('#news-container').on('click','#cancel',function(e){
		e.preventDefault();
		$('.loader').show();
		$('#refresh-data').trigger('click');
	});
	$('#news-container').on('click','tr.all td.badge-td',function(e){
		e.preventDefault();
		$(this).parent().toggleClass('selected');
		if($('tr.selected').length >= 1){
			if($('.action').css('display')!=="block"){
				$('.action').show();
				$('#selected-items').text($('tr.selected').length);
			}
			$('#selected-items').text($('tr.selected').length);
		}else{
			$('.action').hide();
		}
		
	});
	
	$('#cancel-action').on('click',function(e){
		$('tr.selected').toggleClass('selected');
		$('.action').hide();
	});
	$('#delete-items').on('click',function(e){
		e.preventDefault();	
		var items = [];
		$('tr.selected').each(function(k){
			$(this).remove();
			$('.action').hide();
			items.push($(this).children('td.badge-td').attr('data-id'));
		});
		params.action = 'delete';
		params.items = items.join(',');
		console.log(params);
		$.getJSON(APIUrl,params,function(data){
			$('.action').hide();
		});	
		
	});
	
	

}