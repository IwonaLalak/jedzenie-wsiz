import axios from 'axios';
import Config from "../Config";

let URL = Config.HOST_API()+'order/';

export default{

    getOrders() {
        return axios({
            method: 'get',
            url: URL,
        });
    },

    addOrder(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editOrder(id, data) {
        return axios(
            {
                url: URL,// + id,
                method: 'post',
                data: JSON.stringify(data),
            }
        )
    },

    deleteOrder(id) {
        return axios({
                url: URL + id,
                method: 'delete',
            }
        )
    },


}