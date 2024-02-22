"use client"
import React from 'react'
import {Sun,Moon} from "lucide-react"
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const {setTheme}=useTheme();
  return (
    <Button className="bg-transparent border-0 outline-none cursor-default" variant="link" size="icon">
    <Sun onClick={() => setTheme("dark")} className=" cursor-pointer h-[1.2rem] w-[1.2rem] block dark:hidden" />
    <Moon onClick={() => setTheme("light")} className=" cursor-pointer  h-[1.2rem] w-[1.2rem] hidden dark:block " />
    {/* <span className="sr-only">Toggle theme</span> */}
  </Button>
  )
}

export default ThemeToggle