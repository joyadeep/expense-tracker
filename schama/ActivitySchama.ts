import { categories } from '@/constants/CategoryConstant'
import * as z from 'zod'
export const formSchema=z.object({
    title:z.string().min(1,{message:"Title is required"}),
    amount:z.coerce.number().min(1,{message:"Amount is required"}),
    category:z.nativeEnum(categories).or(z.string().min(1,{message:"Category is required"}))
  })