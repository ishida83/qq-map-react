## 腾讯地图 react 实现

## 基本用法
在页面模块层，引入基础地图库

1. 引入 QQ 地图库   
  ```<script src="//map.qq.com/api/js?v=2.exp&key=[开发者个人密钥]"></script>```
2. 如果要使用热力图组件，需要而外引入热力图库   
  ```<script src="http://open.map.qq.com/apifiles/plugins/heatmap/heatmap.min.js"></script>```
### QMap

支持的 `options` ，除了地图官方默认支持的属性 [MapOptions](http://lbs.qq.com/javascript_v2/doc/mapoptions.html) 之外，额外支持

- center: { lat: number, lng: number } 地图中心点，经纬度规格为谷歌经纬度规格

```
<QMap center={center} style={{ height: '800px' }} zoom={zoom} events={{
   idle: map => this.handleMapIdle(map)
}}>

</QMap>
```