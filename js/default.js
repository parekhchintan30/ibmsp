var delay = (function(){
var timer = 0;
return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})(); 
var odd = 0;
var total_print_documents = 0;
var total_barcodes_printed = 0;
var finished = true;
var selectedSubOrders = new Array;	
jQuery(function($) {

/* Initializing Accordion Menu */


var active_tab = $("#active_tab").val();
var active_tab1 = active_tab.split("-");
var currentTab = "tab"+ active_tab1[0];
$("#"+currentTab).addClass("selected");
$("#"+active_tab).css("background-color", "#333333");
if($('.left_accordion').length>0){
$('.left_accordion').navAccordion({
expandButtonText: '',  //Text inside of buttons can be HTML
collapseButtonText: ''
}, 
function(){
console.log('Callback')
});
}
/* End of accordion menu initalization */


var now = new Date();
var from = new Date();
var to = new Date();
var max = new Date();
var min = new Date();


max.setDate(max.getDate() + 1);
min.setDate(min.getDate() + 90);
from.setDate(max.getDate() - 7);
/*
$('#from').datetimepicker(
{
     defaultDate: from,
     maxDate:max,
     minDate:min
});
*/



$('.from-datetimepicker').datetimepicker(
{
     defaultDate: from
});
$('.to-datetimepicker').datetimepicker(
{
     defaultDate: to
});




$('#unstitched, #against_h_form').change(function() {
calculateTotal();
});



$('#discount_percentage').keyup(function() {
calculateTotal();
});

$('body').delegate('.barcode', 'change', function () {
calculateTotal();
});

$('body').delegate('.view_entries_table .options', 'click', function () {
    var id = $(this).closest('tr').data('id');

    if($(this).attr('data-edit'))
      document.location.href = $('#route_path').val()+'/'+id ;
    else
      document.location.href = $('#route_path').val()+'/'+id + '/edit';
  });


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
				//newRow += '<td contenteditable="true" class="other_website_price" data-linked="other_website_prices"></td>';
				newRow += '<td contenteditable="true" class="mrp"></td>';
              	// alert(newRow);
              	 $('.barcodeScanner table').append(newRow);
                 // alert(" Div End reached! "+$(this).offset().top);
                  //alert("Full DIV height: "+divend+" Scroll page Height: "+pagescroll); 
              }

    });


$(".orderScanner").scroll(function(){
		var divend = $(this)[0].scrollHeight 
        var pagescroll = $(this).scrollTop() + $(this).height(); 
		if(divend <= pagescroll)
              {
              	var newId = $('.orderScanner table tr:last').data('id') + 1;
              	var newRow = '<tr id="element-'+ newId +'" data-id="'+newId+'">';
              	newRow += '<td>'+newId+'</td>';
			   	newRow += '<td contenteditable="true" class="design"></td>';
				newRow += '<td contenteditable="true" class="color"></td>';
				newRow += '<td contenteditable="true" class="size"></td>';
				newRow += '<td contenteditable="true" class="quantity"></td>';
				newRow += '<td contenteditable="true" class="note"></td>';
              	$('.orderScanner table').append(newRow);
              }
    });
$(".inwardScanner").scroll(function(){
		var divend = $(this)[0].scrollHeight 
        var pagescroll = $(this).scrollTop() + $(this).height(); 
		if(divend <= pagescroll)
              {
              	var newId = $('.inwardScanner table tr:last').data('id') + 1;
              	var newRow = '<tr id="element-'+ newId +'" data-id="'+newId+'">';
              	newRow += '<td>'+newId+'</td>';
			   	newRow += '<td contenteditable="true" class="design"></td>';
				newRow += '<td contenteditable="true" class="color"></td>';
				newRow += '<td contenteditable="true" class="size"></td>';
				newRow += '<td contenteditable="true" class="quantity"></td>';
              	newRow += '<td contenteditable="true" class="billing_amount"></td>';
              	newRow += '<td contenteditable="true" class="total"></td>';
              	$('.inwardScanner table').append(newRow);
              }
});



});



function highlightIfEmpty(element){
	if(element.text() == "" || element.text() == null)
		{
			element.focus();
			//element.style("border-color:red")
			return false;
		}	
		else{
			return true;
		}
}

