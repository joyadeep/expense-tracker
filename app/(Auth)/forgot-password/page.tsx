"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Z from "zod"

const formSchama = Z.object({
    email:Z.string().email()
})


const ForgotPassword = () => {
    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            email:""
        }
    })

    const onSubmit = ()=>{
        // do something
    }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Card className='w-full md:w-1/3 py-5'>
            <CardContent className='flex flex-col gap-5 text-center'>
               <div className='relative w-10 h-10 mx-auto'>
                    <Image alt='paisa logo' src={"/logo.svg"} fill  />
                </div>
                <h4 className='text-xl font-semibold text-foreground tracking-tight'>Forgot Password<span className='text-rose-500'>.</span></h4> 
               <p className='text-foreground text-sm'>Don&apos;t worry. We all have been here at some point of time</p>

               <Form {...form} >
                <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name='email' render={({field})=>(
                        <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel className='required'>Username</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='email' placeholder='Enter email' {...field} />
                        </FormControl>
                    </FormItem>
                    )} />
                    <Button variant={"primary"}>Submit</Button>
                </form>

               </Form>

               <p className='text-sm text-foreground'>Don&apos;t have an account ? <Link href={"/auth?type=register"} className='text-blue-500'>Sign up</Link></p>
            </CardContent>
        </Card>
    </div>
  )
}

export default ForgotPassword