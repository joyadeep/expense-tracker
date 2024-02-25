import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertTriangle } from 'lucide-react'
import { useModal } from '@/hooks/useModal'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'
import { useRouter } from 'next/navigation'

type Props = {}

const DeleteAccountModal = (props: Props) => {
    const {isOpen,onClose,type}= useModal();
    const route= useRouter();

    const isModalOpen = isOpen && type === "Delete Account";

    const onSubmit = async() => {
        try {
            const response = await axiosInstance.delete(`/api/delete-account/${localStorage.getItem("userId")}`);
            if (response.status === 200) {
                onClose();
                toast.success(response.data.message);
                await axiosInstance.post("/api/logout");
                route.replace("/auth")
            }
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e)=>{e.preventDefault()}} onEscapeKeyDown={(e)=>{e.preventDefault()}}>
            <DialogHeader>
                <div className='rounded-full bg-destructive mx-auto w-16 h-16 flex items-center justify-center'>
                <AlertTriangle className='text-white' size={32}/>
                </div>
            </DialogHeader>
            <h3 className='text-foreground font-semibold text-md'>Are you sure you want to delete your account permanently?</h3>
            <h6 className='text-sm text-foreground'>Press &quot;Delete Account&quot; to remove it permanently, or &quot;Cancel&quot; if you want to keep your benefits. </h6>
            <DialogFooter className='flex gap-3 flex-col '>
                <Button variant={"outline"} size={"sm"} onClick={onSubmit}>Delete Account</Button>
                <Button variant={"primary"} size={"sm"} onClick={onClose}>Cancel</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountModal