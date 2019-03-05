<template>
    <transition name="slider">
        <div class="singer-detail">
            <div class="back" @click="back">
                <i class="iconfont icon-tuihou"></i>
                <h3>歌手</h3>
            </div>
            <div class="cover">
                <img :src="imgUrl" alt="">
                <h1>{{name}}</h1>
            </div>
                <div class="details">
                    <div class="user-play">
                        <i class="icon"></i >
                        <h3>播放全部</h3><p>（共{{songlist.length}}首）</p>
                    </div>
                    <scroll ref="singer-details" class="singer-details">
                        <div class="fix">
                            <div class="details-item" v-for="(item,i) in songlist" :key="item.id" @click="getSongid(item)">
                                <p class="num">{{i+1}}</p>
                                <h2 class="song">{{item.name}}
                                <p class="des">{{item.alia.length>0?item.alia[0]:name}}</p></h2>
                            </div>
                        </div>
                    </scroll>
                </div>
        </div>
    </transition>
</template>

<script>
import Scroll from '../base/scroll/scroll'
import {toSinger} from '../api/singer.js'

export default {
    data(){
        return{
            songlist:[],
            imgUrl:"",
            name:"",
        }
    },
    created(){
        this._toSinger();
        
    },
    methods:{
        back(){
            this.$router.back();
        },
        getSongid(a){
            this.$bus.$emit("getSongs", a);
        },
        _toSinger(){
            var id=this.$route.params.id;
            toSinger(id).then((res)=>{
                this.imgUrl=res.data.artist.img1v1Url;
                this.name=res.data.artist.name;
                this.songlist=res.data.hotSongs;
                console.log(this.songlist);
            })
        }
    },
    components:{
        Scroll
    }
}
</script>

<style scoped>
    .slider-enter-active,.slider-leave-active{
        transition: all .3s;
    }
    .slider-enter,.slider-leave-to{
        transform: translate3d(50%, 0, 0);
        opacity: 0;
    }
    .singer-detail{
        position: fixed;
        top:0px;
        z-index: 399;
        width: 100%;
        height:100%;
        background: #f1f1f1;
    }
    .back{
        position: fixed;
        height: 44px;
        display: flex;
        align-items: center;
        z-index: 99;
    }
    .back i{
        margin-left: 10px;
    }
    .back h3{
        width: 50%;
        font-size: 16px;
        color: #fff;
        margin:0 10px;
    }   
    .cover{
        width: 100%;
        height: 42vh;
        position: relative;
        top: 0;
    }
    .cover img{
        width: 100%;
        position: absolute;
    }
    .cover h1{
        position: absolute;
        left: 20px;
        font-size: 19px;
        color: #fff;
        bottom: 10px;
    }
    .icon{
        display: block;
        height: 44px;
        background: url("../common/image/play.png") 5% 45% no-repeat ;
        background-size: 5%;
    }
    .singer-details{    
        height: 75vh;
        overflow: hidden;
    }
    .fix{
        height:3200px;
    }
    .details{
        position: relative;
        width: 100%;
        border-radius:15px 15px 0 0; 
        z-index: 99;
        background: #fff;
        padding-top: 41px;
    }
    .user-play{
        width: 100%;
        height: 40px;
        border-bottom:1px solid #e4e4e4; 
        position: fixed;
        top:42vh;
    }
    .user-play h3{
        position: absolute;
        top:0;
        margin: 0 10px 0 47px;
        font-weight:500; 
        line-height: 40px;
        font-size: 16px;
    }
    .user-play p{
        position: absolute;
        top:0;
        margin: 0 10px 0 112px;
        font-weight:500; 
        line-height: 40px;
        font-size: 16px;
    }
    .details-item{
        width:100%;
        height: 60px;
        border-bottom:1px solid #e4e4e4; 
        padding-left: 20px;
        position: relative;
    }
    .details-item .num{
        line-height: 60px;
    }
    .details-item .song{
        position: absolute;
        top: 5px;
        left: 45px;
        font-size: 16px;
    }
    .details-item .des{
        padding-top: 10px;
    }
</style>
