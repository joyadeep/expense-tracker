"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as Z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';


const formSchama = Z.object({
    username:Z.string().min(1,{message:"Username is required"}),
    password:Z.string().min(6,{message:"Password must be atelese 6 character long"}).max(20,{message:"Password must be less than 20 characters"}),
})


const Login = () => {
    const [isLogging,setIsLogging]=useState(false);
    const router=useRouter();

    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            username:"",
            password:""
        }
    })

    const onSubmit = async(values:Z.infer<typeof formSchama>)=>{
        try {
            setIsLogging(true);
            const response = await axios.post("/api/login",values);
            if (response.status!==200) {
                throw new Error(response.data.message)
            }
           else {
            localStorage.setItem("userId",response.data.id); // * remove userId response for production
            router.push("/dashboard");
           }
        } catch (error:any) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
        } finally {
            setIsLogging(false);
        }
    }


  return (
    <Card className=' w-full border-none shadow-none mx-3'>
        <CardHeader className='text-center '>
            <CardTitle className='text-3xl font-bold '>Login<span className='text-rose-500'>.</span></CardTitle>
            <CardDescription className='text-black/80 text-md tracking-normal'>Welcome Back</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                <FormField control={form.control} name="username" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel className='required'>Username</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='username' placeholder='Enter username' {...field} />
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
                            <Input type='password' placeholder='Enter password' {...field} />
                        </FormControl>
                    </FormItem>
                    
                    
                    </div>
                ) 
            } />

            <Link href="/#" className='text-xs text-blue-500 hover:underline hover:underline-offset-4 self-end'>Forgot Password?</Link>

            <Button variant={"primary"} disabled={isLogging} type="submit">Login</Button>

            </form>
            <p className='text-sm mt-3 text-center'>New to tracker ?  <Link href={"/auth?type=register"} className='text-blue-500 hover:underline hover:underline-offset-4'>Register</Link> </p>
           

        </Form>
        </CardContent>
    </Card>
  )
}

export default Login