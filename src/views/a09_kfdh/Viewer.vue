<template>
    <div id="viewer"></div>
</template>
  
<script>
import { Viewer } from 'photo-sphere-viewer'
import MarkersPlugins from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import 'photo-sphere-viewer/dist/plugins/markers.css'

export default {
    props: {
        init: Object
    },
    data() {
        return {
            viewer: 'Viewer', // Viewer 实例
            markersPlugin: null, // markersPlugin 实例
            longitude: '', // 目前经度
            latitude: '' // 目前纬度  
        }
    },
    mounted() {
        console.log(this.init, '11111111111111111');
        // this.$nextTick(()=>{
        this.initPhotoSphere(this.init);
        // })
    },
    methods: {
        initPhotoSphere: function (temp_img) {
            console.log(temp_img, '测试111111111111111');
            this.viewer = new Viewer({
                container: document.getElementById('viewer'),
                panorama: temp_img.imgurl,
                caption: temp_img.caption,//标题
                navbar: temp_img.navbar,
                defaultZoomLvl: 0,
                defaultLat: 0,//默认经纬度
                defaultLong: 0,//默认经纬度
                // defaultPosition:{long: 0, lat: 1},
                autorotateDelay: true,//设置是否自动旋转
                autorotateDelay: 1000,//1秒后启动自动旋转
                autorotateSpeed: 0.06,
                maxFov: 100,
                minFov: 60,
                // default_fov: 100, // 默认缩放值，在1-179之间
                // touchmoveTwoFingers: true,
                // 自定义导航下方导航栏
                // autorotate : 0,////切换自动旋转
                // zoomOut : 2,//放大
                // zoomRange : 0,//缩放滑块
                // zoomIn : 100,//缩小
                // zoom: zoomOut + zoomRange + zoomIn,
                // download : '',//下载源图像
                // caption : 0,//标题
                // fullscreen: 0,//切换全屏视图
                // navbar: false,// 隐藏
                // navbar: [
                //   'fullscreen',
                //   'autorotate',
                //   'download',
                //   'markers',
                //   {
                //     id: 'my-button', //按钮的唯一标识符，在使用该navbar.getButton()方法时很有用
                //     content: '查看', //必需的,按钮内容
                //     title: 'Hello world', //鼠标悬停在按钮上时显示工具提示
                //     className: 'custom-button', //CSS类已添加到按钮
                //     onClick: () => {
                //       alert('Hello from 查看 button') //必需的,单击按钮时调用的函数
                //     }
                //   }
                // ],
                size: {
                    width: '100%',
                    height: '100vh'
                },
                plugins: [
                    [
                        MarkersPlugins,
                        {
                            // 标记
                            markers: temp_img.marker
                        }
                    ]
                ]
            })

            // this.viewer.on('position-updated', function (po) {//位置更新事件
            //   console.log(`
            //   目前经纬度：
            //   longitude: ${po.args[0].longitude}
            //   latitude: ${po.args[0].latitude}
            //   `)
            // })
            // 点击事件 可获取到经纬度
            this.viewer.on('click', (e, data) => {
                console.log(e, data, '点击事件 可获取到经纬度');
                this.$emit('viewerClick', data)
            })

            this.markersPlugin = this.viewer.getPlugin(MarkersPlugins)

            // 标记点击事件 切换场景
            this.markersPlugin.on('select-marker', (e, marker) => {
                this.$emit('marker', marker)
            })
        },
        // 切换场景
        handelChangeViewer(imgUrl, marker = []) {
            console.log(imgUrl, marker, '切换场景传递过来的数据');
            this.viewer.setPanorama(imgUrl).then(() => {
                console.log('^^^^^^^^^^^^^^^^^^^^^^^^');
                console.log(this.viewer.getPosition(), 'ceshi 1111111111111111111111');
                this.viewer.rotate({ x: 2500, y: 1200 })

            },
            )
            this.viewer.animate({
                // longitude: 0,
                // latitude: 0,
                zoom: 10,
            })
                .then(() => {
                    console.log(marker, '要替换的地方');
                    this.$nextTick(() => {
                        this.markersPlugin.setMarkers(marker)
                    })
                })
        }
    }
}
</script>
  