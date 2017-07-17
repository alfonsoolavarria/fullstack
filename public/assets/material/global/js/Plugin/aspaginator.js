(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/aspaginator', ['exports', 'jquery', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Plugin);
    global.PluginAspaginator = mod.exports;
  }
})(this, function (exports, _jquery, _Plugin2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var NAME = 'paginator';

  var Paginator = function (_Plugin) {
    babelHelpers.inherits(Paginator, _Plugin);

    function Paginator() {
      babelHelpers.classCallCheck(this, Paginator);
      return babelHelpers.possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).apply(this, arguments));
    }

    babelHelpers.createClass(Paginator, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {
        if (!_jquery2.default.fn.asPaginator) {
          return;
        }

        var $el = this.$el,
            total = $el.data('total');

        $el.asPaginator(total, this.options);
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          namespace: 'pagination',
          currentPage: parseInt($("#pageN").val()),
          itemsPerPage: 10,
          disabledClass: 'disabled',
          activeClass: 'active',

          visibleNum: {
            0: 3,
            480: 5
          },

          tpl: function tpl() {
            return '{{prev}}{{lists}}{{next}}';
          },


          components: {
            prev: {
              tpl: function tpl() {
                return '<li onclick="prevC();" id="prevtPag" class="' + this.namespace + '-prev page-item"><a class="page-link" href="javascript:void(0)" aria-label="Prev"><span class="icon md-chevron-left"></span></a></li>';
              }
            },
            next: {
              tpl: function tpl() {
                return '<li onclick="nextC();" id="nextPag" class="' + this.namespace + '-next page-item next"><a class="page-link" href="javascript:void(0)" aria-label="Next"><span class="icon md-chevron-right"></span></a></li>';
              }
            },
            lists: {
              tpl: function tpl() {
                var user = $("#user").val()?$("#user").val():0;
                var lists = '',
                remainder = this.currentPage >= this.visible ? this.currentPage % this.visible : this.currentPage;
                remainder = remainder === 0 ? this.visible : remainder;

                if ($("#flagPaginator").val()==1) {

                  for (var k = 1; k < remainder; k++) {
                    lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/business/list?user='+user+'&page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';

                  }
                  for (var ii = 1; ii <= this.currentPage; ii++) {
                    if (this.currentPage==ii) {
                      lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/business/list?user='+user+'&page='+ii+'">'+ii+'</a></li>';
                    }
                  }
                  for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                    if (this.currentPage==i) {
                      lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/business/list?user='+user+'&page='+i+'">' + i + '</a></li>';
                      $(".next").attr("disabled");
                    }else {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/business/list?user='+user+'&page='+i+'">' + i + '</a></li>';
                    }
                  }

                }//endif1

                if ($("#flagPaginator").val()==2) {
                  var id = $("#Bid").val();
                  var bandera = $("#BidFlag").val();
                  if (bandera=='1') {
                    for (var k = 1; k < remainder; k++) {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/employee/'+id+'?page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';
                    }
                    for (var ii = 1; ii <= this.currentPage; ii++) {
                      if (this.currentPage==ii) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/employee/'+id+'?page='+ii+'">'+ii+'</a></li>';
                      }
                    }
                    for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                      if (this.currentPage==i) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/employee/'+id+'?page='+i+'">' + i + '</a></li>';
                        $(".next").attr("disabled");
                      }else {
                        lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/employee/'+id+'?page='+i+'">' + i + '</a></li>';
                      }
                    }
                  } else {
                    for (var k = 1; k < remainder; k++) {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/business/'+id+'/dashboard?type=employee&page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';
                    }
                    for (var ii = 1; ii <= this.currentPage; ii++) {
                      if (this.currentPage==ii) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/business/'+id+'/dashboard?type=employee&page='+ii+'">'+ii+'</a></li>';
                      }
                    }
                    for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                      if (this.currentPage==i) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=employee&page='+i+'">' + i + '</a></li>';
                        $(".next").attr("disabled");
                      }else {
                        lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=employee&page='+i+'">' + i + '</a></li>';
                      }
                    }
                  }

                }

                if ($("#flagPaginator").val()==3) {
                  var id = $("#Bid").val();
                  var bandera = $("#BidFlag").val();
                  if (bandera=='1') {
                    var id = $("#session").val();
                    for (var k = 1; k < remainder; k++) {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/service/'+id+'?page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';
                    }

                    for (var ii = 1; ii <= this.currentPage; ii++) {
                      if (this.currentPage==ii) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/service/'+id+'?page='+ii+'">'+ii+'</a></li>';
                      }
                    }

                    for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                      if (this.currentPage==i) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/service/'+id+'?page='+i+'">' + i + '</a></li>';
                        $(".next").attr("disabled");
                      }else {
                        lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/service/'+id+'?page='+i+'">' + i + '</a></li>';
                      }
                    }
                  }else {
                    for (var k = 1; k < remainder; k++) {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/business/'+id+'/dashboard?type=service&page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';
                    }

                    for (var ii = 1; ii <= this.currentPage; ii++) {
                      if (this.currentPage==ii) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/business/'+id+'/dashboard?type=service&page='+ii+'">'+ii+'</a></li>';
                      }
                    }

                    for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                      if (this.currentPage==i) {
                        lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=service&page='+i+'">' + i + '</a></li>';
                        $(".next").attr("disabled");
                      }else {
                        lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=service&page='+i+'">' + i + '</a></li>';
                      }
                    }
                  }//endelse

                }

                if ($("#flagPaginator").val()==4) {
                  var id = $("#Bid").val();
                  for (var k = 1; k < remainder; k++) {
                    lists += '<li class="' + this.namespace + '-items page-item" data-value="' + (this.currentPage - remainder + k) + '"><a class="page-link" href="/business/'+id+'/dashboard?type=client&page='+(this.currentPage - remainder + k)+'">' + (this.currentPage - remainder + k) + '</a></li>';
                  }

                  for (var ii = 1; ii <= this.currentPage; ii++) {
                    if (this.currentPage==ii) {
                      lists += '<li class="' + this.namespace + '-items page-item active" data-value="'+ii+'"><a class="page-link" href="/business/'+id+'/dashboard?type=client&page='+ii+'">'+ii+'</a></li>';
                    }
                  }

                  for (var i = this.currentPage + 1, limit = i + this.visible - remainder - 1 > this.totalPages ? this.totalPages : i + this.visible - remainder - 1; i <= limit; i++) {
                    if (this.currentPage==i) {
                      lists += '<li class="' + this.namespace + '-items page-item active" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=client&page='+i+'">' + i + '</a></li>';
                      $(".next").attr("disabled");
                    }else {
                      lists += '<li class="' + this.namespace + '-items page-item" data-value="' + i + '"><a class="page-link" href="/business/'+id+'/dashboard?type=client&page='+i+'">' + i + '</a></li>';
                    }
                  }

                }
                return lists;
              }
            }
          }
        };
      }
    }]);
    return Paginator;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, Paginator);

  exports.default = Paginator;
});
