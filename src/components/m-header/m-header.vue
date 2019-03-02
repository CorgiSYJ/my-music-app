<template>
    <div class="m-header"> 
        <h1 class="text">MUSIC GORG</h1>
        <router-link to="/user" tag="div" class="list">
            <span class="iconfont icon-liebiao"></span>
        </router-link>
        <router-link to="/search" tag="div" class="search">
            <span class="iconfont icon-sousuo"></span>
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @import "../../common/iconfont/iconfont.css";
    @import "../../common/css/base.css";
    .m-header{
        position: relative;
        height: 44px;
        width: 100%;
        text-align: center;
        background: #d44439;
        overflow:hidden;
        z-index:99;
    }
    .m-header>.text{
        line-height: 44px;
        font-weight: bold;
        color: #f1f1f1;
        letter-spacing: 3px;
        font-size:18px;
    }
    .list{
        position:absolute;
        top:12px;
        left:10px
    }
    .search{
        position:absolute;
        top:12px;
        right:10px
    }
</style>