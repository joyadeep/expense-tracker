import axiosInstance from '@/lib/axiosInstance';
import { Activity } from '@prisma/client';
import {create} from 'zustand'



interface ActivityData {
 isLoading:boolean;
 data:Activity[];
 pagedData:Activity[];
 error:string;
 pagedError:string;
 getActivity:()=>Promise<void>;
 getPagedActivity:(pageNumber?:number)=>Promise<void>;
 addActivity:(activity:any)=>Promise<void>;

}

export const useActivity=create<ActivityData>((set)=>({
    isLoading:false,
    data:[],
    pagedData:[],
    error:"",
    pagedError:"",
    getActivity:async()=>{
        set({isLoading:true})
       try {
        const response =await axiosInstance.get(`/api/activity/${localStorage.getItem("userId")}`);
        set({data:response.data.data})
       } catch (error:any) {
        set({error:error.response.data.message})
       } finally {
        set({isLoading:false})
       }
        
    },
    getPagedActivity:async(pageNumber) => {
        set({isLoading:true});
        try {
            const response = await axiosInstance.get(`/api/activity/${localStorage.getItem("userId")}?pageNumber=${pageNumber}`);
            set({pagedData:response.data.data});
        } catch (error:any) {
            set({pagedError:error.response.data.message})
        } finally {
            set({isLoading:false})
        }
    },
    addActivity:async(activity)=>{
        try {
            set({isLoading:true})
            const response =await axiosInstance.post(`/api/activity`,activity);
            console.log("add activity response",response)
            if (response.status!==201){
                throw new Error(response.data.data.message)
            }
            set({data:[response.data.data,...useActivity.getState().data]})

        } catch (error:any) {
            throw new Error(error)
        } finally {
            set({isLoading:false})
        }
    }
}))
