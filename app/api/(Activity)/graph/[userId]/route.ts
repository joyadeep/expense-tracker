import { db } from "@/lib/db";
import { NextResponse } from "next/server"

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

export const GET = async (req:Request,{params}:{params:{userId:string}}) => {
    try {
        const currentDate = new Date()
        const lastYearStartDate= new Date(currentDate);
        lastYearStartDate.setFullYear(currentDate.getFullYear()-1);
        lastYearStartDate.setDate(1);

        const yearlyGraph = await db.activity.findMany({where:{userId:params.userId,createdAt:{gte:lastYearStartDate,lte:currentDate}},orderBy:{createdAt:"asc"}});

        const objectMonthlyTotals:any = {};

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

        return NextResponse.json({message:"success",data:{monthlyTotals}},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}