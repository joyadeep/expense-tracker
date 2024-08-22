import React from 'react'
import * as Z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import Link from 'next/link'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import {useRouter} from "next/navigation"
import PasswordInput from './PasswordInput'


const formSchama = Z.object({
    username:Z.string().min(1,{message:"Username is required"}),
    email:Z.string().email({message:"Email is required"}),
    password:Z.string().min(6,{message:"Password must be atelese 6 character long"}).max(20,{message:"Password must be less than 20 characters"}),
    confirmPassword:Z.string()
}).refine(data=>data.password===data.confirmPassword,{message:"Password did not match",path:["confirmPassword"]})

function Register() {
    const router=useRouter();

    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })

    const isLoading= form.formState.isSubmitting;

    const onSubmit = async(values:Z.infer<typeof formSchama>)=>{
        try {
            const response = await axios.post("/api/register",values);
            console.log("register response =",response);
            if (response.status!==201) {
                throw new Error(response.data.message)
            }
           else {
            toast.success("user registered successfully");
            router.replace("/auth");
           }
            
        } catch (error:any) {
            console.log("error",error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <Card className=' w-full border-none shadow-none mx-3'>
            <CardHeader className='text-center '>
                <CardTitle className='text-3xl font-bold '>Register<span className='text-rose-500'>.</span></CardTitle>
                <CardDescription className='text-black/80 text-md tracking-normal'>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                    <FormField control={form.control} name="email" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Email</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='email' placeholder='Enter email' {...field} />
                            </FormControl>
                        </FormItem>
                        </div>
                    ) 
                } />
                    <FormField control={form.control} name="username" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Username</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <Input type='string' placeholder='Enter username' {...field} />
                            </FormControl>
                        </FormItem>
                        </div>
                    ) 
                } />
                    <FormField control={form.control} name="password" render={({field})=>(
                        <div className='flex flex-col gap-4'>
                        <FormItem>
                            <div className='flex gap-3 items-center'>
                            <FormLabel className='required'>Password</FormLabel>
                            <FormMessage className='text-xs font-normal'/>
                            </div>
                            <FormControl>
                                <PasswordInput field={field}/>
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
                                <PasswordInput field={field} placeholder='Reenter password'/>
                            </FormControl>
                        </FormItem>
                        </div>
                )} />
    
                <Button variant={"primary"} disabled={isLoading} type="submit">Register</Button>
    
                </form>
                <p className='text-sm mt-3 text-center'>Have account already?  <Link href={"/auth"} className='text-blue-500 hover:underline hover:underline-offset-4'>Login</Link> </p>
               
    
            </Form>
            </CardContent>
        </Card>
      )
}

export default Register