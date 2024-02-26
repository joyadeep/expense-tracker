import axios, { AxiosRequestConfig } from "axios"

export const fetcher = async <T> (url: string,options?:any):Promise<T> => {
    try {
        const response = await axios(url,options);
        console.log("all response ==",response)
        return response.data as T;
    } catch (error:any) {
        console.log("error",error)
        throw new Error(error.response.data.message);
    }
}