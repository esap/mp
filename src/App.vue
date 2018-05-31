<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
    
    // 登陆鉴权
    let wk = '', appname = 'xcx'
    let sysinfo = wx.getSystemInfoSync()
    if (sysinfo.environment) {
      wk = "wxwork"
      appname = "xcx2"
      wx.setStorageSync('esap_env', "wxwork")
    } 

    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: "https://fabe.erp8.net/getToken",
            data: {
              code: res.code,
              wxwork: wk,
              appname: appname
            },
            success: function(res) {
              console.log(res.data)
              wx.setStorageSync('esap_token', res.data.esap_token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
