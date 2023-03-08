import axios from "axios";
const link = 'http://localhost:4000'

export default class RequestList {
    static async getAll(str) {
        const response = await axios.get(`${link}/list`, {
            params: {
                _collection: str
            }
        })
        return response;
    }

    static async getById(id,str) {
        const response = await axios.get(`${link}/list/` + id, {
            params: {
                _collection: str
            }
        })
        return response;
    }

    static async delById(id, str) {
        const response = await axios.delete(`${link}/list/` + id, {
            params: {
                _collection: str
            }
        })
        return response;
    }

    static async putById(id, str, data) {
        const response = await axios.put(`${link}/list/` + id, data, {
            params: {
                _collection: str
            }
        })
        return response;
    }

    static async addElem(str, data){
        const response = await axios.post(`${link}/list`, data, {
            params: {
                _collection: str
            }
        })
        return response;
    }
}