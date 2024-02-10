import { currencyShorter } from "@/lib/currency";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

const months : {[key:number]:string} = {
    0:"JAN",
    1:"FEB",
    2:"MAR",
    3:"APR",
    4:"MAY",
    5:"JUN",
    6:"JUL",
    7:"AUG",
    8:"SEP",
    9:"OCT",
    10:"NOV",
    11:"DEC"
}


const getMonthlyData= async(params:any)=>{
    const currentDate = new Date()
    const lastYearStartDate= new Date(currentDate);
    lastYearStartDate.setFullYear(currentDate.getFullYear()-1);
    lastYearStartDate.setDate(1);

    const yearlyGraph = await db.activity.findMany({where:{userId:params.userId,createdAt:{gte:lastYearStartDate,lte:currentDate}},orderBy:{createdAt:"asc"}});

    const objectMonthlyTotals:{[key:string]:number} = {};

    yearlyGraph.forEach(data=>{
        const monthKey = `${months[data.createdAt.getMonth()]} ${data.createdAt.getFullYear()}`;
        if (!objectMonthlyTotals[monthKey]) {
            objectMonthlyTotals[monthKey] = 0;
        }
        objectMonthlyTotals[monthKey] += data.amount;
    })
    const monthlyTotals = Object.entries(objectMonthlyTotals).map(([name, expense]) => ({
        name,
        expense,
      }));

    return NextResponse.json({message:"success",data:monthlyTotals},{status:200})
}

const getDailyData= async(params:any)=>{
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth()-1);

    const dailyGraph = await db.activity.findMany({where:{userId:params.userId,createdAt:{gte:lastMonth,lte:currentDate}},orderBy:{createdAt:"asc"}});
    const objectDailyTotals:{[key:string]:number} = {};
    dailyGraph.forEach(data=>{
        const dayKey = `${months[data.createdAt.getMonth()]}-${data.createdAt.getDate()}`;
        if(!objectDailyTotals[dayKey]){
            objectDailyTotals[dayKey] = 0;
        }
        objectDailyTotals[dayKey] += data.amount;
    })

    const dailyTotals= Object.entries(objectDailyTotals).map(([name, expense]) => ({
        name,
        expense
    }))

    return NextResponse.json({message:"success",data:dailyTotals},{status:200})
}


export const GET = async (req:NextRequest,{params}:{params:{userId:string}}) => {
    try {
        const query = req.nextUrl.searchParams;
        const type = query.get("time") ?? "DAILY";
       
        if (type === "MONTHLY"){
            return getMonthlyData(params);
        }
        else if (type === "DAILY") {
            return getDailyData(params)
        }
        else {
            throw new Error ("Invalid time parameter")
        }

        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}