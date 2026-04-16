import axios from 'axios'

const instance = axios.create({
    baseURL: "https://amazon-clonee-18xq.onrender.com/api/products"
})

export default instance
