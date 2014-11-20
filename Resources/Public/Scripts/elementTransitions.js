

var PageTransitions = (function() {
/*
  elementTransitions.js

*/

	'use strict';
  var startElement = 0,
  animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };

  function getTransitionPrefix() {
	  
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'animation';
    if(typeof s[p] == 'string')

      return 'animation';

    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for( var i=0; i<v.length; i++ ) {
      if(typeof s[v[i] + p] == 'string')
        return v[i] + p;
    }
    return 'msAnimation';
  }

var animEndEventName = animEndEventNames[getTransitionPrefix()];

  function init() {
    jQuery(".et-page").each(function() {
      jQuery(this).data('originalClassList', jQuery(this).attr('class'));
    });

    jQuery(".et-wrapper").each(function() {

      	jQuery(this).data('current', 0);
      	jQuery(this).data('isAnimating', false);
      	jQuery(this).children(".et-page").eq(startElement).addClass('et-page-current');
		jQuery("button.et-rotate",this).click(function() {
			animate($(this));
	
		});
	});

	jQuery(':NOT(button).et-wrapper.et-rotate').hover(function(e) {
		e.stopPropagation();
		   nextPage($(this).closest('.et-wrapper'), $(this).attr('data-out'), $(this).attr('data-in'));

		}
		,function(e){
		e.stopPropagation();
		    nextPage($(this).closest('.et-wrapper'), $(this).attr('data-out'), $(this).attr('data-in'));

		});
  }


  function animate(block, callback) {
    nextPage($(block).closest('.et-wrapper'),$(block).attr('data-out'), $(block).attr('data-in'), callback);
  }

  function nextPage(block, outClass, inClass, callback) {

    block = $(block);

	inClass = formatClass(inClass);
    outClass = formatClass(outClass);

    var current = block.data('current'),
        $pages = block.children('.et-page'),
        pagesCount = $pages.length,
        endCurrPage = false,
        endNextPage = false;


    if(block.data('isAnimating')) {
      return false;
    }

    block.data('isAnimating', true);
    var $currPage = $pages.eq(current);
    if(current < pagesCount - 1) {
      current++;
    }
    else {
      current = 0;
    }

    block.data('current', current);
    var $nextPage = $pages.eq(current).addClass('et-page-current');
	
	$($currPage).addClass(outClass).on(animEndEventName, function() {
																  
      $currPage.off(animEndEventName);
	  endCurrPage = true;

		if(endNextPage) {
			if(jQuery.isFunction(callback)) {
			  callback(block, $nextPage, $currPage);
			}
			onEndAnimation($currPage, $nextPage, block);
		  }
    });
	
    $nextPage.addClass(inClass).on(animEndEventName, function() {

      $nextPage.off(animEndEventName);
      endNextPage = true;

      if(endCurrPage) {
        onEndAnimation($currPage, $nextPage, block);
      }
    });

	if('MSAnimationEnd'==animEndEventName){
			endCurrPage = true;
			endNextPage = true;
			if(jQuery.isFunction(callback)) {
			
			  callback(block, $nextPage, $currPage);
			}
			onEndAnimation($currPage, $nextPage, block);
	}
}


  function onEndAnimation($outpage, $inpage, block) {
    resetPage($outpage, $inpage);
    block.data('isAnimating', false);
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data( 'originalClassList'));
    $inpage.attr('class', $inpage.data( 'originalClassList') + ' et-page-current');
  }

  function formatClass(str) {
    var classes = str.split(" "),output = "";

    for(var n=0; n<classes.length; n++){
      output += " pt-page-" + classes[n];
    }

    return output;

  }
  
  return {

    init : init,
    nextPage: nextPage,
    animate: animate
};

})();

jQuery(document).ready(function() {
//'use strict';
  PageTransitions.init();
});