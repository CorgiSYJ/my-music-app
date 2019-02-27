<template>
    <div class="recommend" ref="recommend">
        <scroll class="recommend-content" ref="scroll" :data="playList"> 
            <div>
                <!--轮播背景-->
                <div v-show="banner.length" class="decorate"></div>
                <!--轮播-->
                <div class="recommend-swipe">
                    <mt-swipe :auto="2500">
                        <mt-swipe-item v-for="item in banner" :key="item.id">
                            <img :src="item.imageUrl">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <!--推荐歌单-->
                <div class="recommend-list">
                    <h1 class="title">推荐歌单</h1>
                    <ul>
                        <li class="item" v-for="item in playList" :key="item.id">
                            <div class="item-pic">
                                <div class="gradients"></div>
                                <img v-lazy="item.picUrl">
                            </div>
                            <!--播放数量-->
                            <p class="play-count">
                                <i class="iconfont icon-fa-headphones"></i>
                                {{Math.floor(item.playCount / 10000) }}万
                            </p>
                            <div class="item-text">
                                <p class="name">{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--推荐歌曲-->
                <div class="recommend-song">
                    <h1 class="title">推荐歌曲</h1>
                    <ul>
                        <li class="item" v-for="item in recommendMusic" :key="item.id">
                            <div class="item-pic">
                                <img v-lazy="item.picUrl">
                            </div>
                            <div class="item-text">
                                <p class="name">{{item.name}}</p>
                                <p class="singer">{{item.alg}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../base/scroll/scroll'
import {getBanner,getRecommendList,getRecommendMusic} from '../api/recommend.js'
import {ERR_OK} from '../common/js/config'


export default {
    data(){
        return{
            //轮播数组
            banner:[],
            //推荐歌单数组
            playList:[],
            //推荐歌曲数组
            recommendMusic:[]
        }
    },
    created(){
        this._getBanner()
        this._getRecommendList()
        this._getRecommendMusic()
        
    },
    methods: {
        handlePlaylist (playlist) {
            var bottom = this.playlist.length > 0 ? '60px' : ''
            this.$refs.recommend.style.bottom = bottom;
            this.$refs.scroll.refresh()
        },
        //异步请求api /banner 获取banner数组数据
        _getBanner(){
            getBanner().then((res)=>{
                if(res.status === ERR_OK){
                    var list = res.data.banners;
                    this.banner = list.splice(0,5);
                }else {
                    console.error('Banner 获取失败')
                }
            })
        },
        //异步请求api /personalized 获取推荐歌单数组数据
        _getRecommendList(){
            getRecommendList().then((res)=>{
                if(res.status === ERR_OK){
                    var list = res.data.result;
                    this.playList = list.splice(0,21);
                }else {
                    console.error('RecommendList 获取失败')
                }
            })
        },
        //异步请求api /personalized/newsong 获取推荐歌单数组数据
        _getRecommendMusic(){
            getRecommendMusic().then((res)=>{
                if(res.status === ERR_OK){
                    var list = res.data.result;
                    this.recommendMusic = list.splice(0,9);
                }else {
                    console.error('RecommendMusic 获取失败')
                }
            })
        },
        
    },
    components:{
        Scroll
    }
}
</script>

<style scoped>
    @import "../common/css/base.css";
    .recommend{
        position:fixed;
        width:100%;
        height:100%;
    }
    .recommend-content{
        position:absolute;
        height:88%;
    }
    .decorate{
        height:50vh;
        width:100%;
        background:#d44439;
        position:absolute;
        top:-30vh;
        z-index:-10;
    }
    .recommend-swipe{
        width: 96%;
        margin:0 auto;
        height:166px;
        border-radius:5px;
        overflow:hidden;
    }
    .recommend-swipe img{
        width:100%;
        height:100%
    }
    .title{
        height:55px;
        line-height:65px;
        padding-left:1.5%;
        font-size:14px;
    }
    .recommend-list,.recommend-song{
        width:100%;
    }
    ul{
        width:100%;
        height:100%;
    }
    .item,.item-pic{
        display:inline-block;
        position:relative;
        box-sizing:border-box;
        width:33%;
        padding:0 1%;
    }
    .item-pic{
        width:100%;
        margin-bottom:5px;
    }
    .item-pic img{
        width:100%;
        height:100%;
        border-radius:3px;
    }
    .gradients{
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play-count{
        display:block;
        width:90%;
        position:absolute;
        top:0px;
        text-align:right;
        font-size:10px;
        color:#f1f1f1;
    }
    .item-text{
        float:left;
        text-align:left;
        height:40px;
        line-height:16px;
        margin-bottom:10px;
    }
    .name{
        font-size:11px;
        color:#2e3030;
    }
</style>