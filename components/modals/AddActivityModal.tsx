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
import { Category } from '@prisma/client'
import { toast } from 'sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useActivity } from '@/hooks/useActivity'
import { categoryConstant,categories } from '@/constants/CategoryConstant'
import { formSchema } from '@/schama/ActivitySchama'
import { fetcher } from '@/lib/fetcher'
import { mutate } from 'swr'

// TODO : when activity is added all other pages should be refetched.



const AddActivityModal = () => {

  const {isOpen,onClose,type,data} = useModal();
  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      title:"",
      amount:0,
      category:""
    }
  })

  const isLoading = form.formState.isSubmitting;
  const  isModalOpen = isOpen && type === "Add Activity";

  const onSubmit = async(values:z.infer<typeof formSchema>)=>{
    try {
      const activityData= {...values,userId:localStorage.getItem("userId")};
      await fetcher(`/api/activity`,{method:"POST",data:activityData})
      mutate("/api/activity");
      mutate("expenses/overview");
      mutate("chart");
      mutate("expenses/bargraph");
      toast.success("Activity added successfully");
      onClose();
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Cannot add activity. Something went wrong")
    }
  }
  
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e)=>{e.preventDefault()}} onEscapeKeyDown={(e)=>{e.preventDefault()}}>
      <DialogHeader>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogDescription>Add your expenses to store in database. </DialogDescription>
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
              <FormLabel className='required'>Title</FormLabel>
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
              <FormLabel className='required'>Amount</FormLabel>
              <FormMessage className='text-xs' />
              </div>
              <FormControl>
                <Input type='number' {...field} />
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
                  <SelectTrigger>
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
         <DialogFooter>
        <Button variant={"primary"} disabled={isLoading} type="submit">Create Activity</Button>
      </DialogFooter>
        </div>
        </form>
        </Form>
     
    </DialogContent>
  </Dialog>
  )
}

export default AddActivityModal