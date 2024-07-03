import axios from "axios";

export class Request {
    static async post(url: string, data: any[]) {
        const res = await axios.post(url, data)
        return res;
    }

    static async get(url: string) {
        const res = await axios.get(url)
        return res;
    }
}