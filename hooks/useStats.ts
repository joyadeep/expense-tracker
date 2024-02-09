import axios from 'axios';
import {create} from 'zustand'

interface Istat{
    totalExpenses:number;
    currentMonthExpense:number;
    lastMonthExpense:number;
    difference:number | undefined;
}
interface StatData{
    isLoading:boolean;
    data:Istat;
    getStats:()=>Promise<void>;
}

export const useStats=create<StatData>((set)=>({
    isLoading:false,
    data:{
        totalExpenses:0,
        currentMonthExpense:0,
        lastMonthExpense:0,
        difference:undefined
    },
    getStats:async()=>{
        try {
            set({isLoading:true})
            const response =await axios.get(`/api/expense/${localStorage.getItem("userId")}`);
            set({data:response.data.data})
        } catch (error:any) {
            console.log(error)
        } finally {
            set({isLoading:false})
        }
    }
}))