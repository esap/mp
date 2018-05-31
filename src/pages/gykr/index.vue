<template>
  <div class="page">
      <div class="weui-cells__title">注塑工艺卡{{list.docNo}}</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="type-pink">{{list.mNo}}</div>
          </div>
          <div class="weui-cell__bd">{{list.goods}}
            <div class="lastRe">{{list.pType}}</div>
          </div>
          <div class="weui-cell__ft">{{list.color}}</div>
        </div>
        <div class="weui-cell">       
          <div class="weui-cell__bd">注塑机号</div>
          <div class="weui-cell__ft">{{list.zNo}}</div>
        </div>
        <div class="weui-cell">       
          <div class="weui-cell__bd">注塑周期(秒)</div>
          <div class="weui-cell__ft">{{list.zq}}</div>
        </div>
        <div class="weui-cell">       
          <div class="weui-cell__bd">注塑事项</div>
          <div class="weui-cell__ft">{{list.rem}}</div>
        </div>
        <movable-area style="width: 100%;" scale-area>
          <movable-view out-of-bounds style="height: 200px; width: 100%;" direction="all" scale scale-min="0.5" scale-max="4" scale-value="2">
            <image mode="aspectFit" :src="list.url"></image>
          </movable-view>
        </movable-area>
      </div>
  </div>
</template>

<script>
import Fly from "flyio/dist/npm/wx";
export default {
  data() {
    return {
      list: {},
      rcid: ''
    }
  },
  methods: {
    getNewsData: function () {
      wx.showLoading({
        title: '加载中',
        mask: true
      })

      let fly = new Fly; //创建fly实例
      //添加请求拦截器
      fly.interceptors.request.use((config,promise)=>{
          config.headers["Authorization"]='Bearer ' + wx.getStorageSync('esap_token');
          return config;
      })
      fly.get('https://fabe.erp8.net/api/工艺卡详情?rcid='+this.rcid)
      .then(res => {
        wx.hideLoading()
        this.list = res.data.data[0][0];
      })
      .catch(error=> {
        wx.hideLoading()
        console.log(error);
      });
    }
  },
  onLoad(opt){
    this.rcid = opt.rcid
    this.getNewsData()
  }
}
</script>

<style>

</style>
