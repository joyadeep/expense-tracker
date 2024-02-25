"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Z from "zod"

const formSchama = Z.object({
    password:Z.string().min(6,{message:"Password must be atelese 6 character long"}).max(20,{message:"Password must be less than 20 characters"}),
    confirmPassword:Z.string().min(6,{message:"Password must be atelese 6 character long"}).max(20,{message:"Password must be less than 20 characters"}),
}).refine(data=>data.password===data.confirmPassword,{message:"Password did not match",path:["confirmPassword"]})
const ChangePassword = () => {
    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            password:"",
            confirmPassword:""
        }
    })

    const onSubmit=async(data:Z.infer<typeof formSchama>)=>{
        try {
            const response = await axiosInstance.put(`/api/change-password/${localStorage.getItem("userId")}`,data);
            if(response.status===200){
                toast.success(response.data.message);
                form.reset();
            }
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <main className='w-full h-full flex justify-center items-center'>
        <Card className='w-full md:w-2/5'>
            <CardHeader className='text-center'>
                <CardTitle className='text-xl font-semibold'>Change Password</CardTitle>
                <CardDescription>Enter a new password below to change your password</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}  className='flex flex-col gap-4'>
                    <FormField control={form.control} name="password" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>New Password</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='password' placeholder='Enter new password' {...field} />
                            </FormControl>
                        </FormItem>
                        </div>
                    ) 
                } />
                    <FormField control={form.control} name="confirmPassword" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Reenter Password</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='password' placeholder='Reenter new password' {...field} />
                            </FormControl>
                        </FormItem>
                        </div>
                    ) 
                } />
                <CardFooter className='p-0'>
                    <Button variant={"primary"} className='w-full'>Change Password</Button>
                </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </main>
  )
}

export default ChangePassword