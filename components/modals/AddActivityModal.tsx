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
import axios from 'axios'
import { Category } from '@prisma/client'
import { toast } from 'sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useActivity } from '@/hooks/useActivity'
import { categoryConstant } from '@/constants/CategoryConstant'

// TODO : when activity is added all other pages should be refetched.

const formSchema=z.object({
  title:z.string().min(1,{message:"Title is required"}),
  amount:z.coerce.number().min(1,{message:"Amount is required"}),
  category:z.nativeEnum(Category).or(z.string().min(1,{message:"Category is required"}))
})
const categories = {
  HOUSING_EXPENSES: "Housing Expenses",
  TRANSPORTATION_COSTS: "Transportation Costs",
  FOOD_AND_DINING: "Food and Dining",
  HEALTHCARE: "Healthcare",
  UTILITIES: "Utilities",
  ENTERTAINMENT: "Entertainment",
  PERSONAL_CARE: "Personal Care",
  EDUCATION: "Education",
  DEBTS_AND_LOANS: "Debts and Loans",
  CLOTHING_AND_ACCESSORIES: "Clothing and Accessories",
  TRAVEL: "Travel",
  GIFTS_AND_DONATIONS: "Gifts and Donations",
  SAVINGS_AND_INVESTMENTS: "Savings and Investments",
  PETS: "Pets",
  MISCELLANEOUS: "Miscellaneous"
};

const AddActivityModal = () => {

  const {isOpen,onClose,type,data} = useModal();
  const {addActivity}=useActivity();

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
      console.log(values);
      const activityData= {...values,userId:localStorage.getItem("userId")};
      
      await addActivity(activityData);
      
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
    <DialogContent className="sm:max-w-[500px]">
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-3 items-center'>
              <FormLabel>Category</FormLabel>
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