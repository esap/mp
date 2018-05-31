<template>
  <div class="page">
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="s" :focus="inputShowed" @input="getData2" />
          <div class="weui-icon-clear" v-if="s.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <div class="weui-search-bar__text">搜索</div>
        </label>
      </div>
      <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      <button size="mini" type="primary" @click="newGyk">+新建</button>
    </div>

    <div class="page__bd">
      <div class="weui-cells__title">工艺卡列表</div>
      <div class="weui-cells weui-cells_after-title">
        <navigator v-for="v in list" :key="ExcelServerRCID" :url=" '/pages/gykr/gykr?rcid='+v.ExcelServerRCID+''" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__hd">
            <div class="type-pink">{{v.mNo}}</div>
          </div>
          <div class="weui-cell__bd">{{v.goods}}
            <div class="lastRe">{{v.pType}}</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access iqty">{{v.cre + v.docNo}}</div>
        </navigator>      
      </div>
    </div>
  </div>
</template>

<script>
import Fly from "flyio/dist/npm/wx";
// import { fly } from '@/utils/index'
import { debounce } from "lodash";
// Use Vuex
import base64 from '../../../static/images/base64';
export default {
  data() {
    return {
      icon: '',
      list: [],
      s: '',
      inputShowed: false,
    }
  },
  mounted() {
    this.icon = base64.icon20;
  },
  onShow() {
    this.getData()
  },
  methods: {
    getData2: debounce(function () {this.getData()}, 500),
    getData: function () {
      wx.showLoading({
        title: '加载中',
        mask: true
      })

      let fly = new Fly; //创建fly实例
      fly.interceptors.request.use((config,promise)=>{
          config.headers["Authorization"]='Bearer ' + wx.getStorageSync('esap_token');
          return config;
      })
      fly.get('https://fabe.erp8.net/api/工艺卡列表?s='+this.s)
      .then(res => {
        this.list = res.data.data[0];
        wx.hideLoading()
      })
      .catch(error=> {
        console.log(error);
        wx.hideLoading()
      });
    },
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false;
    },
    clearInput() {
      this.s = '';
    },
    newGyk() {
      wx.navigateTo({
        url: '/pages/gykc/gykc'
      })
    }
  }
}

</script>
<style>

</style>
