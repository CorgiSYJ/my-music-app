<template>
    <transition name="slider">
        <div class="search">
            <div class="back" @click="back">
                <i class="iconfont icon-tuihou"></i>
            </div>
            <div class="search-box">
                <input type="text" placeholder="搜索歌曲、歌手" class="box" v-model="query">
                <i v-show="query" class="iconfont icon-icon cha" @click="clear"></i>
            </div>
            <div class="search-hot">
                <p>热门搜索</p>
                <span v-for="item in hotlist" :key="item.id" class="hot-item" @click="Hotsearch">{{item.first}}</span>
            </div>
            <scroll v-if="query" class="match">
                <div>
                    <div class="match-box">
                         <p class="best">最佳匹配</p>
                         <div class="search-suggest-item" @click="setHistory" :data-idx="artists[0].id">
                            <img :src="artists[0].img1v1Url">
                            <span>歌手：{{artists[0].name}}</span>
                        </div>
                        <div class="search-suggest-item" @click="setHistory">
                            <img :src="playlists[0].coverImgUrl">
                            <span>歌单：{{playlists[0].name}}<br>
                            <p>
                            {{playlists[0].description.slice(0,20)}}...</p></span>
                        </div> 
                        <div class="search-item" v-for="item in listSearch" :key="item.id" @click="setHistory">
                            <p class="p1">{{item.name.slice(0,20)}}</p>
                            <p class="p2">{{item.artists[0].name}}</p>
                        </div> 
                    </div>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import Scroll from '../base/scroll/scroll'
import {getHotList,getSearchList,getSearchRe} from '../api/search.js'

export default {
    data(){
        return{
            query:"",
            hotlist:[],
            artists:[],
            playlists:[],
            listSearch:[]
        }
    },
    created(){
        this._getHotList();
    },
    methods:{
        back(){
            this.$router.back();
        },
        clear(){
            this.query="";
        },
        Hotsearch(e){
            var str=e.target.innerHTML;
            this.query=str;
        },
        setHistory(e){
            console.log("aaaaa");
            console.log(e.target.dataset.idx);
            
        },
        _getHotList(){
            getHotList().then((res)=>{
                this.hotlist=res.data.result.hots.splice(0,10);
            })
        },
        _getSearchList(){
            getSearchList(this.query).then((res)=>{
                if(res.data.code==200){
                    console.log(res.data.result);
                    this.listSearch=res.data.result.songs;
                }
            })
        },
        _getSearchRe(){
            getSearchRe(this.query).then((res)=>{
                if(res.data.code==200){
                    var list=res.data.result;
                    this.artists=list.artists;
                    this.playlists=list.playlists;
                    console.log(list);
                }
            })
        }
    },
    watch: {
        query(){
            this._getSearchList();
            this._getSearchRe();
            
        }
    },
    components:{
        Scroll
    }
}
</script>

<style scoped>

    .slider-enter-active,.slider-leave-active{
        transition: all 0.3s;
    }
    .slider-enter,.slider-leave-to{
        transform: translate3d(50%, 0, 0);
        opacity: 0;
    }
    .search{
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
    .search-box{
        width: 100%;
        height:44px;
        background:#d44439;
        display: flex;
        align-items: center;
    }
    .box{
        margin:0 auto;
        padding: 0;
        width: 80%;
        line-height: 25px;
        background: #d44439;
        color: #fff;
        font-size: 14px;
        border: none;
        padding-left: 15px;
    }
    input::-webkit-input-placeholder {
        color:#b9bcc0d3;
    }
    .cha{
        position: absolute;
        right: 10px;
    }
    .search-hot{
        width: 100%;
        margin: 0 20px;
    }
    .search-hot p{
        padding: 15px 5px 0px;
    }
    .hot-item{
        display: inline-block;
        padding: 3px 5px;
        margin: 4px;
        border: .8px solid #c7c7c7;
        border-radius: 5px;
        line-height: 20px;
        color: #2e3030;
        font-size: 14px;
    }
    .match{
        position: absolute;
        top:44px;
        width: 100%;
        height:100%;
        overflow: hidden;
    }
    .match-box{
        width: 100%;
        height:1600px;
        background: #f2f3f4;
    }
    .search-item,.search-suggest-item{
        width: 100%;
        height: 67px;
        padding: 8px 20px;
        display: flex;
        flex-wrap:wrap; 
        border-bottom: 1px solid #e4e4e4
    }
    img{
        
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 3px;
    }
    .best{
        padding: 10px 20px 0px;
        color: #d44439;
        font-size: 11px;
    }
    .search-suggest-item span{
        width: 80%;
        font-size: 14px;
        align-self:center;
    }
    .search-suggest-item p{
        font-size: 10px;
        margin: 0;
    }
    .search-item p{
        width: 100%;
    }
    .search .p1{
        font-size: 14px;
        color: #000;
    }
    .search .p2{
        font-size: 12px;
    }
</style>
