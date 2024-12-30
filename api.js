import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

const setBasicAuth = (email, password) => {
    const token = btoa(`${email}:${password}`);
    API.defaults.headers.common["Authorization"] = `Basic ${token}`;
};

export default API; // Default export for API
export { setBasicAuth }; // Named export for setBasicAuth
