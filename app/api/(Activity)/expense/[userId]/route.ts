import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET=async(req:Request,{params}:{params:{userId:string}})=>{
try {
    const currentDate=new Date();
    const totalExpense = await db.activity.aggregate({
        _sum:{
            amount:true
        },
        where:{userId:params.userId},
    })

    const thisMonthExpense = await db.activity.aggregate({
        _sum:{
            amount:true
        },
       where:{
            userId:params.userId,
           createdAt:{
            gte:new Date(currentDate.getFullYear(),currentDate.getMonth(),1),
            lte:new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0)
           }
       }

    })

    const lastMonthExpense = await db.activity.aggregate({
        _sum:{
            amount:true
        },
        where:{
            userId:params.userId,
            createdAt:{
                gte:new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1),
                lte:new Date(currentDate.getFullYear(),currentDate.getMonth(),0)
            }
        }
    })
    let difference;
    if(lastMonthExpense?._sum?.amount === 0 || lastMonthExpense?._sum?.amount === null){
        difference=null
    }
    else {
        difference =(((thisMonthExpense?._sum?.amount ?? 0) -( lastMonthExpense?._sum?.amount  ?? 0)) / (lastMonthExpense?._sum?.amount  ?? 0) * 100).toFixed(2)
    }
    
    return NextResponse.json({message:"success",data:{totalExpenses:totalExpense._sum.amount, currentMonthExpense:thisMonthExpense._sum.amount,lastMonthExpense:lastMonthExpense._sum.amount,difference:difference}},{status:200})
} catch (error) {
    return NextResponse.json({message:"something went wrong"},{status:500})
}
}