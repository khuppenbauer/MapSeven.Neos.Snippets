$(document).foundation();
$(window).load(function(){
		'use strict';
		$('.displaynone').hide();
		
		$('.slider1').fractionSlider({
		'fullWidth': 			false,
		'controls': 			true, 
		'pager': 				true,
		'responsive': 			true,
		'dimensions': 			"1200,795",
		'timeout' : 9999999,
		'speedIn' : 1500
		});

		$('.slider2').fractionSlider({
		'fullWidth': 			false,
		'controls': 			true, 
		'pager': 				true,
		'responsive': 			true,
		'dimensions': 			"1200,540",
		'timeout' : 9999999,
		'speedIn' : 1500
		});
		$('.slider3').fractionSlider({
		'fullWidth': 			false,
		'controls': 			true, 
		'pager': 				false,
		'responsive': 			true,
		'dimensions': 			"730,100",
		'timeout' : 9999999,
		'speedIn' : 400,
		'speedOut': 600
		});
});

// Center Any object
$(window).resize(function(){
		'use strict';
		$('.popup-gallery,#contact-modal').css({
	          position:'fixed',
	          left: ($(window).width() - $('.popup-gallery').outerWidth())/2,
	          top: ($(window).height() - $('.popup-gallery').outerHeight())/2
	     });

		$('#contact-modal').css({
	          position:'fixed',
	          left: ($(window).width() - $('#contact-modal').outerWidth())/2,
	          top: ($(window).height() - $('#contact-modal').outerHeight())/2
	     });

	     $('.bx-content h2').css({
	          position:'absolute',
	          left: ($(window).width() - $('.bx-content h2').outerWidth())/2,
	          top: ($(window).height() - $('.bx-content h2').outerHeight())/2
	     });
		 
		

});
			
$(window).resize();		

$(document).ready(function(){
	'use strict';					   
						   
	$('#contact').click(function(){return false;});

	// --- Menu Toggle ---
		$("button.btn-toggle").click(function () {
			 $("nav#mainnav").slideToggle("slow");
		});

		var $window = $(window);
	// --- Parallax ---
	    $('div[data-type="background"]').each(function(){
	        var $bgobj = $(this); // assigning the object
	     
	        $window.scroll(function() {
			var position=$bgobj.position();
	            	var yPos = -(($window.scrollTop() - position.top) / $bgobj.data('speed')); 
	             
	            // Put together our final background position
	            	var coords = '50% '+ yPos + 'px';
	 
	            // Move the background
	            	$bgobj.css({ backgroundPosition: coords });
	        }); 
	    });    

	    var sticky_navigation_offset_top = $('#mainnav').offset().top-55;
	    var sticky_navigation = function(){		
	        var scroll_top = $window.scrollTop();
	        if (scroll_top > sticky_navigation_offset_top) { 
	            $('#mainnav').css({ 'position': 'fixed', 'top':62, 'left':0, 'width':'100%' });
			$('.big_banner #mainnav .logo').fadeIn(500);
	        } else {
	            $('#mainnav').css({ 'position': 'relative','top':0 }); 
			$('.big_banner #mainnav .logo').fadeOut(500);
	        }   
	    };	    
	    sticky_navigation();

	    $window.scroll(function() {
	         sticky_navigation();
	    });
	// --- Equal Height --- //
	var equalHeight = function(){
	 var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0,currentDiv=0;	
	 $('.equal-h').each(function() {
	   $el = $(this);
	   $el.height('auto');
	   var topPostion = $el.position().top;	   
	   if (currentRowStart != topPostion) {	
	     // we just came to a new row.  Set all the heights on the completed row
	     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }	
	     // set the variables for the new row
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPostion;
	     currentTallest = $el.height();
	     rowDivs.push($el);	
	   } else {	
	     // another div on the current row.  Add it to the list and check if it's taller
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);	
	  }	  
	 });	
	
	  // do the last row
	for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	}
	
	}

	var initPortfolio = function(){
		
		var $winWidth=$(window).width(),$minHeight=500;
		
		if($winWidth > 700 ) $minHeight=1030;
		try{
			Grid.init({minHeight:$minHeight,speed:1000});
		}catch(err){}	
		
	}

	initPortfolio();
	equalHeight();
	$(window).resize(function(){
		 equalHeight();
		 tabFix();
	});
	// To initially run the function:
	

	function tabFix(){
		var $tab=$('.section-container');

		if($tab.parent().hasClass('widget')) {
			if($tab.parent().width() <= 300){
				$tab.attr('data-section','accordion').addClass('accordion').removeClass('tabs','auto');
				$('section',$tab).css('padding-top',0);
				$('section .title',$tab).outerWidth($tab.innerWidth());
			}
			else{
				$('section',$tab).css('padding-top',57);
				$('section .title',$tab).outerWidth(($tab.outerWidth()/$('section',$tab).length)+$tab.length);
				$tab.attr('data-section','tabs').addClass('tabs').removeClass('accordion');
			}
		} else {
			if($tab.parent().width() <= 300){
				$tab.attr('data-section','accordion').addClass('accordion').removeClass('tabs','auto');
				$('section',$tab).css('padding-top',0);
				$('section .title',$tab).outerWidth($tab.innerWidth());
			}
			else{
				$tab.attr('data-section','tabs').addClass('tabs').removeClass('accordion');
				$('section',$tab).css('padding-top',53);
				$('section .title',$tab).outerWidth('auto');
			}
		}
	}

	/*function tabFix(){
		
		var $tab=$('.widget .section-container');
		if($tab.parent().width() <= 300){
			$tab.attr('data-section','accordion').addClass('accordion').removeClass('tabs','auto');
			$('section',$tab).css('padding-top',0);
			$('section .title',$tab).outerWidth($tab.innerWidth());

		}
		else{
			$('section',$tab).css('padding-top',57);
			$('section .title',$tab).outerWidth(($tab.outerWidth()/$('section',$tab).length)+$tab.length);
			$tab.attr('data-section','tabs').addClass('tabs').removeClass('accordion');
		}
		
	}*/
	
	tabFix();

});

$('#dt-contact-form').submit(function(e){
	"use strict";
	e.preventDefault();
});

$('#dt-contact-form').on('valid', function() {
	"use strict";
	
	var thescript = $(this).attr('action');
	var thedata = $(this).serialize();
	
	$.ajax({
		type: "POST",
		url: thescript,
		data: thedata,
		success: function(){
			$('.success').fadeIn(1000);
		},
		error: function(){
			$('.fail').fadeIn(1000);
		}
	});
});

	
// --- Expanding Search ---
new UISearch( document.getElementById( 'sb-search' ) );
