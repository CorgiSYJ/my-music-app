import axios from 'axios'
import {HOST} from '../common/js/config'

export function getSingers(){
    const url = HOST + '/top/artists?limit=100'
    return axios.get(url);
}

export function toSinger(id){
    const url = HOST + '/artists?id='+id
    return axios.get(url);
}

