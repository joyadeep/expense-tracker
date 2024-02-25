"use client"
import Heading from '@/components/Heading'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Z from 'zod'
import DeleteAccount from './DeleteAccount'


const formSchama = Z.object({
    username:Z.string(),
    email:Z.string().email(),
    role:Z.string(),
    created:Z.string()
})

const Profile = () => {

    const form = useForm<Z.infer<typeof formSchama>>({
        resolver:zodResolver(formSchama),
        defaultValues:{
            username:"Joyadeep",
            email:"joyadeep.limbu@gmail.com",
            role:"USER",
            created:"2024-01-01"
        }
    })
  return (
    <main className='flex flex-grow flex-col gap-5'>
        <Heading title='Profile'/>
        <section>
            <Avatar className='w-24 h-24'>
                <AvatarFallback> JL </AvatarFallback>
            </Avatar>
        </section>
        <Card className='border-none'>
            <CardContent className='p-0'>
            <Form {...form}>
            <form className='grid grid-cols-2 gap-5' >
                <FormField control={form.control} name="username" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel >Username</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='username' readOnly placeholder='Enter username' {...field} />
                        </FormControl>
                    </FormItem>
                    </div>
                ) 
            } />
                <FormField control={form.control} name="email" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel>Email</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='email' readOnly placeholder='Enter email' {...field} />
                        </FormControl>
                    </FormItem>    
                    </div>
                ) 
            } />

                <FormField control={form.control} name="role" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel>Role</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='text' readOnly placeholder='Enter email' {...field} />
                        </FormControl>
                    </FormItem>    
                    </div>
                ) 
            } />

                <FormField control={form.control} name="created" render={({field})=>(
                    <div className='flex flex-col gap-4'>
                    <FormItem>
                        <div className='flex gap-3 items-center'>
                        <FormLabel>Created</FormLabel>
                        <FormMessage className='text-xs font-normal'/>
                        </div>
                        <FormControl>
                            <Input type='text' readOnly placeholder='' {...field} />
                        </FormControl>
                    </FormItem>    
                    </div>
                ) 
            } />

            
            </form>
           

        </Form>
            </CardContent>
        </Card>

        <DeleteAccount/>

    </main>
  )
}

export default Profile