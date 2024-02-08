import axios from "axios";
import {create} from "zustand"

interface Igraph {
    isLoading:boolean;
    yearlyGraph:any;
    error:string;
    getYearlyGraph:()=>Promise<void>;
}


export const useGraph = create <Igraph>((set)=>({
    isLoading:false,
    yearlyGraph:[],
    error:"",
    getYearlyGraph:async()=>{
        set({isLoading:true})
        try {
            const response = await axios.get(`/api/graph/${localStorage.getItem("userId")}`);
            console.log(response)
            set({yearlyGraph:response.data.data.monthlyTotals})
        } catch (error) {
            
        } finally {
            set({isLoading:false})
        }
    }
}))