$(function(){$("#productCardTlp").length&&$.getJSON("../data/productos.json",function(e){var a={};a.productos=e;var t=$("#productCardTlp").html(),n=Handlebars.compile(t)(a);$("#prodcutosCard").append(n),$("#prodcutosCard").show();var o=$("#productModalTlp").html(),r=Handlebars.compile(o)(a);$("#modalArea").append(r)}),$("#galleryItem").length&&$.getJSON("../data/figurasMallasGalv.json",function(e){var a={};a.mallaGalv=e;var t=$("#galleryItem").html(),n=Handlebars.compile(t)(a);$("#gallery").append(n),$("#gallery").show()}),$("#imagesConcertinaTlp").length&&$.getJSON("../data/concertina.json",function(e){var a={};a.imagenes=e;var t=$("#imagesConcertinaTlp").html(),n=Handlebars.compile(t)(a);$("#imagesConcertina").append(n),$("#imagesConcertina").show()}),$("#header-container").length&&$.getJSON("../data/datosEmpresa.json",function(e){var t=e;$.ajax("./templates/header.hbs").done(function(e){var a=Handlebars.compile(e)(t);$("#header-container").append(a),$("#header-container").show()})}),$("#footer-container").length&&$.getJSON("../data/datosEmpresa.json",function(e){var t=e;$.ajax("./templates/footer.hbs").done(function(e){var a=Handlebars.compile(e)(t);$("#footer-container").append(a),$("#footer-container").show()})}),$("#cta-footer").length&&$.getJSON("../data/datosEmpresa.json",function(e){var t=e;$.ajax("./templates/cta-footer.hbs").done(function(e){var a=Handlebars.compile(e)(t);$("#cta-footer").append(a),$("#cta-footer").show()})}),Handlebars.registerHelper("isMenuActive",function(e){if("object"!=typeof e)return e===window.location.pathname?"active":"";var t=!1;return $.each(e,function(e,a){if(a.route===window.location.pathname)return t=!0}),t?"active":""}),Handlebars.registerHelper("ifObject",function(e,a){return"object"==typeof e?a.fn(this):a.inverse(this)}),Handlebars.registerHelper("cleanTel",function(e){return e.replace(/\(([^)]*)\)/g,"$1").replace(/ /g,"")})});