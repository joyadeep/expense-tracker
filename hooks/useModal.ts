import {create} from 'zustand'

export type ModalType= "Add Activity" | "ViewEdit Activity" | "Delete Account"

interface ModalData{
}

interface ModalStore {
    type:ModalType | null;
    data:any;
    isOpen:boolean;
    onOpen:(type:ModalType,data?:ModalData)=>void;
    onClose:()=>void;
}

export const useModal=create<ModalStore>((set)=>({
    type:null,
    data:{},
    isOpen:false,
    onOpen:(type,data={})=>set({isOpen:true,type,data}),
    onClose:()=>set({type:null, isOpen:false})
}))