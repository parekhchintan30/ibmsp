jQuery(function($) {
/*
var active_tab = 0;

if($("#active_tab").length)
	active_tab = parseInt($("#active_tab").val());
$("#accordion").accordion({ active: active_tab });
*/
$(".barcodeScanner").scroll(function(){
		var divend = $(this)[0].scrollHeight //+ $(this).offset().top; // full height of div (from top and actual div height).
        var pagescroll = $(this).scrollTop() + $(this).height(); // Total page scrolled.
		if(divend <= pagescroll)
              {
              	var newId = $('.barcodeScanner table tr:last').data('id') + 1;
              	var newRow = '<tr id="element-'+ newId +'" data-id="'+newId+'">';
              	newRow += '<td>'+newId+'</td>';
			   	newRow += '<td style="width:150px"><input type="text" class="barcode" id="barcode-'+newId+'" autocomplete="off" value=""></td>';
              	newRow += '<td contenteditable="true" class="design"></td>';
				newRow += '<td contenteditable="true" class="color"></td>';
				newRow += '<td contenteditable="true" class="size"></td>';
			    //newRow += '<td contenteditable="true" class="manufacturing_price" data-linked="manufacturing_prices"></td>';
			    //newRow += '<td contenteditable="true" class="wholesale_price" data-linked="wholesale_prices"></td>';
				newRow += '<td contenteditable="true" class="other_website_price" data-linked="other_website_prices"></td>';
				newRow += '<td contenteditable="true" class="mrp"></td>';
              	// alert(newRow);
              	 $('.barcodeScanner table').append(newRow);
                 // alert(" Div End reached! "+$(this).offset().top);
                  //alert("Full DIV height: "+divend+" Scroll page Height: "+pagescroll); 
              }

    });





});



