"use client"
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useModal } from '@/hooks/useModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/schama/ActivitySchama'
import * as z from 'zod'
import { categories, categoryConstant } from '@/constants/CategoryConstant'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'
import { fetcher } from '@/lib/fetcher'
import { mutate } from 'swr'

interface Ivieweditactivity {
    type:"View" | "Edit";
}

// TODO : add icon to amount field also in add activity
const ViewEditActivityModal = () => {
    
    const {isOpen,onClose,type,data} = useModal();
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
          title:"",
          amount:0,
          category:""
        }
      })
    const  isModalOpen = isOpen && type === "ViewEdit Activity";
    const {mode,expenseData,page} = data;

    useEffect(()=>{
      if(expenseData){
        form.setValue("title",expenseData.title);
        form.setValue("amount",expenseData.amount);
        form.setValue("category",expenseData.category);
      }
    },[form,expenseData])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try {
        const response:any = await fetcher(`/api/activity/${expenseData.id}`,{method:"PUT",data:values});
        onClose();
        mutate(["history",page])
        toast.success(response?.message)
        } catch (error:any) {
          toast.error(error?.message)
        }
    }


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => e.preventDefault()} onInteractOutside={(e)=>{e.preventDefault()}} onEscapeKeyDown={(e)=>{e.preventDefault()}} >
      <DialogHeader>
        <DialogTitle>{mode} Expense</DialogTitle>
      </DialogHeader>
        <Form {...form} >
        <form  onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-3 items-center'>
              <FormLabel className='required'>Title</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Input readOnly={mode === "View"} placeholder="expense title" {...field} />
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
              <FormLabel className='required'>Amount</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Input readOnly={mode === "View"} type='number' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-3 items-center'>
              <FormLabel className='required'>Category</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={`${mode === "View" && "pointer-events-none"}`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(categories).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          <span className='flex gap-2 items-center text-xs'>
                          <div>{categoryConstant[key]}</div> {value}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
         <DialogFooter className='flex gap-3 flex-col' >
        <Button className={`${mode === "View" && "hidden"}`} variant={"primary"} disabled={isLoading} type="submit">Update</Button>
        <Button variant={"outline"} onClick={onClose} type='button' >Close</Button>
      </DialogFooter>
        </div>
        </form>
        </Form>
     
    </DialogContent>
  </Dialog>
  )
}

export default ViewEditActivityModal