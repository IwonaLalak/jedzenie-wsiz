import axios from 'axios';
import Config from "../Config";

let URL = Config.HOST_API()+'restaurant/';

export default{

    getRestaurants() {
        return axios({
            method: 'get',
            url: URL,
        });
    },

    addRestaurant(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editRestaurant(id, data) {
        return axios(
            {
                url: URL + id,
                method: 'put',
                data: JSON.stringify(data),
            }
        )
    },

    deleteRestaurant(id) {
        return axios({
                url: URL + id,
                method: 'delete',
            }
        )
    },
}