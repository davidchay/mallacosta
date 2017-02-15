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
    var prd={};
    prd.productos=data;
    //productos card.
    var plantilla=$('#productCardTlp').html();
    var template=Handlebars.compile(plantilla);
    var html=template(prd);
    $("#prodcutosCard").append(html);
    $("#prodcutosCard").show();

    //productos Modal
    var pltModal=$('#productModalTlp').html();
    var templateModal=Handlebars.compile(pltModal);
    var htmlModal=templateModal(prd);
    $("#modalArea").append(htmlModal);


  });
  $.getJSON('../data/figurasMallasGalv.json', function(data) {
    var items={};
    items.mallaGalv=data;
    console.log(data);
    //Imagenes Malla ciclon
    var ptlItem=$("#galleryItem").html();
    var templateGalleryGalv=Handlebars.compile(ptlItem);
    var htmlGalleryGalv=templateGalleryGalv(items);
    $("#gallery").append(htmlGalleryGalv);
    $("#gallery").show();
  });

  Handlebars.registerHelper('listFirstThree', function (context, options)
  {
    var ret = "", data;
    if (options.data) {
    data = Handlebars.createFrame(options.data);
  }
    for (var i = 0, j = 3; i < j; i++)
    {
    if (data) {
      data.index = i;
    }
      ret = ret + options.fn(context[i],{data:data});
    }
    return ret;
  });
});