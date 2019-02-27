// 引入axios
import axios from 'axios'
import {HOST} from '../common/js/config'

//获取轮播数据
export function getBanner(){
    const url = HOST + '/banner'
    return axios.get(url)
}

//获取推荐歌单列表
export function getRecommendList(){
    const url = HOST + '/personalized'
    return axios.get(url)
}

//获取推荐歌单列表
export function getRecommendMusic(){
    const url = HOST + '/personalized/newsong'
    return axios.get(url)
}

