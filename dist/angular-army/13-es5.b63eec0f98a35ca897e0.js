function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var c=0;c<e.length;c++){var r=e[c];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,c){return e&&_defineProperties(t.prototype,e),c&&_defineProperties(t,c),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{IWY7:function(t,e,c){"use strict";c.r(e);var r=c("tyNb"),n=c("ofXK"),o=c("PSD3"),i=c.n(o),b=c("fXoL"),a=c("Zh8W");function s(t,e){if(1&t){var c=b.Sb();b.Rb(0,"tr"),b.Rb(1,"th"),b.wc(2),b.Qb(),b.Rb(3,"td"),b.wc(4),b.Qb(),b.Rb(5,"td"),b.wc(6),b.Qb(),b.Rb(7,"td"),b.wc(8),b.Qb(),b.Rb(9,"td"),b.Nb(10,"img",5),b.Qb(),b.Rb(11,"td"),b.wc(12),b.Qb(),b.Rb(13,"td"),b.Nb(14,"img",6),b.Qb(),b.Rb(15,"td"),b.Rb(16,"button",7),b.Zb("click",(function(){b.pc(c);var t=e.$implicit;return b.dc().delete(t._id)})),b.Nb(17,"i",8),b.Qb(),b.Qb(),b.Qb()}if(2&t){var r=e.$implicit;b.zb(2),b.xc(r.name),b.zb(2),b.xc(r.type),b.zb(2),b.xc(r.price),b.zb(2),b.xc(r.weight),b.zb(2),b.gc("src","https://meat-market.herokuapp.com/"+r.market[0].logo,b.rc),b.zb(2),b.xc(r.description),b.zb(2),b.gc("src","https://meat-market.herokuapp.com/"+r.image,b.rc)}}var l,u,d=((u=function(){function t(e,c){_classCallCheck(this,t),this.route=e,this.service=c}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;this.route.data.subscribe((function(e){t.AllProduct=e.AllProduct}))}},{key:"delete",value:function(t){var e=this;this.service.deleteProduct(t).subscribe((function(t){!0===t.sccess&&(i.a.fire({icon:"success",title:t.message}),e.service.getAllProduct().subscribe((function(t){e.AllProduct=t})))}))}}]),t}()).\u0275fac=function(t){return new(t||u)(b.Mb(r.a),b.Mb(a.a))},u.\u0275cmp=b.Gb({type:u,selectors:[["products-root"]],decls:22,vars:1,consts:[[1,"container"],[1,"table"],[1,"thead-dark"],["scope","col"],[4,"ngFor","ngForOf"],["alt","\u0627\u0644\u0645\u062a\u062c\u0631",3,"src"],["alt","\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062a\u062c",3,"src"],["type","button",1,"btn","btn-danger",3,"click"],[1,"fas","fa-trash"]],template:function(t,e){1&t&&(b.Rb(0,"body"),b.Rb(1,"div",0),b.Rb(2,"table",1),b.Rb(3,"thead",2),b.Rb(4,"tr"),b.Rb(5,"th",3),b.wc(6,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c"),b.Qb(),b.Rb(7,"th",3),b.wc(8,"\u0646\u0648\u0639 \u0627\u0644\u0645\u0646\u062a\u062c"),b.Qb(),b.Rb(9,"th",3),b.wc(10,"\u0627\u0644\u0633\u0639\u0631"),b.Qb(),b.Rb(11,"th",3),b.wc(12,"\u0627\u0644\u0648\u0632\u0646"),b.Qb(),b.Rb(13,"th",3),b.wc(14,"\u0627\u0644\u0645\u062a\u062c\u0631"),b.Qb(),b.Rb(15,"th",3),b.wc(16,"\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062a\u062c"),b.Qb(),b.Rb(17,"th",3),b.wc(18,"\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062a\u062c"),b.Qb(),b.Nb(19,"th"),b.Qb(),b.Qb(),b.Rb(20,"tbody"),b.uc(21,s,18,7,"tr",4),b.Qb(),b.Qb(),b.Qb(),b.Qb()),2&t&&(b.zb(21),b.gc("ngForOf",e.AllProduct))},directives:[n.h],styles:["body[_ngcontent-%COMP%]{background-color:#f8f9fa;direction:rtl;perspective:600px;text-align:right;overflow-y:hidden}table[_ngcontent-%COMP%]{margin:38px 0}img[_ngcontent-%COMP%]{width:60px}"]}),u),f=((l=function(){function t(e){_classCallCheck(this,t),this.productsService=e}return _createClass(t,[{key:"resolve",value:function(){return this.productsService.getAllProduct()}}]),t}()).\u0275fac=function(t){return new(t||l)(b.Vb(a.a))},l.\u0275prov=b.Ib({token:l,factory:l.\u0275fac}),l);c.d(e,"ProductsModule",(function(){return v}));var p,h=[{path:"",component:d,resolve:{AllProduct:f}}],v=((p=function t(){_classCallCheck(this,t)}).\u0275mod=b.Kb({type:p}),p.\u0275inj=b.Jb({factory:function(t){return new(t||p)},providers:[f],imports:[[n.b,r.f.forChild(h)]]}),p)}}]);