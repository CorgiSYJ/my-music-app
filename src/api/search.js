import axios from 'axios'
import {HOST} from '../common/js/config'

export function getHotList(){
    const url = HOST + '/search/hot'
    return axios.get(url);
}

export function getSearchList(keywords){
    const url = HOST + '/search?keywords='+keywords
    return axios.get(url);
}
export function getSearchRe(keywords){
    const url = HOST + '/search/suggest?keywords='+keywords
    return axios.get(url);
}

