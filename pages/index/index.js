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
    ]
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
  }
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
