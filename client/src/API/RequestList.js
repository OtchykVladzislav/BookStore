import axios from "axios";
const link = 'http://localhost:4000'

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
        console.log(sort, query)
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
        const response = await axios.post(`${link}/${str}`, data)
        return response;
    }

    static async getComments(id) {
        const response = await axios.get(`${link}/comments/book/` + id)
        return response;
    }
}