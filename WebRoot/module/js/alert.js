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

  /**
   * [默认弹出框]
   * @param  {[type]} string 弹框标题
   * @return {[type]}        [description]
   */
  Chen.alert = function(string, time) {
    var options = {
      title: '操作成功',
      type: 'success',
      confirmButtonText: '确定'
    };
    options.title = string;
    options.timer = time;
    swal(options);
  }

  Chen.confirm = function() {
    return new Promise((resolve, reject) => {
      swal({
        title: "确定删除？",
        text: "你将不能恢复所删除的内容！！！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm){
        resolve(isConfirm);
      });
    });
  }

  window.chen = Chen;
}(window, document));
