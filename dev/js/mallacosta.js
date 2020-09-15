$(function () {
 /// template
  if($('#productCardTlp').length)
  {
    $.getJSON('../data/productos.json', function(data) 
    {
      var prd = {};
      prd.productos = data;
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

  }

  if($('#galleryItem').length){
    $.getJSON('../data/figurasMallasGalv.json', function(data) {
      var items={};
      items.mallaGalv=data;
      //Imagenes Malla ciclon
      var ptlItem=$("#galleryItem").html();
      var templateGalleryGalv=Handlebars.compile(ptlItem);
      var htmlGalleryGalv=templateGalleryGalv(items);
      $("#gallery").append(htmlGalleryGalv);
      $("#gallery").show();
    });
    
  }
  /*Handlebars.registerHelper('listFirstThree', function (context, options)
  {
    var ret = "", data;
    if (options.data) 
    {
      data = Handlebars.createFrame(options.data);
    }
    for (var i = 0, j = 3; i < j; i++)
    {
      if (data) 
      {
        data.index = i;
      }
      ret = ret + options.fn(context[i],{data:data});
    }
    return ret;
  });*/
  
  //json concertina
  if($('#imagesConcertinaTlp').length)
  {
    $.getJSON('../data/concertina.json', function(data) {
      var concertina={};
      concertina.imagenes=data;
      //productos card.
      var pltConcertina=$('#imagesConcertinaTlp').html();
      var templ=Handlebars.compile(pltConcertina);
      var html=templ(concertina);
      $("#imagesConcertina").append(html);
      $("#imagesConcertina").show();

    });
  }
  
  // Header
  
  if($('#header-container').length)
  {
    $.getJSON("../data/datosEmpresa.json", function(datosEmpresa){
      var source = datosEmpresa;
      $.ajax('./templates/header.hbs').done(function(data) 
      {
        var template = Handlebars.compile(data);
        var html_data = template(source);
        $("#header-container").append(html_data);
        $("#header-container").show();  
      
      });
    });
    
    
  }

  //footer
  if($('#footer-container').length)
  {
    $.getJSON("../data/datosEmpresa.json", function(datosEmpresa){
      var source = datosEmpresa;
      $.ajax('./templates/footer.hbs').done(function(data) 
      {
        var footer = Handlebars.compile(data);
        var html_data = footer(source);
        $("#footer-container").append(html_data);
        $("#footer-container").show();  
      });
    });
  }

  //CTA-footer
   if($('#cta-footer').length)
   {
     $.getJSON("../data/datosEmpresa.json", function(datosEmpresa){
       var source = datosEmpresa;
       $.ajax('./templates/cta-footer.hbs').done(function(data) 
       {
         var footer = Handlebars.compile(data);
         var html_data = footer(source);
         $("#cta-footer").append(html_data);
         $("#cta-footer").show();  
       });
     });
   }
 
  //Funcion menu active item
  Handlebars.registerHelper('isMenuActive', function (value) {
    if(typeof value === "object") {
      var active=false;
      $.each(value, function(index, itemValue) {
        if(itemValue.route === window.location.pathname){
          return active = true;
        } 
      }); 
      return (active) ? "active" : '';  
    } else {
      return (value === window.location.pathname) ? "active" : '';  
    }
  });
  //Function insObject
  Handlebars.registerHelper('ifObject', function(item, options) {
    if(typeof item === "object") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  //Function limpiar cadena 
  Handlebars.registerHelper('cleanTel', function(value){
    return value.replace(/\(([^)]*)\)/g,"$1").replace(/ /g,"");
  });
});