function highlightIfEmpty2(element){
	if(element.val() == "" || element.val() == null)
		{
			element.focus();
			//element.style("border-color:red")
			return false;
		}	
		else{
			return true;
		}
}

function calculateTotal(){
	var barcode = $("#element-1 .barcode").val();
	var i = 1;
	var sum = 0;
	var quantity = 0;
	while(barcode!="" && barcode!=null)
	{
		var mrp = $("#element-"+i+" .mrp").html();
		sum = sum + parseFloat(mrp);
		i++;	
		quantity++;
		barcode = $("#element-"+i+" .barcode").val();
	}
	$('#billing_amount').val(sum);
	$('#quantity').val(quantity);
	var total = parseFloat(sum).toFixed(2); 
	if($('#ethnicity_percentage').length){
		var ethnicity_percentage = $("#ethnicity_percentage").val();
		var ethnicity_amount = parseFloat(sum * ethnicity_percentage / 100).toFixed(2);
		$("#ethnicity_amount").val(ethnicity_amount);
		total = parseFloat(sum) - parseFloat(ethnicity_amount);
	}

	var discount = 0;
		if ($('#discount_val').length && $('#discount_val').val() != "") {
                    discount = parseFloat($('#discount_val').val());
                    $('#discount').val(discount);
                    total = parseFloat(total) - parseFloat(discount);
        }    
        else if($('#discount_percentage').length && $('#discount_percentage').val()!=""){
		discount_percentage = $('#discount_percentage').val();
		discount = parseFloat((total*discount_percentage/100)).toFixed(2);
		$('#discount_percentage').val(discount_percentage);
		$('#discount_info').text("DISCOUNT - "+discount_percentage+"%")
		$('#discount').val(discount);
		total = parseFloat(total) - parseFloat(discount);
	}	
	var unstitched = $("#unstitched").val();
	var against_h_form = $("#against_h_form").val();
	if($("#unstitched").is(':checked') || $("#against_h_form").is(':checked')){
		//do not add any taxes
		$("#tax").val(0);
		$("#tax_type").val(null);
		$("#tax_percentage").val(null);
		$("#taxRow").hide();

	}else{
	if($('#vat').length && $('#vat').val()!=""){
	$("#tax_type").val("vat");
	$("#tax_percentage").val($('#vat').val());
	var vat = parseFloat($('#vat').val()).toFixed(2);
	var vatAmount = parseFloat((vat*total/100)).toFixed(2);
	$('#tax').val(vatAmount);
	total = parseFloat(total) + parseFloat(vatAmount);
	}

	if($('#cst').length && $('#cst').val()!=""){
	$("#tax_type").val("cst");
	$("#tax_percentage").val($('#cst').val());
	var cst = parseFloat($('#cst').val()).toFixed(2);

	var cstAmount = parseFloat((cst*total/100)).toFixed(2);
	$('#tax').val(cstAmount);
	total = parseFloat(total) + parseFloat(cstAmount);
	}
	}

	if($('#credit_amount').length && $('#credit_amount').val()!=""){
	var credit_amount = $('#credit_amount').val();
	//$('.shopping_bag_credit_amount').text(credit_amount);
	total = parseFloat(total) - parseFloat(credit_amount);
	//alert(total);
	}

	$('#total').val(total);
	

}

function reinitializeFields(){
	$("#barcodes").val("");
	$("#designs").val("");
   	$("#colors").val("");
	$("#sizes").val("");
	$("#billing_amounts").val("");
	$("#quantities").val("");
	$("#notes").val("");


}

