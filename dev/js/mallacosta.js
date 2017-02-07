$(function () {

});

$( window ).resize(function() {
  if($(window).width()<768){
    $('#navigation').addClass('nav-justified');
    $('#navigation li > a > span ').addClass('smlts');
  }else{
    $('#navigation').removeClass('nav-justified');
    $('#navigation li > a > span ').removeClass('smlts');
  }
  console.log($(window).width());
  //$( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
});
