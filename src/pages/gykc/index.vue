<template>
  <div class="page">   
      <div class="weui-cells weui-cells_after-title">      
        <div class="weui-cell weui-cell_select">
          <div class="weui-cell__hd weui-cell__hd_in-select-after">
            <div class="weui-label">模具号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="list.mjno" placeholder="请输入模具号" />
          </div>
        </div>
      </div>

      <div class="weui-cells__title">填报</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">注塑机号</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="bindMachinesChange" :range="machines">
              <div class="weui-select weui-select_in-select-after">{{machines[machineIndex]}}</div>
            </picker>
            <!-- <input class="weui-input" placeholder="选择注塑机号" /> -->
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">产品颜色</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="list.color" placeholder="请输入产品颜色" />
          </div>
          <div class="weui-cell__ft">
            <div class="weui-vcode-btn">搜索</div>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">材料型号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="list.mtype" placeholder="请输入材料型号" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">注塑周期</div>
          </div>
          <div class="weui-cell__bd">
            <input type="number" class="weui-input" v-model="list.duration" placeholder="请输入注塑周期" />
          </div>
        </div>  
      </div>
      <div class="weui-cells__title">注意事项</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" v-model="list.rem" placeholder="请输入注意事项" style="height: 3.3em" />
            <div class="weui-textarea-counter">0/200</div>
          </div>
        </div>
      </div>

      <div class="weui-cells__tips">拍照时请横向拍摄模具参数页面</div>

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <div class="weui-uploader__title">图片上传</div>
                <div class="weui-uploader__info">{{files.length}}/1</div>
              </div>
              <div class="weui-uploader__bd">
                <div class="weui-uploader__files" id="uploaderFiles">
                  <div v-for="(item ,index) in files" :key="index">
                    <div class="weui-uploader__file">
                      <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                      <div class="delete-icon" @click="deleteImg" :id="item"></div>
                    </div>
                  </div>                 
                </div>
                <div class="weui-uploader__input-box">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" :disabled="done" @click="saveData">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import Fly from "flyio/dist/npm/wx";
export default {
  data() {
    return {
      list: {upload: '', zsjno: ''},
      done: false,
      files: [],
      machines: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      machineIndex: 0,
    }
  },
  mounted() {
    this.list = {upload: '', zsjno: ''};
    this.done = false;
    this.files = [];
    this.machineIndex = 0;
  },
  methods: {
    saveData: function () {
      this.done=true
      wx.showLoading({
        title: '保存中',
        mask: true
      })

      let fly = new Fly; //创建fly实例
      fly.interceptors.request.use((config,promise)=>{
          config.headers["Authorization"]='Bearer ' + wx.getStorageSync('esap_token');
          return config;
      })
      this.list.zsjno = this.machines[this.machineIndex]
      fly.post('https://fabe.erp8.net/es/4708标准工艺卡', this.list)
      .then(res => {
        if (res.data.result){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });      
          setTimeout(() => { wx.navigateBack(); }, 2000)
        } else {
          wx.showToast({
            title: '提交失败' + res.data.errmsg,
            icon: 'cancel',
            duration: 3000
          });
          this.done=false
        }
        wx.hideLoading()
      })
      .catch(error=> {
        wx.hideLoading()
        this.done=false
        console.log(error);
      });
    },
    chooseImage(e) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          console.log('成功上传：' + tempFilePaths);
          wx.uploadFile({
            url: 'https://io.erp8.net/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'img',
            header:{ 'Authorization': 'Bearer ' + wx.getStorageSync('esap_token') },
            success: function(r) {
              let data1 = JSON.parse(r.data)
              _this.list['upload'] = data1.fileurl
              console.log('成功上传ESAP：' + data1.fileurl);
              //do something
            }
          });
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // _this.files[0] = res.tempFilePaths;
          _this.files = _this.files[0] = res.tempFilePaths;
        },
        fail: function() {
          console.log('fail');
        },
        complete: function() {
          console.log('commplete');
        }
      });
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    deleteImg(e) {
      Array.prototype.indexOf = function(val) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.files.remove(e.currentTarget.id);
    },


    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems, values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
    },
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.radioItems = radioItems;
    },
    switchChange(e) {
      console.log("switch发生change事件，携带value值为："+ e.mp.detail.value);
    },
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindTimeChange(e) {
      this.time = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    showTopTipsFun() {
      this.showTopTips = true;
      setTimeout(() => {
        this.showTopTips = false;
      }, 2000)
    },

    bindCountryChange(e) {
      this.countryIndex = e.mp.detail.value;
    },
    bindMachinesChange(e) {
      this.machineIndex = e.mp.detail.value;
    },
    bindAccountChange(e) {
      this.accountsIndex = e.mp.detail.value;
    },
    bindCountryCodeChange(e) {
      this.countryCodesIndex = e.mp.detail.value;
    },
    bindAgreeChange(e) {
      this.isAgree = !this.isAgree;
    }
  }
}
</script>

<style>
.weui-uploader__file {
  position: relative;
}
.weui-uploader__bd {
  overflow: visible;
}
.delete-icon {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  background: #f43530;
  right: 0;
  top: -20rpx;
  border-radius: 40rpx;
  z-index: 5;
}
.delete-icon::before {
  content: '';
  width: 26rpx;
  height: 4rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>