function copySalesContent() {
	reinitializeFields();
	var barcode = $("#element-1 .barcode").val();
	calculateTotal();
	var i = 1;
	if(barcode == "" || barcode == null){
		$("#error-feedback").show().delay(5000).fadeOut();
		$("#error-feedback").html("You need to scan atleast one barcode to process your order");
		return false;
	} 
	while(barcode!="" && barcode!=null)
	{
		var design = $("#element-"+i+" .design");
		var color = $("#element-"+i+" .color");
		var size = $("#element-"+i+" .size");
		var mrp = $("#element-"+i+" .mrp");

		if(highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(mrp))
		{
			$("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
			$("#designs").val($("#designs").val()+ "" + design.text()+ ";");
   			$("#colors").val($("#colors").val()+  "" + color.text()+ ";");
		    $("#sizes").val($("#sizes").val()+  "" + size.text()+ ";");
		    $("#billing_amounts").val($("#billing_amounts").val()+ "" + mrp.text()+ ";");
		}
		else{
		$("#error-feedback").show().delay(5000).fadeOut();
		$("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
		return false;
		}		
		i++;	

		barcode = $("#element-"+i+" .barcode").val();
	}
	$("#quantity").val(i-1);
	return true;
}


function copyWorkersContent(){
	reinitializeFields();
	var design = $("#element-1 .design").text();
	var i = 1;
	if(design == "" || design == null){
		$("#error-feedback").show().delay(5000).fadeOut();
		$("#error-feedback").html("You need to insert atleast one design to proceed");
		return false;
	}

	while(design!="" && design!=null)
	{			
		var billing_amount = $("#element-"+i+" .billing_amount");
		if(highlightIfEmpty(billing_amount)){
		if($.isNumeric(billing_amount.text())){ 	
		$("#designs").val($("#designs").val() + "" + design + ";");
		$("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
		}else{
			$("#error-feedback").show().delay(5000).fadeOut();
			$("#error-feedback").html("Billing amount should be numeric on line "+i+ " to process");
			return false;
		}
		}
		else{
			$("#error-feedback").show().delay(5000).fadeOut();
			$("#error-feedback").html("Please add the billing amount on line "+i+ " to process");
			return false;
		}
		i++;	
		design = $("#element-"+i+" .design").text();
	}	
	return true;
}


function copyInwardsContent(){
	reinitializeFields();
	var design = $("#element-1 .design").text();
	var i = 1;
	if(design == "" || design == null){
		$("#error-feedback").show().delay(5000).fadeOut();
		$("#error-feedback").html("You need to insert atleast one design to proceed");
		return false;
	}
	while(design!="" && design!=null)
	{			
		var default_size_array = ["30","32","34","36","38","40","42","44","46","48","50","52","54","56","58","L","XL","XXL","M"];
		var color = $("#element-"+i+" .color");
		var size = $("#element-"+i+" .size");
		var quantity = $("#element-"+i+" .quantity");
		var billing_amount = $("#element-"+i+" .billing_amount");
		if(highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(billing_amount) && highlightIfEmpty(quantity)){
		if(default_size_array.indexOf(size.text()) < 0){
			$("#error-feedback").show().delay(5000).fadeOut();
			$("#error-feedback").html("Please fill in a valid size on line "+i+ " to process");
			return false;
		}
		$("#designs").val($("#designs").val() + "" + design + ";");
		$("#colors").val($("#colors").val() + "" + color.text() + ";");
		$("#sizes").val($("#sizes").val() + "" + size.text() + ";");
		$("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
		$("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
		}
		else{
			$("#error-feedback").show().delay(5000).fadeOut();
			$("#error-feedback").html("Please fill in all the details on line "+i+ " to process");
			return false;
		}
		i++;	
		design = $("#element-"+i+" .design").text();
	}	
	return true;
}

function copyOrdersContent(event){
	reinitializeFields();
	var design = $("#element-1 .design").text();
	if(design == "" || design == null){
		$("#designs-feedback").show().delay(5000).fadeOut();
		$("#designs-feedback").html("You need to select atleast one design to process your order");
		return false;
	} 
	var i = 1;
	while(design!="" && design!=null)
	{			
		var color = $("#element-"+i+" .color");
		var size = $("#element-"+i+" .size");
		var quantity = $("#element-"+i+" .quantity");
		var note = $("#element-"+i+" .note");
		if(highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(quantity)){
		$("#designs").val($("#designs").val() + "" + design + ";");
		$("#colors").val($("#colors").val() + "" + color.text() + ";");
		$("#sizes").val($("#sizes").val() + "" + size.text() + ";");
		$("#notes").val($("#notes").val() + "" + note.text() + ";");
		$("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
		}
		else{
			event.preventDefault();
			return false;
		}
		i++;	
		design = $("#element-"+i+" .design").text();
	}
	return true;	
}


 function printBarcodes() {
 	if(qz){
 		qz.findPrinter('TSC TTP-247');
 	}else{
 		qz = document.getElementById('qz');
 		qz.findPrinter('TSC TTP-247');
 	}

 	var date = new Date();
	var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth())+1) + "." + date.getFullYear();
	var   totalBarcodes = 0;
	var subTotal = 0;
	var print = print_array;
	qz.append("N\n");
	qz.append("q550\n");
	qz.append("Q303,26\n");
	qz.append('TDdd me y4\n'); 
	var c = 0;	
	$.each( print, function( key, value ) {
		pB(key,value,date_string);
		c++;
	});
  	if(odd){
  	//alert("Inside odd");	
     qz.append('\nP1,1\n');
     c++;
     odd = 0;
     // qz.append('END');
     total_print_documents++;
    // alert("appending odd");
  	}else{
  	//	alert("not appending");
  	}
	 // Mark the end of a label, in this case  P1 plus a newline character
	 // qz-printknows to look for this and treat this as the end of a "page"
	 // for better control of larger spooled jobs (i.e. 50+ labels)
	 qz.setEndOfDocument(",1\n");
	   
	 // The amount of labels to spool to the printer at a time. When
	 // qz-print counts this many `EndOfDocument`'s, a new print job will 
	 // automatically be spooled to the printer and counting will start
	 // over.
	 qz.setDocumentsPerSpool("10");  
	 //alert("Printing: "+c);  
	 //alert("Total Documents: "+total_print_documents);
	//alert("Total Barcodes: "+total_barcodes_printed);
	 
	var r = confirm("Are you sure you want to print "+total_barcodes_printed + " barcodes");
    if (r == true) {
       qz.print();
    }

	 total_print_documents = 0;   
	 total_barcodes_printed= 0; 
	 
//	 monitorPrinting(qz);
}

function pB(key, value, date_string){
		var quantity = value['quantity'];
	var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
 	var identifier= value['identifier'];
 	var category= value['category'];
    if(odd){
    qz.append('B325,20,0,1A,2,2,70,B,"'+key+'"\n');
    qz.append('A325,125,0,3,1,1,N,"DESIGNER '+category+'"\n');
    qz.append('A325,150,0,4,1,1,N,"'+design+'"\n');
    qz.append('A325,182,0,3,1,1,N,"'+color+'"\n');
    qz.append('A545,182,0,3,1,1,N,"'+size+'"\n');
 	qz.append('A325,205,0,3,1,1,N,"'+identifier+'"\n');
    qz.append('A325,230,0,3,1,1,N,"M.R.P. Rs. '+mrp+'"\n');
    qz.append('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
    qz.append('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: '+date_string+'"\n');
    qz.append('\nP1,1\n');
    total_barcodes_printed++;
    total_print_documents++;
    odd=0;
    quantity--;
    }
    if(quantity>0){
      var v = Math.floor(quantity/2);
      if(quantity % 2 == 0 || Math.floor(quantity/2)>0){ 
        var set = Math.floor(quantity/2);  
        var remaining = quantity % 2;
        qz.append('\nN\n');  
        qz.append('B0,20,0,1A,2,2,70,B,"'+key+'"\n');
        qz.append('B325,20,0,1A,2,2,70,B,"'+key+'"\n');

        qz.append('A0,125,0,3,1,1,N,"DESIGNER '+category+'"\n');
        qz.append('A325,125,0,3,1,1,N,"DESIGNER '+category+'"\n');
        
        qz.append('A0,150,0,4,1,1,N,"'+design+'"\n');
        qz.append('A325,150,0,4,1,1,N,"'+design+'"\n');
        
        qz.append('A0,182,0,3,1,1,N,"'+color+'"\n');
        qz.append('A325,182,0,3,1,1,N,"'+color+'"\n');

        qz.append('A190,182,0,3,1,1,N,"'+size+'"\n');
        qz.append('A545,182,0,3,1,1,N,"'+size+'"\n');

        qz.append('A0,205,0,3,1,1,N,"'+identifier+'"\n');
        qz.append('A325,205,0,3,1,1,N,"'+identifier+'"\n');

        qz.append('A0,230,0,3,1,1,N,"M.R.P. Rs. '+mrp+'"\n');
        qz.append('A325,230,0,3,1,1,N,"M.R.P. Rs. '+mrp+'"\n');

        qz.append('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        qz.append('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        
        qz.append('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: '+date_string+'"\n');
        qz.append('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: '+date_string+'"\n');
        qz.append('\nP'+set+',1\n');
        total_barcodes_printed += set*2;
        total_print_documents++;
      }

      
      if(remaining || Math.floor(quantity/2)==0  ){
        qz.append('\nN\n');  
        qz.append('B0,20,0,1A,2,2,70,B,"'+key+'"\n');
        qz.append('A0,125,0,3,1,1,N,"DESIGNER '+category+'"\n');
        qz.append('A0,150,0,4,1,1,N,"'+design+'"\n');
        qz.append('A0,182,0,3,1,1,N,"'+color+'"\n');
        qz.append('A190,182,0,3,1,1,N,"'+size+'"\n');
   		qz.append('A0,205,0,3,1,1,N,"'+identifier+'"\n');
    
        qz.append('A0,230,0,3,1,1,N,"M.R.P. Rs. '+mrp+'"\n');
        qz.append('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        qz.append('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: '+date_string+'"\n');

        
        total_barcodes_printed++;
        odd = 1;
        remaining = 0;
      }
    }
  	
}


function printBarcodes_tags() {
 	if(qz){
 		qz.findPrinter('Zebra');
 	}else{
 		qz = document.getElementById('qz');
 		qz.findPrinter('Zebra');
 	}
 	var date = new Date();
	var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth())+1) + "." + date.getFullYear();
	var totalBarcodes = 0;
	var subTotal = 0;
	var print = print_array;
	var c = 0;	
	$.each( print, function( key, value ) {
		pB_tags(key,value,date_string);
		c++;
	});
  	qz.setEndOfDocument("^XZ");
	qz.setDocumentsPerSpool("10");  
	var r = confirm("Are you sure you want to print "+total_barcodes_printed + " barcodes");
    if (r == true) {
       qz.print();
    }
     total_print_documents = 0;   
	 total_barcodes_printed= 0; 
}

function pB_tags(key, value, date_string){
	var quantity = value['quantity'];
	var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
 	var identifier= value['identifier'];
 	var category= value['category'];
 	var worker_id= value['worker_id'];
 	//var unique_code = "Vamas "+ category + "-" + design + "-" + color + "-" + size + "-" +worker_id;
 	for(i=0;i<quantity;i++){
 		qz.append('^XA^MCY^XZ'); 
		qz.append('^XA');  
		qz.append('^FX Top section with company logo, name and address.');
		qz.append('^CF0,60');
		qz.append('^BY2,2,80');
		qz.append('^FO45,60^BC^FD'+key+'^FS');
		qz.append('^FO10,165^GB300,3,3^FS');
		qz.append('^FX Second section with recipient address and permit information.');
		qz.append('^CFA,20'); 
		qz.append('^FO20,190^FDStyle - '+design+'^FS');
		qz.append('^FO20,220^FDColor - '+color+'^FS');
		qz.append('^FO20,250^FDSize -  '+size+'^FS');
		qz.append('^FO20,280^FDType - '+identifier+'^FS');
		qz.append('^FO20,310^FDQuantity - 1 PC^FS');
		qz.append('^FO20,340^FDMFD - '+date_string+'^FS');
		qz.append('^FO10,370^GB300,3,3^FS'); 
		qz.append('^FX Second section with recipient address and permit information.'); 
		qz.append('^CFA,40'); 
		qz.append('^FO20,390^FDMRP Rs.'+mrp+'/-^FS'); 
		qz.append('^CFA,13');
		qz.append('^FO80,430^FD(Inclusive of all taxes)^FS'); 
		qz.append('^FO10,440^GB300,3,3^FS'); 
		qz.append('^FX Fourth section (the two boxes on the bottom).'); 
		qz.append('^FO20,460^GB280,180,3^FS'); 
		qz.append('^CFA,15'); 
		qz.append('^FO30,470^FDVamas^FS');
		qz.append('^FO30,495^FD3,Jamuna Bhaiya Chawl,^FS');
		qz.append('^FO30,520^FDPestom Sagar Road No.3^FS');
		qz.append('^FO30,545^FDMumbai - 400089^FS');
		qz.append('^FO30,570^FDContact No:25253808^FS');
		qz.append('^FO30,595^FDEmail:support@vamas.in^FS');
		qz.append('^FO80,620^FDwww.vamas.in^FS');
		qz.append('^XZ');
        total_barcodes_printed++;
}
}

function monitorPrinting(qz) {
	if (qz != null) {
	   if (!qz.isDonePrinting()) {
	      window.setTimeout('monitorPrinting()', 100);
	   } else {
	      var e = qz.getException();
	      alert(e == null ? "Printed Successfully" : "Exception occured: " + e.getLocalizedMessage());
	   }
	} else {
          //  alert("Applet not loaded!");
        }
      }

function changeLocation(path){
	document.location.href = '../../'+path;
}

/*
* Used to manage the loaders 
*/
function changeLoaderText(text){
	//alert($("#loader_text").hmtl());
	$("#loader_text").html(text);
}
function ajaxindicatorstart(text)
{
  if(jQuery('body').find('#resultLoading').attr('id') != 'resultLoading'){
  jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="/images/ajax-loader.gif"><div id="loader_text">'+text+'</div></div><div class="bg"></div></div>');
  }else{
  	changeLoaderText(text);
  }
  jQuery('#resultLoading').css({
    'width':'100%',
    'height':'100%',
    'position':'fixed',
    'z-index':'10000000',
    'top':'0',
    'left':'0',
    'right':'0',
    'bottom':'0',
    'margin':'auto'
  });

  jQuery('#resultLoading .bg').css({
    'background':'#000000',
    'opacity':'0.7',
    'width':'100%',
    'height':'100%',
    'position':'absolute',
    'top':'0'
  });

  jQuery('#resultLoading>div:first').css({
    'width': '250px',
    'height':'75px',
    'text-align': 'center',
    'position': 'fixed',
    'top':'0',
    'left':'0',
    'right':'0',
    'bottom':'0',
    'margin':'auto',
    'font-size':'16px',
    'z-index':'10',
    'color':'#ffffff'

  });

    jQuery('#resultLoading .bg').height('100%');
       jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop()
{
    jQuery('#resultLoading .bg').height('100%');
       jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

function reload_page(){
	document.location.href = document.location.href;
}

function organizePagination(pages,page){
	if(pages > 1){
          var paginationRows = "";
          paginationRows += '<li><a href="#" data-page="previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>'; 
          if(pages>10)
            pages =10;
          for(i=1;i<pages;i++){
            if(i == page) 
              paginationRows += '<li class="active"><a href="#" data-page="'+i+'">'+i+'</a></li>';
            else
              paginationRows += '<li><a href="#" data-page="'+i+'">'+i+'</a></li>';
          }
          paginationRows += '<li><a href="#" data-page="next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
          $('.pagination:last').empty();
          $('.pagination:last').append(paginationRows);
          }
}

   // Gets the current url's path, such as http://site.com/example/dist/
function getPath() {
          var path = window.location.href;
          return path.substring(0, path.lastIndexOf("/")) + "/";
}

    function tableNavigate(e) {
    	var curr_tr_2 = $("#tblDataBodyN").find("tr.warning").first();
		if (e.keyCode == 40) { //down
            if (curr_tr_2.length == 0) {
                curr_tr_2 = $("#tblDataBodyN").find("tr").first();
            } else {
                curr_tr_2.removeClass("warning");
                curr_tr_2 = curr_tr_2.next("tr");
            }
            curr_tr_2.addClass("warning");
		  } else if (e.keyCode == 38) { //up
            if (curr_tr_2.length == 0) {
                curr_tr_2 = $("#tblDataBodyN").find("tr").last();
            } else {
                curr_tr_2.removeClass("warning");
                curr_tr_2 = curr_tr_2.prev("tr");
            }
            curr_tr_2.addClass("warning");
        } else if (e.keyCode == 13) { //enter
            $(curr_tr_2).click();
            return false;
        }
    }

