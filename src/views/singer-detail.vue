<template>
    <transition name="slider">
        <div class="singer-detail">
            <i @click="back"></i>
        </div>
    </transition>
</template>

<script>
import {toSinger} from '../api/singer.js'

export default {
    data(){
        return{

        }
    },
    created(){
        this._toSinger();
    },
    methods:{
        back(){
            this.$router.back();
        },
        _toSinger(){
            var id=this.$route.params.id;
            toSinger(id).then((res)=>{
                console.log(res.data);
            })
        }
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
        background: #adf;
    }
</style>
