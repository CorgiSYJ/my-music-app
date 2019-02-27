<template>
    <div class="singer" ref="singer">
        <scroll class="singer-list" ref="scroll" @scroll="scroll" :listenScroll="listenScroll">
            <div>
                <ul class="singer-list-item" ref="singerList">
                    <li v-for="item in singers" :key="item.id" ref="listIitem" >
                        <p class="title" :id="item.title">{{item.title}}</p>
                        <ul>
                            <li class="content" v-for="li in item.items" :key="li.id">
                                <img v-lazy="li.avatar">
                                <span>{{li.name}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                
            </div>
        </scroll>
        <ul class="rightdot">
            <li v-for="(item,i) in singers" :key="item.id" ref="dot">
                <span :data-idx="i" @click="selectLetter" :class=" item.title==isStr || (isActive&&item.title=='热门')?'cl':''">{{item.title=="热门"?"热":item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import Singer from '../common/js/singer.js'
    import Scroll from '../base/scroll/scroll'
    import {getSingers} from '../api/singer.js'

    const pinyin = require('pinyin')

    export default {
        data() {
            return {
                singers:[],
                HOT_SINGERS:10,
                HOT_NAME:'热门',
                isStr:"",
                isActive:true,
                index:0,
                posY:0
            }
        },
        created() {
            this._getSingers();
            this.listenScroll=true;
        },
        methods: {
            //找对应首字符列表
            selectLetter(e){
                //切换class
                //console.log(e.target.dataset.idx);
                this.index=e.target.dataset.idx;
                this.isStr=e.target.innerHTML;
                 //滚动
                this.$refs.scroll.scrollToElement(this.$refs.listIitem[this.index], 0)
                if(this.isStr=='热'){
                    this.isActive=true;
                    return
                }
                this.isActive=false;
                //console.log(this.$refs.listIitem);
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.singer.style.bottom = bottom
                this.$refs.list.refresh()
            },
            _getSingers(){
                getSingers().then((res)=>{
                    //console.log(res.data.artists[13].name);
                    //console.log(res.data.artists[0].initial);
                    var list = res.data.artists;
                    list.map((item,index)=>{
                        var s=pinyin(item.name[0],{
                            style:pinyin.STYLE_FIRST_LETTER
                        })
                        item.initial = s[0][0].toUpperCase();
                    })
                    this.singers=this._normalizeSinger(list);
                   // console.log(this.singers);
                })
            },
            //按名字首字母排序
            _normalizeSinger (list) {
                let map = {
                    hot: {
                    title: this.HOT_NAME,
                    items: []
                    }
                }
                list.forEach((item, index) => {
                    if (index < this.HOT_SINGERS) {
                    map.hot.items.push(new Singer({
                        id: item.id,
                        name: item.name,
                        avatar: item.img1v1Url,
                        aliaName: item.alias.join(' / ')
                    }))
                    }

                    const key = item.initial
                    if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                    }
                    map[key].items.push(new Singer({
                        id: item.id,
                        name: item.name,
                        avatar: item.img1v1Url,
                        aliaName: item.alias[0]
                        }))
                    })
                    let hot = []
                    let ret = []
                    for (const key in map) {
                        let val = map[key]
                        if (val.title.match(/[A-Z]/)) {
                        ret.push(val)
                        } else if (val.title === this.HOT_NAME) {
                        hot.push(val)
                        }
                    }
                    ret.sort((a, b) => {
                        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                    })
                    return hot.concat(ret)
                },
                scroll(pos){
                    /*for(var i=0;i<this.singers.length-1;i++){
                        var top1 = this.$refs.listIitem[i].offsetTop;
                        var top2 = this.$refs.listIitem[i+1].offsetTop;
                        if(top1-3<=-pos.y && -pos.y<top2){
                            //console.log(this.$refs.dot[i].children[0].innerHTML);
                            this.isStr=this.$refs.dot[i].children[0].innerHTML;
                            if(this.isStr=='热'){
                                this.isActive=true;
                            }else{
                            this.isActive=false;
                            }
                        }
                    }*/
                    this.posY=pos.y;
                },
                _moveTodot(newY){
                    var x= this.singers.length-1;
                    if(-newY>=this.$refs.listIitem[x].offsetTop){
                        this.isStr=this.$refs.dot[x].children[0].innerHTML;
                        this.isActive=false;
                        return
                    }
                    for(var i=0;i<this.singers.length-1;i++){
                        var top1 = this.$refs.listIitem[i].offsetTop;
                        var top2 = this.$refs.listIitem[i+1].offsetTop;
                        if(top1-3<=-newY && -newY<top2){
                            //console.log(this.$refs.dot[i].children[0].innerHTML);
                            this.isStr=this.$refs.dot[i].children[0].innerHTML;
                            if(this.isStr=='热'){
                                this.isActive=true;
                            }else{
                            this.isActive=false;
                            }
                        }
                    }
                }
        },
        watch:{
            posY(val){
                this._moveTodot(val);
            },
        },
        components:{
            Scroll
        }
    }
</script>

<style scoped>
    .singer{
        position:fixed;
        width:100%;
        height:100%;
    }
    div{
        height:1100vh;
    }
    .singer-list{
        width:100%;
        height:80vh;
    }
    .singer-list-item{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:500px;
        transition: 1s;
    }
    .singer .title{
        font-size:12px;
        background: rgba(0,0,0,.1);
        height:20px;
        line-height: 20px;
        padding-left:10px;
        color: #f1f1f1;
        font-weight:bold;
    }
    .content{
        border-bottom: 1px solid #e4e4e4;
    }
    img{
        height:50px;
        weight:50px;
        border-radius:3px;
        vertical-align: middle;
        margin:5px 10px 5px;
    }
    span{
        margin-left: 20px;
        color: #2e3030;
        font-size: 14px;
    }
    .rightdot{
        height:100vh;
        width:10px;
        position:fixed;
        top:150px;
        right:15px;
    }
    .rightdot span{
        text-align:center;
        margin:auto;
        padding:5px;
        line-height: 1;
        color: #757575;
        font-size: 11px;
        font-weight: 700;
    }
    .cl{
        color:#d44439 !important;
    }
</style>

