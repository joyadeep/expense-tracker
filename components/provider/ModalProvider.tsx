"use client"

import { useEffect, useState } from "react"
import AddActivityModal from "../modals/AddActivityModal";

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
    <AddActivityModal/>
  )
}

export default ModalProvider