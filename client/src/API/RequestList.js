import axios from "axios";
import { useSelector } from "react-redux";
const link = 'http://localhost:4000'

const headers = { 
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('user')
    }  
}


export default class RequestList {
    static async getAll(str, limit, page) {
        const response = await axios.get(`${link}/${str}`, {
            params: {
                limit,
                page 
            }
        })
        return response;
    }

    static async filterItems(str, query, sort, limit, page) {
        const response = await axios.get(`${link}/${str}/search`, {
            params: {
                query: query,
                sort: sort,
                limit: limit,
                page: page
            }
        })
        return response;
    }

    static async getById(id,str) {
        const response = await axios.get(`${link}/${str}/` + id)
        return response;
    }

    static async delById(id, str) {
        const response = await axios.delete(`${link}/${str}/` + id, {
            params: {
                _collection: str
            }
        })
        return response;
    }

    static async putById(id, str, data) {
        const response = await axios.put(`${link}/${str}/` + id, data)
        return response;
    }

    static async addElem(str, data){
        const response = await axios.post(`${link}/${str}`, data, headers)
        return response;
    }

    static async getComments(id) {
        const response = await axios.get(`${link}/comments/book/` + id)
        return response;
    }

    static async login(data){
        const response = await axios.post(`${link}/auth/login`, data)
        return response
    }

    static async logout(){
        const response = await axios.get(`${link}/auth/logout`, headers)
        return response
    }

    static async newPassword(data){
        const response = await axios.post(`${link}/auth/new_password`, data, headers)
        return response
    }

    static async registration(data){
        const response = await axios.post(`${link}/auth/registration`, data, headers)
        return response
    }

    static async profile(id){
        const response = await axios.get(`${link}/users/` + id, headers);
        return response
    }
}