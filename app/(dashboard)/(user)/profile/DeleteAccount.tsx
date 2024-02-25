import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useModal } from '@/hooks/useModal'
import React from 'react'

type Props = {}

const DeleteAccount = (props: Props) => {
    const {onOpen}=useModal();
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-red-500 text-md font-normal'>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-sm text-foreground/80 mb-2'>Once you delete your account, there is no going back. Please be certain.</p>
            <Button size={"sm"} variant={"destructive"} onClick={()=>onOpen("Delete Account")} >
                Delete My Account
            </Button>
        </CardContent>
    </Card>
  )
}

export default DeleteAccount