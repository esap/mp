// import Fly from "flyio/dist/npm/wx.js";

// export function fly() {
//   let fly = new Fly; //创建fly实例
//   //添加请求拦截器
//   fly.interceptors.request.use((config,promise)=>{
//       //给所有请求添加自定义header
//       config.headers["Authorization"]='Bearer ' + wx.getStorageSync('esap_token');
//       //可以通过promise.reject／resolve直接中止请求
//       //promise.resolve("fake data")
//       return config;
//   })

//   return fly
// }

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn()
            _lastTime = _nowTime
        }
    }
}

