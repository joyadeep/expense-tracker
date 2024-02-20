import React from 'react'
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

interface Ivieweditactivity {
    type:"View" | "Edit";
}

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
    const {mode,expenseData} = data;

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        // TODO : update activity also try to update type
    }


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{mode} Expense</DialogTitle>
        {/* <DialogDescription>Add your expenses to store in database. </DialogDescription> */}
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
                <Input readOnly placeholder="bought an apple" {...field} />
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
                <Input readOnly type='number' {...field} />
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

export default ViewEditActivityModal