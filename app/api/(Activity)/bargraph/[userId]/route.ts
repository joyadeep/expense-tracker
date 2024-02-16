import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface AggregatedExpenses {
    [key: string]: number;
}



const getMonthGraph = async (id: string) => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth()-1);
    const fetchedBarGraph = await db.activity.findMany({
        where:{
            userId:id,
            createdAt:{gte:lastMonth,lte:currentDate}
        }
    })
    if (fetchedBarGraph.length === 0) {
        return NextResponse.json({message:"No data found"},{status:404})
    }

    const aggregatedExpenses = fetchedBarGraph.reduce((acc:AggregatedExpenses, activity) => {
        if (!acc[activity.category]) {
            acc[activity.category] = 0;
        }
        acc[activity.category]+=activity.amount;
        return acc;
    },{})

    const monthTotals= Object.entries(aggregatedExpenses).map(([category, expense]) => ({
        category,
        expense
    }))

    return NextResponse.json({message:"success",data:monthTotals},{status:200})
}

const getYearGraph = async (id:string) =>{  // TODO : check date if it is last year from today or not
    const currentDate = new Date()
    const lastYearStartDate= new Date(currentDate);
    lastYearStartDate.setFullYear(currentDate.getFullYear()-1);
    lastYearStartDate.setDate(1);
    const fetchedBarGraph = await db.activity.findMany({
        where:{
            userId:id,
            createdAt:{gte:lastYearStartDate,lte:currentDate}
        }
    })
    if (fetchedBarGraph.length === 0) {
        return NextResponse.json({message:"No data found"},{status:404})
    }

    const aggregatedExpenses = fetchedBarGraph.reduce((acc:AggregatedExpenses, activity) => {
        if (!acc[activity.category]) {
            acc[activity.category] = 0;
        }
        acc[activity.category]+=activity.amount;
        return acc;
    },{})
    const yearTotals= Object.entries(aggregatedExpenses).map(([category, expense]) => ({
        category,
        expense
    }))


    return NextResponse.json({message:"success",data:yearTotals},{status:200})
}


 export const GET = async (req:NextRequest,{params}:{params:{userId:string}}) => {
    try {
        if(!params.userId ){
            return NextResponse.json({ message: "User Id is required" }, { status: 400 });
        }
        const query = req.nextUrl.searchParams;
        const type = query.get("time") ?? "MONTH";
        if (type === "MONTH"){
            return getMonthGraph(params.userId);
        }
        else if (type === "YEAR"){
            return getYearGraph(params.userId);
        }
        else {
            return NextResponse.json({message:"Invalid time parameter"},{status:400})
        }
        
    } catch (error:any) {
        return NextResponse.json({message: "Something went wrong" }, { status: 500 });
    }
};