<template>
    <div class="rank" ref="rank">
        <scroll class="rank-content" ref="scroll" :data="yunTopList">
            <ul>
                <li class="item" v-for="item in yunTopList" :key="item.id">
                    <div class="item-pic">
                        <img v-lazy="item.coverImgUrl">
                    </div>
                    <div class="song-list">
                        <div class="song" v-for="(song,i) in item.top" :key="i">
                            <span>{{i+1}}.</span>
                            <span>{{song.name}} - {{song.ar[0].name}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../base/scroll/scroll'
import {getTop} from '../api/rank.js'

//"0": 云音乐新歌榜,"1": 云音乐热歌榜,"2": 网易原创歌曲榜,"3": 云音乐飙升榜,"4": 云音乐电音榜,"22": 云音乐ACG音乐榜,"23": 云音乐嘻哈榜
const YUNMUSIC_TOP=[0,1,2,3,4,22,23]

export default {
    data() {
        return {
            yunTopList:[],

        }
    },
    created() {
        this._getTop();
        console.log(this.$route.path.slice(1));
    },
    methods: {
        handlePlaylist (yunTopList) {
            var bottom = this.yunTopList.length > 0 ? '60px' : ''
            this.$refs.rank.style.bottom = bottom;
            this.$refs.scroll.refresh();
        },
        _getTop(){
            for(var i=0;i< YUNMUSIC_TOP.length;i++){
                getTop(YUNMUSIC_TOP[i]).then((res)=>{
                    var list=res.data.playlist;
                    list.top=res.data.playlist.tracks.slice(0, 3);
                    this.yunTopList.push(list);
                })
            }
        }
    },
    components:{
        Scroll
    }
}
</script>

<style scoped>
    .rank{
        position:fixed;
        width:100%;
        margin-top:5px;
        height:100%;
    }
    ul{
        height:700px;
    }
    .rank-content{
        height:70vh;
    }
    .item{ 
        width:100%;
        height:16vh;
        display:flex;
        margin:3px 10px;
        border-bottom:1px solid #e4e4e4;
        padding: 3px 0;
        flex-direction:column;
        justify-content: center;
    }
    .item-pic{
        width:100px;
        height:100px;
        margin:auto 0;
    }
    .item-pic img{
        width:100%;
    }
    .song-list{
        position:absolute;
        left:95px;
        padding:0 20px;
        display:flex;
        flex-direction:column;
        justify-content: center;
    }
    .song{
        color:#2e3030;
        font-size:12px;
        line-height:30px;
    }
</style>