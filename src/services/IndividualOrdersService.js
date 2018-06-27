import axios from 'axios';
import Config from "../Config";

let URL = Config.HOST_API()+'individualOrder/';

export default{

    addIndividualOrder(orderId,data) {
        return axios({
            method: 'post',
            url: URL+'order/'+orderId,
            data: JSON.stringify(data),
        })
    },

    deleteIndividualOrder(id) {
        return axios({
                url: URL + id,
                method: 'delete',
            }
        )
    },


}