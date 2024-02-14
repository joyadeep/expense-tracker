import axiosInstance from "@/lib/axiosInstance";
import {create} from "zustand"

interface Igraph {
    isLoading:boolean;
    yearlyGraph:any;
    dailyGraph:any;
    error:string;
    getYearlyGraph:(time:string)=>Promise<void>;
}


export const useGraph = create <Igraph>((set)=>({
    isLoading:false,
    yearlyGraph:[],
    dailyGraph:[],
    error:"",
    getYearlyGraph:async(time)=>{
        set({isLoading:true})
        try {
            if(time==="MONTHLY"){
            const response = await axiosInstance.get(`/api/graph/${localStorage.getItem("userId")}?time=${time}`);
            set({yearlyGraph:response.data.data})
            }
            else{
                const response = await axiosInstance.get(`/api/graph/${localStorage.getItem("userId")}?time=${time}`);
                set({dailyGraph:response.data.data})
            }
        } catch (error) {
            
        } finally {
            set({isLoading:false})
        }
    }


}))