<template>
    <div class="tab">
    <div class="tab-content"> 
        <router-link to="/recommend" class="tab-item" :class="isActived=='推荐'?'tab-item-active':''" tag="div">
            <div class="item" @click="switchTab">
                <span>推荐</span>
            </div>
        </router-link>
        <router-link to="/rank" class="tab-item" :class="isActived=='排行'?'tab-item-active':''" tag="div">
            <div class="item" @click="switchTab">
                <span >排行</span> 
            </div>
        </router-link>
        <router-link to="/singer" class="tab-item" :class="isActived=='歌手'?'tab-item-active':''" tag="div">
            <div class="item" @click="switchTab">
                <span>歌手</span> 
            </div>
        </router-link>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isActived:this.$route.path.slice(1)=='recommend'?'推荐':
            this.$route.path.slice(1)=='rank'?'排行':'歌手',
        }
    },
    methods: {
        switchTab(e){
            var a=e.target.nodeName.toLowerCase();
            this.isActived = a=="div"? e.target.children[0].innerHTML:e.target.innerHTML;
        }
    },
}
</script>

<style scoped>
    .tab{
        position: relative;
        z-index:99;
    }
    .tab-content{
        display:flex;
        line-height:44px;
        height:44px;
        width:100%;
        font-size:14px;
        background:#d44439;
    }
    .tab-item{
        flex:1;
        text-align:center;
        float:right;
        color:#e4e4e4;
    }
    .item{
        text-align:center;
        height:44px;
        width:100%;
    }
    .tab-item-active span{
        font-weight:bold;
        border-bottom: 2px solid #f1f1f1;
        color:#f1f1f1;
        font-size:14px;
        padding-bottom:3px;
    }
</style>