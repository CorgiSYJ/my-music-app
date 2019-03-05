<template>
    <div class="player" v-show="fullScreen">
        <div class="filter"></div>
        <img :src="imgUrl" class="bg">
        <transition name="normal">
            <div class="player-nor" v-show="fullScreen">
                <div class="nor-top">
                    <i class="icon" @click="back"></i>
                    <h1>{{name}}</h1>
                    <h2>{{des}}</h2>
                </div>
                <div class="nor-middle" @click="changeCD">
                    <div class="middle-l" v-show="isCD">
                        <div class="wrap-out">
                            <div class="wrap-in">
                                <img :src="imgUrl">
                            </div>
                        </div>
                    </div>
                    <div class="middle-r" v-show="!isCD">
                        <scroll class="lyric" ref="lyricList" :data="currentLyric && currentLyric.lines">
                            <div class="lyric-wrapper" >
                                <div class="current-lyric" v-if="currentLyric">
                                    <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines" :key="line.key">
                                    {{line.txt}}
                                    </p>
                                </div>
                            </div>
                        </scroll>
                    </div>
                </div>
                <div class="nor-bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                        <progress-bar :percent="percent"  @percentChangeEnd="percentChangeEnd" @percentChange="percentChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left" >
                            <i class="iconfont icon-xunhuan" @click="changeMode" :class="iconMode"></i>
                        </div>
                        <div class="icon i-left" >
                            <i class="iconfont icon-xiayishou-copy"></i>
                        </div>
                        <div class="icon i-center" >
                             <i class="iconfont icon-ziyuan"  @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" >
                            <i class="iconfont icon-xiayishou"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="iconfont icon-shoucang"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- <transition name="mini" v-show="!fullScreen">
            <div class="">

            </div>
        </transition> -->
        <audio ref="audio" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
import ProgressBar from '../../base/progress-bar/progress-bar.vue'
import {getSong,getLyric} from '../../api/player.js'
import Lyric from 'lyric-parser'
import Scroll from '../../base/scroll/scroll'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/utl'

export default {
    data(){
        return{
            fullScreen:false,
            name:"",
            des:"",
            imgUrl:"",
            currentTime:0,  //当前时长
            duration:0,  //总时长
            percent:0,
            currentLyric:null,
            currentLyric:0,
            currentLineNum:0,
            playingLyric:'',
            nolyric:false,
            mode:1,
            playIcon:'',
            isCD:true,
            move:false
        }
    },
    created(){
        this.$bus.$on("getSongs",msg=>{
            this.imgUrl=msg.al.picUrl;
            this.name=msg.name;
            this.des=msg.alia[0]||msg.ar[0].name;
            this._getSong(String(msg.id));
            this._getLyric(String(msg.id));
            this.fullScreen=true;
        });
    },
    computed:{
        iconMode(){
            if (this.mode === playMode.sequence) {
                return 'icon-danqu'
            } else if (this.mode === playMode.loop) {
                return 'icon-xunhuan'
            } else {
                return 'icon-suiji' 
            }
        },
    },
    watch:{
        currentTime () {
            this.percent = this.currentTime / this.duration
            console.log(this.percent);
        }
    },
    methods:{
        back(){
            this.fullScreen=false;
        },
        changeMode () {
            if(this.mode<=2){
            this.mode = this.mode + 1;
            }else{
                this.mode=0;
            }
        },
        changeCD(){
            this.isCD=!this.isCD;
        },
        _getSong(x){
            getSong(x).then((res)=>{
                console.log(res.data.data[0].url);
                this.$refs.audio.src=res.data.data[0].url;
                this.$refs.audio.play();
                let stop = setInterval(() => {
                    this.duration = this.$refs.audio.duration
                    if (this.duration) {
                    clearInterval(stop)
                    }
                }, 150)
             })
        },
        upDatecurrentLyric () {
            if (this.noLyric) {
                return '暂无歌词'
            }
            if (!this.noLyric) {
                return '歌词加载中'
            }
        },
        _getLyric(x){
            if (this.currentLyric) {
                this.currentLyric.stop()
                this.currentLyric = null
            }
            this.noLyric=false
            getLyric(x).then((res)=>{
                this.currentLyric = new Lyric(res.data.lrc.lyric,this.handleLyric)
                    if(this.$refs.audio.paused){
                        this.currentLyric.play()
                        this.currentLineNum=0
                        this.$refs.LyricList.scrollTo(0,0,1000)
                    }
                console.log(this.currentLineNum);
            }).catch(() => {
                this.currentLyric = null
                this.noLyric = true
                this.currentLineNum = 0
            })
        },
        handleLyric ({lineNum, txt}) {
            this.currentLineNum = lineNum
            if (lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum - 5]
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
            }
        },
        format(interval){
            interval = interval | 0
            let minute = interval / 60 | 0
            let second = interval % 60
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        },
        togglePlaying () {
            const audio = this.$refs.audio
            console.log(audio.paused);
            audio.paused ? audio.play() : audio.pause();
            audio.paused ? this.playIcon="icon-bofang1" : this.playIcon="icon-ziyuan";
            // if (this.currentLyric) {
            //     this.currentLyric.togglePlay()
            // }
        },
        percentChange (percent) {
            this.move=true
            const currentTime = this.duration * percent
            this.currentTime = currentTime
            if (this.currentLyric) {
                this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
            }
            
        }, 
        percentChangeEnd(percent){
            this.move=false
            const currentTime=this.duartion*percent
            this.$refs.audio.currentTime=currentTime
            if(!this.$refs.audio.paused){
                this.$refs.audio.play();
            }
            if(this.currentLyric){
                this.currentLyric.seek(currentTime*1000)
            }
        },
        updateTime (e) {
            if (this.move) {
                return
            }
            this.currentTime = e.target.currentTime
        },
    },
    components:{
        Scroll,
        ProgressBar
    }
}
</script>


