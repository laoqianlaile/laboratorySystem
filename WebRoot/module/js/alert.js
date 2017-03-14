;(function(window, document) {
  var w = window,
    doc = document;

  var Chen = function(selector) {
    return new Chen.prototype.init(selector);
  }

  Chen.prototype = {
    constructor: Chen,
    length: 0,
    splice: [].splice,
    selector: '',
    init: function(selector) { // dom选择的一些判断

    }
  }
  Chen.prototype.init.prototype = Chen.prototype;

  Chen.alert = function(string, type, time) {
    var options = {
      title: '操作成功',
      confirmButtonText: '确定'
    };
    options.title = string;

    options.type = type || 'success';
    if (time !== null && time !== undefined) {
      options.timer = time;
    }
    swal(options);
  }

  Chen.confirm = function(title, type) {
	title = title || '删除';
	type = type || 'warning';
    return new Promise((resolve, reject) => {
      swal({
        title: title,
        type: type,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
      },
      function(isConfirm){
        resolve(isConfirm);
      });
    });
  }

  window.chen = Chen;
}(window, document));
