"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect, useLayoutEffect } from 'react'
import {  useForm } from 'react-hook-form'
import * as Z from "zod"
import {useRouter, useSearchParams} from "next/navigation";
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'

const formSchama = Z.object({
    token:Z.string(),
    password:Z.string().min(6,{message:"Password must be atelese 6 character long"}).max(20,{message:"Password must be less than 20 characters"}),
    confirmPassword:Z.string()
}).refine(data=>data.password===data.confirmPassword,{message:"Password did not match",path:["confirmPassword"]})


const ResetPassword = () => {
  
    const search = useSearchParams();
    const route = useRouter();

    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            token:search.get("token") ?? "",
            password:"",
            confirmPassword:""
        }
    })

    const onSubmit=async(values:Z.infer<typeof formSchama>)=>{
        try {
            const response = await axiosInstance.post("/api/reset-password",values)
            if(response.status ===200){
                toast.success(response.data.message)
                route.replace("/auth");
            }
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    }

    return (
    <main className=' bg-background w-full h-screen flex justify-center items-center'>
        <Card className='w-full md:w-1/3'>
            <CardHeader className='text-center'>
                <div className='relative w-10 h-10 mx-auto'>
                    <Image alt='logo' src={"/logo.svg"} fill />
                </div>
                <CardTitle>Reset Password<span className='text-rose-500'>.</span></CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                    
                    <FormField control={form.control} name="password" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Password</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='password' placeholder='Enter password' {...field} />
                            </FormControl>
                        </FormItem>   
                        </div>
                    ) 
                } />
                <FormField control={form.control} name="confirmPassword" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Confirm Password</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='password' placeholder='Reenter passowrd' {...field} />
                            </FormControl>
                        </FormItem>
                        </div>
                )} />
    
                <Button variant={"primary"}  type="submit">Reset Password</Button>
    
                </form>
               
               
    
            </Form>
            </CardContent>
        </Card>
    </main>
  )
}

export default ResetPassword