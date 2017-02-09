$( window ).resize(function() {
  if($(window).width()<768){
    $('#navigation').addClass('nav-justified');
    $('#navigation li > a > span ').addClass('smlts');
  }else{
    $('#navigation').removeClass('nav-justified');
    $('#navigation li > a > span ').removeClass('smlts');
  }
});

$(function () {
  ///Mustache template

  $.getJSON('../data/productos.json', function(data) {
    console.log(data);
    var prd={};
    prd.productos=data;
    //productos card.
    var plantilla=$('#productCardTlp').html();
    var template=Handlebars.compile(plantilla);
    var html=template(prd);
    $("#prodcutosCard .row").append(html);
    $("#prodcutosCard .row").show();

    //productos Modal
    var pltModal=$('#productModalTlp').html();
    var templateModal=Handlebars.compile(pltModal);
    var htmlModal=templateModal(prd);
    $("#modalArea").append(htmlModal);
  //  $("#modalAreatt").show();
  });
  // $.getJSON('../data/productos.json', function(data) {
  //   var templateProductos = $('#productCardTlp').html();
  //   var htmlProductos = Mustache.to_html(templateProductos, data);
  //  #prodcutosCard').html(htmlProductos);
  // });

});
