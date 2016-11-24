
		var req;
		function elem(id){
			return document.getElementById(id);
		}
		function loadXML(url, data){
			//создается и начинается сам запрос
			url = url + "?r="+Math.random()+"&"+data; // обязательная защита от кэширования страниц(добавляеться в урл случайное число что б он был все время разный)
			console.log(url);
// создание обьектов для выполнения запросов
	if (window.XMLHttpRequest) { //для всех проме IE
		req = new XMLHttpRequest(); //создали обьект
		req.onreadystatechange = processReqChange; // событие, которое вызывается при изменении состояния обьекта
		req.open("GET", url, true); // настройка оьбекта (куда каким способом будет отправлено)
		req.send(null); // отправка , null -  данные передаваемые через POST
		}
	else{
		//джля IE
		req = new ActiveXObject("Microsoft.XMLHTTP");
		req.onreadystatechange = processReqChange; 
		req.open("GET", url, true); 
		req.send(null); 
	}
}		

		

		function processReqChange(){
			// вызвана когда буджет получен ответ (изм. состояние)
			if (req.readyState == 4) {
				//свойтво состояния обьекта (0-4) 4 - запрос выполнен и все данные получены
				// console.log(req.responseText); полученый ответ
				if (window.XMLHttpRequest) {
					showBooks(req.responseXML); //ответ в виде XML !!!!
				}
				else{
					showBooks(req.responseXML.documentElement)
				}
			}
		}
		function showBooks(xmlDoc){
			//получает документ xml  и выводит таблицу
			var books = xmlDoc.getElementsByTagName('book');
			var str = '<thead><tr><th>Наименование</th><th>Категория</th><th>Тема</th><th>Цена</th></tr></thead>';
			for (var i = books.length - 1; i >= 0; i--) {
				var book = books.item(i) //не во всех браузерах работают [i]
				var name = book.getElementsByTagName('name').item(0).innerHTML;
				var category = book.getElementsByTagName('category').item(0).innerHTML;
				var theme = book.getElementsByTagName('theme').item(0).innerHTML;
				var price = book.getElementsByTagName('price').item(0).innerHTML;
				str+="<tr><td>"+name+"</td>"+"<td>"+category+"</td>"+"<td>"+theme+"</td>"+"<td>"+price+"</td></tr>";
			}
			
			elem('table').innerHTML = str;
		}

(function ($){
	$(function(){

	function get_data(){	
		var price = $( "#amount" ).val();
		var category = $("#category  option:selected").val();
		var theme = $("#theme  option:selected").val();
		loadXML('resources/selects.php', "price="+price+"&"+"theme="+theme+"&"+"category="+category);
	}

	function ajax(url, dest){
			var that = this
				that.old_select = $(dest)
			if(dest == '#category')
				var info = $("#theme  option:selected").val();
				var selected = $("#category  option:selected").val();
			if(dest == '#theme')
				var info = $("#category  option:selected").val();
				var selected = $("#theme  option:selected").val();

			$.ajax({
				method: "GET",
				url: "resources/"+url,
				
				 data:{ data : info},
				dataType:"text",
				success: function(data){
					that.old_select.html('');
			  		var mas = data.split(',');
			  		if(dest == '#category'){
				  		$('<option/>', {
								val: '',
								text: 'Выберите категорию'
							}).appendTo(that.old_select);
				  }
		  			if(dest == '#theme'){
				  		$('<option/>', {
								val: '',
								text: 'Выберите тему'
							}).appendTo(that.old_select);
				  	}
			  		
			  		$.each( mas, function() {
						$('<option/>', {
							val: this,
							text: this
						}).appendTo(that.old_select);
    				})
    				/*console.log(info);
    				that.old_select.val(selected);
    				$('option[value="'+selected+'"]', that.old_select).attr('selected', 'selected');*/
  			  	}
			})
		}	



		//первичная загрузка//
		get_data();
		var sel_t = new ajax('options2.php','#theme');
		var sel_c = new ajax('options.php','#category');



		//агрузка по селекту
		$('#category').change(function(){
			get_data();
			var sel_t = new ajax('options2.php','#theme');
		})
		$('#theme').change(function(){
			get_data();
			var sel_c = new ajax('options.php','#category');
		})


		//загрузка по слайдеру
		$('#slider-range span').click(function(){
			get_data();
		});

	
	})
}) (jQuery)


			/*loadXML('resources/selects.php', "price="+price+"&"+"theme="+theme+"&"+"category="+category);*/
/*			$('#category .dropdown-toggle').click(function(){
				alert('dfgd');
			})
		$('#category li').click(function(){
			alert('hfg');
			var category = $(this).$('.text').val();
			console.log(category);
		})
		$('#theme a').click(function(){
			var theme = $(this).$('.text').val();
		})

		$('span').click(function(){
			alert();
		})

*/
