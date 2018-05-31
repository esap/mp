> 用 vue 写小程序，使用 mpvue 框架重写 esap-miniapp。

### 开发预览

``` bash
1. git clone
git clone https://github.com/esap/mp.git

2. 安装依赖
npm install (cnpm install)

3. 启动程序
npm run dev

4. 预览
打开微信开发者工具，新建项目，将目录指向 /dist 即可

```
### 效果

![mpvue-weui-demo01](https://github.com/KuangPF/mpvue-weui/blob/master/static/demo/mpvue-weui-demo01.png)
![mpvue-weui-demo02](https://github.com/KuangPF/mpvue-weui/blob/master/static/demo/mpvue-weui-demo02.png)
![mpvue-weui-demo03](https://github.com/KuangPF/mpvue-weui/blob/master/static/demo/mpvue-weui-demo03.png)
![mpvue-weui-demo01](https://github.com/KuangPF/mpvue-weui/blob/master/static/demo/mpvue-weui-demo04.png)

### 重写状态


<details>
<summary>点击展开重写状态</summary>

#### 表单
- [x] Button
- [x] Input
- [x] List
- [x] Slider
- [x] Uploader

#### 基础组件
- [x] Article
- [x] Badge
- [x] Flex
- [x] Footer
- [x] Gallery
- [x] Grid
- [x] Icons
- [x] Loadmore
- [x] Panel
- [x] Preview
- [x] Progress
- [x] Swiper

#### 操作反馈
- [x] Actionsheet
- [x] Dialog
- [x] Msg
- [x] Picker
- [x] Toast

#### 导航相关
- [x] Navbar
- [x] Tabbar

#### 搜索相关
- [x] Searchbar
</details>

### 版本日志

#### v1.0.3
* 基于 `mpvue 1.0.9`
* 增加网络请求实例

#### v1.0.2
* 基于 `mpvue 1.0.7`
* `uploader`组件增加删除功能

#### v1.0.1
* 基于 `mpvue 1.0.7`
* 增加`swiper`组件

#### v1.0.0
* 基于 `mpvue 1.0.5`
* 完成 `WeUI` 重写和文档编写

### 结束语
花了大概一周多的时间来完成了这个项目，过程中收获还是很大的，给我最大的感触就是现在技术发展的很快，如果不学习就真的要落后了。美团开源的[mpvue](https://github.com/Meituan-Dianping/mpvue)是一个非常不错的框架，而且开发者也正在快速的迭代，开发新的功能，所以它的前景是非常值得期待。另外就是非常感谢关注这个仓库的人，谢谢你们的支持，后续我也会继续维护这个仓库，当`mpvue`有了一些新的特性或者一些新的语法的时候也会持续更新。如果各位大佬发现了什么问题欢迎`PR` 或者 `Issues`。

文档是用 [docsify](https://github.com/QingWei-Li/docsify/)构建，所有文档文件在 `/docs` 目录下面，由于里面图片比较多而且还有`gif`，可能在`git clone`的时候会有一点点慢。

### 持续维护...
