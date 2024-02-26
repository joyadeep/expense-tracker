import axios, { AxiosRequestConfig } from "axios"

export const fetcher = async <T> (url: string,options?:any):Promise<T> => {
    try {
        const response = await axios(url,options);
        return response.data as T;
    } catch (error:any) {
        throw new Error('An error occured while fetching data.');
    }
}