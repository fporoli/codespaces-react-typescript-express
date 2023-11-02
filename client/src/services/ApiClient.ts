import axios, { CanceledError } from "axios";

// Set default configuration
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.timeout = 5000;
axios.defaults.headers.common["Authorization"] = "Bearer token";
axios.defaults.headers.common.Accept = "application/json";

export default axios.create({
    baseURL: axios.defaults.baseURL
});

export { CanceledError };

export function HandleAxiosError(msg: any) {
    if (axios.isAxiosError(msg)) {
        console.log("Error with Webservice Call (status = " + msg.status + "): " + msg.message);
    }
    else {
        console.log("Error processing Webservice Call: " + msg);
    }
}