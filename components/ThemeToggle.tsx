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
    <Sun onClick={() => setTheme("dark")} className=" cursor-pointer h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon onClick={() => setTheme("light")} className=" cursor-pointer absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span className="sr-only">Toggle theme</span>
  </Button>
  )
}

export default ThemeToggle