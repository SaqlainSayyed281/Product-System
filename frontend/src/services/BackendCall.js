 import axios from "axios"

 const BackendCall = axios.create({
    baseURL:import.meta.env.VITE_API_URL
 })

 export default BackendCall 