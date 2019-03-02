<template>
    <transition name="slide">
        <div class="user" ref="user">
            <div class="back" @click="back">
                <i class="iconfont icon-tuihou"></i>
            </div>
            <div class="user-wrapper">
                <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
            </div>
            <div class="user-play">
                <i class="icon"></i >
                <h3>播放全部</h3><p>（共0首）</p>
            </div>
            <div class="list-wrapper" v-show="!isResult">
                <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex==0">
                    <div class="list-content">1111111111</div>
                </scroll>
                <scroll ref="playList" class="list-scroll" v-if="currentIndex==1">
                    <div class="list-content">2222222222</div>
                </scroll>
            </div>
            <div class="list-noresult" v-show="isResult">
                <p v-if="currentIndex==0">去寻找属于你自己最爱的MUSIC吧~</p>
                <p v-else>你还没有听过歌呀~</p>
            </div>
        </div>
    </transition>
</template>

<script>
import Switches from "../base/switches/switches.vue"
import scroll from "../base/scroll/scroll.vue"

export default {
    data(){
        return{
            currentIndex:0,
            switches:[{name:"我的收藏"},{name:"最近播放"}],
            isResult:true,
        }
    },
    created(){
        this.getResult();
    },
    methods:{
        searchlist(){
        },
        back(){
            this.$router.back();
        },
        switchItem (index) {
            this.currentIndex = index;
        },
        getResult(){
            if(this.$store.state.favoriteList.length>0){
                this.currentIndex=0;
                this.isResult=false;
            }else if(this.$store.state.playHistory.length>0){
                this.currentIndex=1;
                this.isResult=false;
            }else{
                 this.isResult=true;
            }
        }
    },
    computed:{
    },
    components:{
        Switches,
        scroll
    }
}
</script>

<style scoped>
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(-50%, 0, 0);
        opacity: 0;
    }
    .user{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 199;
        background: #f1f1f1;
    }
    .back{
        position: absolute;
        top:11px;
        left: 10px;
    }
    .user-wrapper{
        width: 100%;
        height:44px;
        background:#d44439;
        display: flex;
        align-items: center;
    }
    .user-play{
        position: relative;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #e4e4e4;
    }
    .icon{
        display: block;
        height: 44px;
        background: url("../common/image/play.png") 5% 45% no-repeat ;
        background-size: 5.8%;
    }
    .user-play h3{
        font-size: 16px;
        height: 44px;
        line-height: 44px;
        margin: 0px;
        position: absolute;
        top:0px;
        left: 45px;
    }
    .user-play p{
        position: absolute;
        margin: 0;
        top:0px;
        left: 110px;
        height: 44px;
        line-height: 44px;
    }
    .list-noresult{
        position: absolute;
        top: 88px;
        width: 100%;
        height: 100vh;
        background:url("../common/image/music.png") no-repeat 50% 30%;
        background-size: 20%;
    }
    .list-noresult p{
        width: 100%;
        text-align: center;
        position: absolute;
        font-size: 16px;
        top: 40%;
        color:#2e3030;
    }
</style>
