export const currencyFormat= (amount:number)=>{
    if(typeof amount !== "number"){
        throw new Error("amount must be a number")
    }
    return Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "AUS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
  }).format(amount).replace("AUS", "रु")
}