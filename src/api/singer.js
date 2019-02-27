import axios from 'axios'
import {HOST} from '../common/js/config'

export function getSingers(){
    const url = HOST + '/top/artists?limit=100'
    return axios.get(url);
}