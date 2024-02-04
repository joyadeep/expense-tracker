"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as Z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const formSchama = Z.object({
    email:Z.string({required_error:"Email is required"}).email(),
    password:Z.string({required_error:"Password is required"}).min(6)
})


const Login = () => {

    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit = (values:Z.infer<typeof formSchama>)=>{
        console.log(values);
    }


  return (
    <Card className=' w-full border-none shadow-none mx-3'>
        <CardHeader className='text-center '>
            <CardTitle className='text-3xl font-bold '>Auth<span className='text-rose-500'>.</span></CardTitle>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                <FormField control={form.control} name="email" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel>Email</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='email' placeholder='Enter your email' {...field} />
                        </FormControl>
                    </FormItem>
                    
                    
                    </div>
                ) 
            } />
                <FormField control={form.control} name="password" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel>Password</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='password' placeholder='Enter your password' {...field} />
                        </FormControl>
                    </FormItem>
                    
                    
                    </div>
                ) 
            } />

            <Button type="submit">Login</Button>

            </form>

        </Form>
        </CardContent>
    </Card>
  )
}

export default Login