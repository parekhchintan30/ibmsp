var delay = (function() {
    var timer = 0;
    var total_pages = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
var odd = 0;
var total_print_documents = 0;
var total_barcodes_printed = 0;
var finished = true;
var allowedColors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var allowedSizes = ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "L", "XL", "XXL", "M", "S", "XS", "XXS", "XXXL", "4XL", "28", "FS", "14Y", "6Y", "8Y", "2Y", "4Y", "10Y", "12Y" , "NA"];



var selectedSubOrders = new Array;
jQuery(function($) {

    /* Initializing Accordion Menu */


    var active_tab = $("#active_tab").val();
    var active_tab1 = active_tab.split("-");
    var currentTab = "tab" + active_tab1[0];
    $("#" + currentTab).addClass("selected");
    $("#" + active_tab).css("background-color", "#333333");
    if ($('.left_accordion').length > 0) {
        $('.left_accordion').navAccordion({
                expandButtonText: '', //Text inside of buttons can be HTML
                collapseButtonText: ''
            },
            function() {
                console.log('Callback')
            });
    }
    /* End of accordion menu initalization */

    $('body').on('keypress', function(e) {
        if (e.which == 13)
            return false;
    });

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



    $('.from-datetimepicker').datetimepicker({
        defaultDate: from
    });
    $('.to-datetimepicker').datetimepicker({
        defaultDate: to
    });
    $('#billing_date').datetimepicker({
        defaultDate: to,
        maxDate: now
    });
    $('.return-datetimepicker').datetimepicker({
        defaultDate: to,
        minDate: to
    });

    $('#unstitched, #against_h_form').change(function() {

        if ($("#fabric_sale").val() == 1)
            calculateTotalFabric();
        else
            calculateTotal();


    });

    $('#discount_percentage').change(function() {
            calculateTotal();
    });

/*
    $('body').delegate('.barcodeScanner .barcode', 'change', function() {
            calculateTotal();
    });
*/
    $("body").delegate(".pagination a", "click", function() {
        var page = $(this).data('page');
        if (page == "disabled") {} else if (page == "previous") {
            var current_page = $(".active a").data('page');
            if (typeof current_page == "undefined" || current_page == "" || current_page == 0)
                current_page = 1;
            $(".active").toggleClass("active");
            current_page--;
            organizePagination(total_pages, current_page);
            updateContent();
        } else if (page == "next") {
            var current_page = $(".active a").data('page');
            if (typeof current_page == "undefined" || current_page == "" || current_page == 0)
                current_page = 1;
            $(".active").toggleClass("active");
            current_page++;
            organizePagination(total_pages, current_page);
            updateContent();
        } else {
            $(".active").toggleClass("active");
            $(this).closest("li").toggleClass("active");
            updateContent();
        }
    });


    $('body').delegate('.view_entries_table .options', 'click', function() {
        var id = $(this).closest('tr').data('id');

        if ($(this).attr('data-edit'))
            document.location.href = $('#route_path').val() + '/' + id;
        else
            document.location.href = $('#route_path').val() + '/' + id;
    });


    $(".barcodeScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight //+ $(this).offset().top; // full height of div (from top and actual div height).
        var pagescroll = $(this).scrollTop() + $(this).height(); // Total page scrolled.
        if (divend <= pagescroll) {
            var newId = $('.barcodeScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td style="width:150px"><input type="text" class="barcode barcode_field" id="barcode-' + newId + '" autocomplete="off" value=""></td>';
            newRow += '<td class="description"></td>';
            newRow += '<td style="width:150px"><input type="text" class="barcode quantity" id="quantity-' + newId + '" autocomplete="off" value=""></td>';
            newRow += '<td class="mrp"></td>';
            newRow += '<td class="discount_rate"></td>';
            newRow += '<td class="discount"></td>';
            newRow += '<td class="taxable_value"></td>';    
            newRow += '<td class="gst_rate"></td>';
            newRow += '<td class="sgst"></td>';
            newRow += '<td class="cgst"></td>';
            newRow += '<td class="igst"></td>';
            newRow += '<td class="total"></td>';
            newRow += '<td class="net"></td>';
            newRow += '<td class="original" style="display:none;"></td>';
            // alert(newRow);
            $('.barcodeScanner table').append(newRow);
            // alert(" Div End reached! "+$(this).offset().top);
            //alert("Full DIV height: "+divend+" Scroll page Height: "+pagescroll); 
        }

    });


    $(".orderScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight
        var pagescroll = $(this).scrollTop() + $(this).height();
        if (divend <= pagescroll) {
            var newId = $('.orderScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td contenteditable="true" class="design"></td>';
            newRow += '<td contenteditable="true" class="color"></td>';
            newRow += '<td contenteditable="true" class="size"></td>';
            newRow += '<td contenteditable="true" class="quantity"></td>';
            newRow += '<td contenteditable="true" class="note"></td>';
            $('.orderScanner table').append(newRow);
        }
    });
    $(".inwardScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight
        var pagescroll = $(this).scrollTop() + $(this).height();
        if (divend <= pagescroll) {
            var newId = $('.inwardScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
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



function highlightIfEmpty(element) {
    if (element.text() == "" || element.text() == null) {
        element.focus();
        //element.style("border-color:red")
        return false;
    } else {
        return true;
    }
}

function highlightIfEmpty2(element) {
    if (element.val() == "" || element.val() == null) {
        element.focus();
        //element.style("border-color:red")
        return false;
    } else {
        return true;
    }
}

function calculateTotalOld() {
    var barcode = $("#element-1 .barcode").val();
    var i = 1;
    var sum = 0;
    var quantity = 0;
    
    while (barcode != "" && barcode != null) {
        var mrp = $("#element-" + i + " .mrp").html();
        sum = sum + parseFloat(mrp);
        i++;
        quantity++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    if (isNaN(sum))
        sum = 0;


    $('#billing_amount').val(sum);
    $('#quantity').val(quantity);
    var total = parseFloat(sum).toFixed(2);
    total = parseFloat(total).toFixed(2);
    $('#total').val(total);
}


function calculateTotal() {
    var barcode = $("#element-1 .barcode").val();
    var i = 1;
    var sum = parseFloat(0);
    var taxable_value = 0;
    var cgst = 0;
    var sgst = 0;
    var discount = 0;
    var discount_rate = 0;
    var quantity = 0;
    var net = 0;
    var net_sum = 0;
    var discount_sum = 0;
    var sgst_sum = 0;
    var cgst_sum = 0;
    var igst_sum = 0;
    var quantity_sum = 0;
    var bill_sum = 0;
    var bill_amt ;
    var gst_type = $("#gst_type").val();
    var type_client = $("#type_client").val();
    var unstitched = $("#unstitched").val();
    var against_h_form = $("#against_h_form").val();
    while (barcode != "" && barcode != null) {
        mrp = parseFloat($("#element-" + i + " .mrp").data("val")).toFixed(2);
        quantity = parseFloat($("#element-" + i + " .quantity").val()).toFixed(2);
        bill_amt = mrp * quantity;
        discount_rate = $("#discount_percentage").val();
        discount = parseFloat(mrp * discount_rate / 100).toFixed(2);
        discount_amt = discount * quantity;
        var selling_rate = parseFloat(mrp) - parseFloat(discount);
        if(discount < 1)                                         
            discount_rate = parseFloat(0).toFixed(2);    
        if(type_client.toLowerCase() == "ethnicity"){
            var retail = parseFloat($("#element-" + i + " .mrp").data("retail")).toFixed(2);
            discount = parseFloat(retail * discount_rate / 100).toFixed(2);
            selling_rate = parseFloat(mrp) - parseFloat(discount);
            discount_amt = discount * quantity;
        }
        
            taxable_value = parseFloat(bill_amt - discount_amt).toFixed(2);
        if(unstitched == 1)
        {    
            if(gst_type == "S")       
                gst_rate = parseFloat(2.5).toFixed(2);
            else 
                gst_rate = parseFloat(5).toFixed(2);
        }else if(against_h_form == 1){
            if(gst_type == "S")       
                gst_rate = parseFloat(0.05).toFixed(2);
            else 
                gst_rate = parseFloat(0.1).toFixed(2);
        }
        else{
            if(gst_type == "S"){
            if(selling_rate <= 1000){
                gst_rate = parseFloat(2.5).toFixed(2);
                }
            else{
                gst_rate = parseFloat(6).toFixed(2);
                }
            }else{
                 if(selling_rate <= 1000)
                gst_rate = parseFloat(5).toFixed(2);
            else
                gst_rate = parseFloat(12).toFixed(2);
            }
        }
            sgst = cgst = igst = 0;
            if(gst_type == "S"){
            sgst = parseFloat(taxable_value * gst_rate / 100).toFixed(2);
            cgst = parseFloat(sgst).toFixed(2);
            total = (parseFloat(taxable_value) + parseFloat(sgst) + parseFloat(cgst)).toFixed(2);
            }else{
            igst = parseFloat(taxable_value * gst_rate / 100).toFixed(2);
            total = (parseFloat(taxable_value) + parseFloat(igst)).toFixed(2);
            }
            //quantity = parseFloat(1).toFixed(2);
            net = total;
            //alertt(net);
       
            $("#element-" + i + " .mrp").text(mrp);
            $("#element-" + i + " .discount_rate").text(discount_rate); 
            $("#element-" + i + " .discount").text(discount_amt);  
            $("#element-" + i + " .taxable_value").text(taxable_value);
            $("#element-" + i + " .gst_rate").text(gst_rate);
            $("#element-" + i + " .sgst").text(sgst);
            $("#element-" + i + " .cgst").text(cgst);
            $("#element-" + i + " .igst").text(igst);
            $("#element-" + i + " .total").text(total);
            $("#element-" + i + " .quantity").val(quantity);
            $("#element-" + i + " .net").text(net); 


        sum =  parseFloat(sum) + parseFloat($("#element-" + i + " .mrp").html());
        discount_sum = parseFloat(discount_sum) + parseFloat($("#element-" + i + " .discount").html());
        sgst_sum = parseFloat(sgst_sum) + parseFloat($("#element-" + i + " .sgst").html());
        igst_sum = parseFloat(igst_sum) + parseFloat($("#element-" + i + " .igst").html());
        cgst_sum = parseFloat(cgst_sum) + parseFloat($("#element-" + i + " .cgst").html());
        net_sum = parseFloat(net_sum) + parseFloat($("#element-" + i + " .net").html());
        quantity_sum = parseFloat(quantity_sum) + parseFloat($("#element-" + i + " .quantity").val());
        bill_sum = bill_sum + parseFloat(bill_amt);
        i++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    $('#billing_amount').val(bill_sum.toFixed(2));
    $('#quantity').val(quantity_sum.toFixed(2));
    $('#sgst').val(sgst_sum.toFixed(2));
    $('#cgst').val(cgst_sum.toFixed(2));
    $('#igst').val(igst_sum.toFixed(2));
    $('#discount').val(discount_sum.toFixed(2));
    $('#total').val(net_sum.toFixed(2));
    
}




function reinitializeFields() {
    $("#barcodes").val("");
    $("#designs").val("");
    $("#colors").val("");
    $("#sizes").val("");
    $("#billing_amounts").val("");
    $("#taxable_amounts").val("");
    $("#descriptions").val("");
    $("#gst_rates").val("");
     $("#sgst_amounts").val("");
    $("#cgst_amounts").val("");
    $("#igst_amounts").val("");

    $("#discount_amounts").val("");
    $("#totals").val("");

    $("#quantities").val("");
    $("#notes").val("");
    $("#old_barcodes").val("");
    $("#new_barcodes").val("");
    $("#old_skus").val("");
    $("#new_skus").val("");
}

function copySalesContentOld() {
    //alert("test");
    reinitializeFields();
    var barcode = $("#element-1 .barcode").val();

    calculateTotalOld();

    var i = 1;
    if (barcode == "" || barcode == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode != "" && barcode != null) {
        //alert(barcode);
        var design = $("#element-" + i + " .design");
        var color = $("#element-" + i + " .color");
        var fabric_sale = $("#fabric_sale").val();
        var size = 0;
        var quantity = 0;

        if (fabric_sale != 1)
            size = $("#element-" + i + " .size");
        else
            quantity = $("#element-" + i + " .quantity");
        var mrp = $("#element-" + i + " .mrp");



        if (fabric_sale != 1) {
            if (highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#designs").val($("#designs").val() + "" + design.text() + ";");
                $("#colors").val($("#colors").val() + "" + color.text() + ";");

                if (fabric_sale != 1)
                    $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
                else
                    $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");

                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        }

        if (fabric_sale != 0) {
            if (highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(quantity) && highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#designs").val($("#designs").val() + "" + design.text() + ";");
                $("#colors").val($("#colors").val() + "" + color.text() + ";");

                if (fabric_sale != 1)
                    $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
                else
                    $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");

                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        }


        //alert("In Loop : "+i)



        i++;

        //alert("Starting Loop : "+i);
        barcode = $("#element-" + i + " .barcode").val();
        //alert("Barcode: " + barcode);
    }
    //alert("Final Barcode: "+barcode);
    $("#quantity").val(i - 1);
    return true;
}

function copySalesContent() {
    reinitializeFields();
    var barcode = $("#element-1 .barcode").val();
    calculateTotal();
    var i = 1;
    if (barcode == "" || barcode == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode != "" && barcode != null) {
        var sgst = $("#element-" + i + " .sgst");
        var cgst = $("#element-" + i + " .cgst");
        var igst = $("#element-" + i + " .igst");
        var description = $("#element-" + i + " .description");
        var discount = $("#element-" + i + " .discount");
        var total = $("#element-" + i + " .net");
        var mrp = $("#element-" + i + " .mrp");
        var taxable_amount = $("#element-" + i + " .taxable_value");
        var gst_rate = $("#element-" + i + " .gst_rate");
        var quantity = $("#element-" + i + " .quantity");
            if (highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
                $("#taxable_amounts").val($("#taxable_amounts").val() + "" + taxable_amount.text() + ";");
                $("#descriptions").val($("#descriptions").val() + "" + description.text() + ";");
                
                $("#cgst_rates").val($("#cgst_rates").val() + "" + gst_rate.text() + ";");
                $("#sgst_rates").val($("#sgst_rates").val() + "" + gst_rate.text() + ";");
                $("#igst_rates").val($("#igst_rates").val() + "" + gst_rate.text() + ";");
                                   


                $("#sgst_amounts").val($("#sgst_amounts").val() + "" + sgst.text() + ";");
                $("#cgst_amounts").val($("#cgst_amounts").val() + "" + cgst.text() + ";");
                $("#igst_amounts").val($("#igst_amounts").val() + "" + igst.text() + ";");
                $("#discount_amounts").val($("#discount_amounts").val() + "" + discount.text() + ";");
                $("#quantities").val($("#quantities").val() + "" + quantity.val() + ";");
                $("#totals").val($("#totals").val() + "" + total.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        i++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    //$("#quantity").val(i - 1);
    return true;
}

function copyExciseSalesContent()
{

  reinitializeFields();

  alert("tests");

  var design = $("#element-1 .design").val();
 
  exciseTotal();

  var i = 1;
  if(design == "" || design == null){
    $("#error-feedback").show().delay(5000).fadeOut();
    $("#error-feedback").html("You need to scan atleast one barcode to process your order");
    return false;
  } 
  while(design!="" && design!=null)
  {
    var design = $("#element-"+i+" .design");
    var color = $("#element-"+i+" .color");
    var size = $("#element-"+i+" .size");
    var quantity = $("#element-"+i+" .quantity");
    var mrp = $("#element-"+i+" .mrp");
   // var excise_mrp_total = $("#element-" +i+ " .excise_total");
  

  // if(highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(mrp))
  //  {

      $("#designs").val($("#designs").val()+ "" + design+ ";");
      $("#colors").val($("#colors").val()+  "" + color.text()+ ";");
      $("#sizes").val($("#sizes").val()+  "" + size.text()+ ";");
      $("#quantities").val($("#quantities").val()+  "" + quantity.text()+ ";");
      $("#billing_amounts").val($("#billing_amounts").val()+ "" + mrp.text()+ ";");
     // $("#excisetotals").val($("#excisetotals").val() + "" + excise_mrp_total.val()+ ";");
  //  }

 /*   else{
    $("#error-feedback").show().delay(5000).fadeOut();
    $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
    return false;
    }*/

    i++;  
    design = $("#element-"+i+" .design").val();
  }

  return true; 
}


function copyDebitNotesContent() {
    //reinitializeFields all fields commented all fields getting empty;
    //$("#client").val("");
    //$("#amount").val("");
    //$("#date_received").val("");
    //$("#narration").val("");
    //$("#additional_description").val("");

    var client = $('#client').val();
    var amount = $('#amount').val();
    var date_received = $('#date_received').val();
    var narration = $('#narration').val();
    var additional_description = $('#additional_description').val();

    return true;
}

function copyAlterationsContent() {
    reinitializeFields();
    var barcode1 = $("#element-1 .barcode-1").val();
    var i = 1;
    if (barcode1 == "" || barcode1 == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode1 != "" && barcode1 != null) {
        var original_sku = $("#element-" + i + " .original_sku");
        var altered_sku = $("#element-" + i + " .altered_sku");
        var barcode2 = $("#element-" + i + " .barcode-2");
        if (highlightIfEmpty(original_sku) && highlightIfEmpty(altered_sku)) {
            $("#old_barcodes").val($("#old_barcodes").val() + "" + barcode1 + ";");
            $("#new_barcodes").val($("#new_barcodes").val() + "" + barcode2.val() + ";");
            $("#old_skus").val($("#old_skus").val() + "" + original_sku.text() + ";");
            $("#new_skus").val($("#new_skus").val() + "" + altered_sku.text() + ";");
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
            return false;
        }
        i++;

        barcode1 = $("#element-" + i + " .barcode-1").val();
    }
    return true;
}



function copyWorkersContent() {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    var i = 1;
    if (design == "" || design == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to insert atleast one design to proceed");
        return false;
    }

    while (design != "" && design != null) {
        var billing_amount = $("#element-" + i + " .billing_amount");
        if (highlightIfEmpty(billing_amount)) {
            if ($.isNumeric(billing_amount.text())) {
                $("#designs").val($("#designs").val() + "" + design + ";");
                $("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("Billing amount should be numeric on line " + i + " to process");
                return false;
            }
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("Please add the billing amount on line " + i + " to process");
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}


function copyInwardsContent() {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    var i = 1;
    if (design == "" || design == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to insert atleast one design to proceed");
        return false;
    }
    while (design != "" && design != null) {
        var barcode = $("#element-" + i + " .barcode");
        var color = $("#element-" + i + " .color");
        var size = $("#element-" + i + " .size");
        var quantity = $("#element-" + i + " .quantity");
        var billing_amount = $("#element-" + i + " .billing_amount");
        if (highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(billing_amount) && highlightIfEmpty(quantity)) {
            if (allowedSizes.indexOf(size.text()) < 0) {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("Please fill in a valid size on line " + i + " to process");
                return false;
            }
            $("#barcodes").val($("#barcodes").val() + "" + barcode.text() + ";");
            $("#designs").val($("#designs").val() + "" + design + ";");
            $("#colors").val($("#colors").val() + "" + color.text() + ";");
            $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
            $("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
            $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("Please fill in all the details on line " + i + " to process");
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}

function copyOrdersContent(event) {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    if (design == "" || design == null) {
        $("#designs-feedback").show().delay(5000).fadeOut();
        $("#designs-feedback").html("You need to select atleast one design to process your order");
        return false;
    }
    var i = 1;
    while (design != "" && design != null) {
        var color = $("#element-" + i + " .color");
        var size = $("#element-" + i + " .size");
        var quantity = $("#element-" + i + " .quantity");
        var note = $("#element-" + i + " .note");
        if (highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(quantity)) {
            $("#designs").val($("#designs").val() + "" + design + ";");
            $("#colors").val($("#colors").val() + "" + color.text() + ";");
            $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
            $("#notes").val($("#notes").val() + "" + note.text() + ";");
            $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
        } else {
            event.preventDefault();
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}

function printBarcodes() {

    if (qz) {
        qz.findPrinter('TSC TTP-247');
    } else {
        qz = document.getElementById('qz');
        qz.findPrinter('TSC TTP-247');
    }

    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    qz.append("N\n");
    qz.append("q550\n");
    qz.append("Q303,26\n");
    qz.append('TDdd me y4\n');
    var c = 0;
    $.each(print, function(key, value) {
        pB(key, value, date_string);
        c++;
    });
    if (odd) {
        //alert("Inside odd");  
        qz.append('\nP1,1\n');
        c++;
        odd = 0;
        // qz.append('END');
        total_print_documents++;
        // alert("appending odd");
    } else {
        //  alert("not appending");
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

    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
        qz.print();
    }

    total_print_documents = 0;
    total_barcodes_printed = 0;

    //   monitorPrinting(qz);
}

function pB(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var identifier = value['identifier'];
    var category = value['category'];
    if (odd) {
        qz.append('A425,40,0,4,1,1,N,"GUNJAN"\n');
        qz.append('A325,80,0,4,1,1,N,"STYLE: ' + design + '"\n');
        qz.append('A325,120,0,4,1,1,N,"SIZE: ' + size + '"\n');
        qz.append('A325,160,0,4,1,1,N,"COLOR: ' + color + '"\n');
        qz.append('A325,200,0,3,1,1,N,"ITEM: BLOUSES"\n');
        qz.append('A325,230,0,3,1,1,N,"IDENTIFIER: ' + identifier + '"\n');
        //qz.append('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
        qz.append('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        qz.append('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
        qz.append('\nP1,1\n');
        total_barcodes_printed++;
        total_print_documents++;
        odd = 0;
        quantity--;
    }
    if (quantity > 0) {
        var v = Math.floor(quantity / 2);
        if (quantity % 2 == 0 || Math.floor(quantity / 2) > 0) {
            var set = Math.floor(quantity / 2);
            var remaining = quantity % 2;
            qz.append('\nN\n');
            qz.append('A425,40,0,4,1,1,N,"GUNJAN"\n');
            qz.append('A100,40,0,4,1,1,N,"GUNJAN"\n');


            qz.append('A0,80,0,4,1,1,N,"STYLE: ' + design + '"\n');
            qz.append('A325,80,0,4,1,1,N,"STYLE: ' + design + '"\n');

            qz.append('A0,120,0,4,1,1,N,"SIZE: ' + size + '"\n');
            qz.append('A325,120,0,4,1,1,N,"SIZE: ' + size + '"\n');

            qz.append('A0,160,0,4,1,1,N,"COLOR: ' + color + '"\n');
            qz.append('A325,160,0,4,1,1,N,"COLOR: ' + color + '"\n');

            qz.append('A0,200,0,3,1,1,N,"ITEM: BLOUSES"\n');
            qz.append('A325,200,0,3,1,1,N,"ITEM: BLOUSES"\n');

            qz.append('A0,230,0,3,1,1,N,"IDENTIFIER: ' + identifier + '"\n');
            qz.append('A325,230,0,3,1,1,N,"IDENTIFIER: ' + identifier + '"\n');

            //qz.append('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            //qz.append('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');

            qz.append('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            qz.append('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');

            qz.append('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz.append('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz.append('\nP' + set + ',1\n');
            total_barcodes_printed += set * 2;
            total_print_documents++;
        }


        if (remaining || Math.floor(quantity / 2) == 0) {
            qz.append('\nN\n');
            qz.append('A100,40,0,4,1,1,N,"GUNJAN"\n');
            qz.append('A0,80,0,4,1,1,N,"STYLE: ' + design + '"\n');
            qz.append('A0,120,0,4,1,1,N,"SIZE: ' + size + '"\n');
            qz.append('A0,160,0,4,1,1,N,"COLOR: ' + color + '"\n');
            qz.append('A0,200,0,4,1,1,N,"ITEM: BLOUSES"\n');
            qz.append('A0,230,0,3,1,1,N,"IDENTIFIER: ' + identifier + '"\n');

            //qz.append('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            qz.append('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            qz.append('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');


            total_barcodes_printed++;
            odd = 1;
            remaining = 0;
        }
    }

}


function printBarcodes_tags() {
    if (qz) {
        qz.findPrinter('Zebra');
    } else {
        qz = document.getElementById('qz');
        qz.findPrinter('Zebra');
    }
    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    var c = 0;
    $.each(print, function(key, value) {
        pB_tags(key, value, date_string);
        c++;
    });
    qz.setEndOfDocument("^XZ");
    qz.setDocumentsPerSpool("10");
    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
        qz.print();
    }
    total_print_documents = 0;
    total_barcodes_printed = 0;
}

function pB_tags(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var identifier = value['identifier'];
    var category = value['category'];
    var worker_id = value['worker_id'];
    //var unique_code = "Vamas "+ category + "-" + design + "-" + color + "-" + size + "-" +worker_id;
    for (i = 0; i < quantity; i++) {
        qz.append('^XA^MCY^XZ');
        qz.append('^XA');
        qz.append('^FX Top section with company logo, name and address.');
        qz.append('^CF0,60');
        qz.append('^BY2,2,80');
        qz.append('^FO45,60^BC^FD' + key + '^FS');
        qz.append('^FO10,165^GB300,3,3^FS');
        qz.append('^FX Second section with recipient address and permit information.');
        qz.append('^CFA,20');
        qz.append('^FO20,190^FDStyle - ' + design + '^FS');
        qz.append('^FO20,220^FDColor - ' + color + '^FS');
        qz.append('^FO20,250^FDSize -  ' + size + '^FS');
        qz.append('^FO20,280^FDType - ' + identifier + '^FS');
        qz.append('^FO20,310^FDQuantity - 1 PC^FS');
        qz.append('^FO20,340^FDMFD - ' + date_string + '^FS');
        qz.append('^FO10,370^GB300,3,3^FS');
        qz.append('^FX Second section with recipient address and permit information.');
        qz.append('^CFA,40');
        qz.append('^FO20,390^FDMRP Rs.' + mrp + '/-^FS');
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
        qz.append('^FO30,570^FDContact No:25020792^FS');
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

function changeLocation(path) {
    document.location.href = '../../' + path;
}

/*
 * Used to manage the loaders 
 */
function changeLoaderText(text) {
    //alert($("#loader_text").hmtl());
    $("#loader_text").html(text);
}

function ajaxindicatorstart(text) {
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="/images/ajax-loader.gif"><div id="loader_text">' + text + '</div></div><div class="bg"></div></div>');
    } else {
        changeLoaderText(text);
    }
    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background': '#000000',
        'opacity': '0.7',
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height': '75px',
        'text-align': 'center',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto',
        'font-size': '16px',
        'z-index': '10',
        'color': '#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

function reload_page() {
    document.location.href = document.location.href;
}

function organizePagination(pages, page) {
    var count = $('#count option:selected').text();
    if (pages > 0) {
        var paginationRows = "";
        var current_page = page;
        var total_pages = pages;

        var current_first = page - (page % 5);
        var current_last = page + (5 - (page % 5));
        if (current_first < 1)
            current_first = 1;
        if (current_last > total_pages)
            current_last = total_pages;
        if (current_page > 1)
            paginationRows += '<li><a href="#" data-page="previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
        else
            paginationRows += '<li class="disabled"><a href="javascript:void(0)" data-page="disabled"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';

        for (i = current_first; i < current_last + 1; i++) {
            if (i == page)
                paginationRows += '<li class="active"><a href="#" data-page="' + i + '">' + i + '</a></li>';
            else
                paginationRows += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
        }
        if (current_page < total_pages)
            paginationRows += '<li><a href="javascript:void(0)" data-page="next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
        else
            paginationRows += '<li class="disabled"><a href="javascript:void(0)" data-page="disabled"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';

        //$('.pagination-message').html((current_first)+" to "+ (parseInt(current_first) + +count) + " of "+ (pages*count)  )
        $('.pagination:last').empty();
        $('.pagination:last').append(paginationRows);
    } else {
        $('.pagination:last').empty();
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