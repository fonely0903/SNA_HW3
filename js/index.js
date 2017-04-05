$('.back-to-top').click(function(){
	$('body').animate({scrollTop:0},'slow');
})

$('.big-font').click(function(){
	$('h1').css('font-size','50px');
	$('h3').css('font-size','35px');
	$('section > p').css('font-size','1.35em');
	$('.ad > p').css('font-size','1.2em');
	$('a').css('font-size','1.35em');
})

$('.medium-font').click(function(){
	$('h1').css('font-size','36px');
	$('h3').css('font-size','24px');
	$('section > p').css('font-size','1em');
	$('.ad > p').css('font-size','0.875em');	
	$('a').css('font-size','1em');
})

$('.small-font').click(function(){
	$('h1').css('font-size','27px');
	$('h3').css('font-size','18px');
	$('section > p').css('font-size','0.75em');
	$('.ad > p').css('font-size','0.65625em');
})

