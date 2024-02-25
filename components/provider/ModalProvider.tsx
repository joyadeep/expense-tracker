"use client"

import { useEffect, useState } from "react"
import AddActivityModal from "../modals/AddActivityModal";
import ViewEditActivityModal from "../modals/ViewEditActivityModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";

type Props = {}

const ModalProvider = (props: Props) => {
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }
  return (
    <>
      <AddActivityModal/>
      <ViewEditActivityModal />
      <DeleteAccountModal/>
    </>
  )
}

export default ModalProvider