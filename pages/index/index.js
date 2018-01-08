//index.js
//获取应用实例
const app = getApp()

var initData = 'this is first line!\nthis is second line!';
var extraLine = [];
var types = ['default', 'primary', 'warn'];

var pageObject = {
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconSize: [20, 30, 40, 50, 60, 70],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    text: initData,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px;color: red;',
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!',
      }],
    }],
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' }
    ],
    checkboxItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: true },
    ],
    radioItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: true },
    ],
    hidden: false,
    focus: false,
    inputValue: '',
  },
  checkboxChange: function(e) {
    var checked = e.detail.value;
    var changed = {};
    for(var i=0; i < this.data.checkboxItems.length; i++) {
      if(checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems['+i+'].checked'] = true;
      } else {
        changed['checkboxItems['+i+'].checked'] = false;
      }
    }
    this.setData(changed);
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    });
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    });
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    });
  },
  tap: function () {
    console.log('tap');
  },
  add: function (e) {
    extraLine.push('extra line');
    this.setData({
      text: initData + '\n' + extraLine.join('\n'),
    });
  },
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop();
      this.setData({
        text: initData + '\n' + extraLine.join('\n'),
      });
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  checkboxChange: function(e) {
    console.log('checkbox值发生变化，值为',e.detail.value);
  },
  formSubmit: function(e) {
    console.log('form发生了subimt事件，携带数据为', e.detail.value);
  },
  formReset: function(e) {
    console.log('form发生了reset事件');
  },
  bindButtonTab: function(e) {
    this.setData({
      focus: true,
    });
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
  bindReplaceInput: function(e) {
    var value = e.detail.value;
    var pos  = e.detail.cursor;
    if(pos != -1) {
      // 光标在中间
      var left = e.detail.value.slice(0, pos);
      // 计算光标的位置
      pos = left.replace(/11/g,'2').length;
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos,
    };

    // 或者直接返回字符串，光标在最后
    // return value.replace(/11/g, '2');
  },
};

for(var i = 0; i < types.length; ++i) {
  (function(type) {
    pageObject[type] = function(e) {
      var key = type + 'size';
      var changeData = {};
      changeData[key] = this.data[key] === 'default' ? 'mini' : 'default';
      this.setData(changeData);
    }
  })(types[i])
}

Page(pageObject);
