function test(){
	alert ("Hello test")
	 jQuery('.mainNav').navAccordion({
                expandButtonText: '<i class="fa fa-plus"></i>',  //Text inside of buttons can be HTML
                collapseButtonText: '<i class="fa fa-"minus></i>'
            }, 
            function(){
                console.log('Callback')
            });
	 acc();
            
}