import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

interface IBarGraph {
    isLoading: boolean;
    yearBarGraph: any;
    monthBarGraph:any;
    error:string;
    getBargraph: (time: string) => Promise<void>;
}

export const useBarGraph = create <IBarGraph>((set)=>({
    isLoading:false,
    error:"",
    monthBarGraph:[],
    yearBarGraph:[],
    getBargraph:async(time) =>{
        set({isLoading:true})
        try {
            if (time === "MONTH"){
                const response = await axiosInstance.get(`/api/bargraph/${localStorage.getItem("userId")}?time=${time}`);
                if (response.status !==200){
                    set({error:response.data.message})
                }
                else {
                    set({monthBarGraph:response.data.data})
                }
            }
            else{
                const response = await axiosInstance.get(`/api/bargraph/${localStorage.getItem("userId")}?time=${time}`);
                if(response.status !==200){
                    set({error:response.data.message})
                }
                else {
                    set({yearBarGraph:response.data.data})
                }
            }
        } catch (error) {
            console.log("error ==",error)
        } finally {
            set({isLoading:false})
        }
    }
}))