<style scoped>
    .player,.player-nor{
        width: 100%;
        height:100%;
        position: fixed;
        top: 0px;
        z-index: 499;
    }
    .player{
        background: #f1f1f1;
    }
    .filter{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .6;
    }
    .bg{
        height: 300%;
    }
    .player-nor .nor-top{
        width: 100%;
        height:50px;
        text-align: center;
    }
    .nor-top i{
        display: block;
        height: 50px;
        background: url("../../common/image/back.png") 5% 45% no-repeat;
        background-size: 5.8%;
        z-index: 20;
    }
    .nor-top h1,.nor-top h2{
        width: 70%;
        line-height: 20px;
        color: #f1f1f1;
        font-size: 18px;
        margin: 0;
        margin-top: -40px;
        margin-left: 15%;
    }
    .nor-top h2{
        margin-top: 0px;
        font-size: 14px;
    }
    .nor-middle{
        width: 100%;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        position: fixed;
        top: 80px;
        bottom: 170px;
    }
    .nor-middle img{width: 100%;}
    .middle-l{
        width: 100%;
        height: 300px;
    }
    .middle-l .wrap-out{
        position: absolute;
        left: 10%;
        width: 300px;
        height: 300px;
    }
    .middle-l .wrap-in{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 15px solid hsla(0,0%,100%,.1);
        border-radius: 50%;
        overflow: hidden;
        animation: circle 20s 0s linear infinite;
    }
    .middle-r .lyric{
       height: 100%;
    }
    .middle-r{
         position: absolute;
        top: 0;
        width: 100%;
        height: 417px;
        overflow: hidden;
    }
    .middle-r .text{
        line-height: 40px;
        color: #c7c7c7;
        font-size: 14px;
        text-align: center;

    }
    .middle-r .text.current{
        color: #fff;
    }
    .nor-bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
    }
    .progress-wrapper{
        margin: 0 auto;
        width: 80%;
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .progress-bar-wrapper{
        flex: 1;
    }
    .time{
        color: #f1f1f1; 
        font-size: 11px;
        line-height: 30px;
        width: 30px;
    }
    .time.time-l{
        text-align: left
    }
    .time.time-r{
        text-align: right
    }
    .operators{
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        justify-content: space-between;
        height:40px;
    }
    .iconfont{
        font-size: 27px;
        line-height: 27px;
    }
    .iconfont.icon-bofang1,.iconfont.icon-ziyuan{
        font-size: 33px;
        line-height: 33px;
    }
    @keyframes circle{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
