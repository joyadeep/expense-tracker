"use client"
import React from 'react'
import * as z from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useModal } from '@/hooks/useModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'


const formSchema=z.object({
  title:z.string().min(1,{message:"Title is required"}),
  amount:z.number(),
})

const AddActivityModal = () => {

  const {isOpen,onClose,type,data} = useModal();

  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      title:"",
      amount:0
    }
  })

  const isLoading = form.formState.isSubmitting;
  const  isModalOpen = isOpen && type === "Add Activity";

  const onSubmit = (values:z.infer<typeof formSchema>)=>{
    console.log(values)
  }
  
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Activity</DialogTitle>
      </DialogHeader>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-3 items-center'>
              <FormLabel>Title</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Input placeholder="bought an apple" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-3 items-center'>
              <FormLabel>Amount</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
         <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
        </div>
        </form>
        </Form>
     
    </DialogContent>
  </Dialog>
  )
}

export default AddActivityModal