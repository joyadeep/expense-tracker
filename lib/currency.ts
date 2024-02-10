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

export const currencyShorter = (amount:number)=>{
    if(typeof amount !== "number"){
        throw new Error("amount must be a number")
    }
    if(amount < 999.00){
        return amount;
    }
    else if (amount < 999999.99){
        return (amount/1000).toFixed(2) + "K";
    }
    else if (amount < 999999999.99){
        return (amount/1000000).toFixed(2) + "M";
    }
    else {
        return (amount/1000000000).toFixed(2) + "B";
    }
}