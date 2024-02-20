import { Backpack, Banknote, BusFront, Clapperboard, Gift, GraduationCap, HeartPulse, Lamp, PawPrint, PiggyBank, Receipt, Shirt, Soup, Sparkles, Wallet } from "lucide-react"

type category = {
    [key:string]:JSX.Element
}
export const categoryConstant:category = {
HOUSING_EXPENSES : <Lamp strokeWidth={1}/>,
TRANSPORTATION_COSTS:<BusFront strokeWidth={1}/>,
FOOD_AND_DINING:<Soup strokeWidth={1}/>,
HEALTHCARE:<HeartPulse strokeWidth={1}/>,
UTILITIES:<Receipt strokeWidth={1}/>,
ENTERTAINMENT:<Clapperboard strokeWidth={1}/>,
PERSONAL_CARE:<Sparkles strokeWidth={1}/>,
EDUCATION:<GraduationCap strokeWidth={1}/>,
DEBTS_AND_LOANS:<Banknote strokeWidth={1}/>,
CLOTHING_AND_ACCESSORIES:<Shirt strokeWidth={1}/>,
TRAVEL:<Backpack strokeWidth={1}/>,
GIFTS_AND_DONATIONS:<Gift strokeWidth={1}/>,
SAVINGS_AND_INVESTMENTS:<PiggyBank strokeWidth={1}/>,
PETS:<PawPrint strokeWidth={1}/>,
MISCELLANEOUS:<Wallet strokeWidth={1}/>
}

export const categories = {
    HOUSING_EXPENSES: "Housing Expenses",
    TRANSPORTATION_COSTS: "Transportation Costs",
    FOOD_AND_DINING: "Food and Dining",
    HEALTHCARE: "Healthcare",
    UTILITIES: "Utilities",
    ENTERTAINMENT: "Entertainment",
    PERSONAL_CARE: "Personal Care",
    EDUCATION: "Education",
    DEBTS_AND_LOANS: "Debts and Loans",
    CLOTHING_AND_ACCESSORIES: "Clothing and Accessories",
    TRAVEL: "Travel",
    GIFTS_AND_DONATIONS: "Gifts and Donations",
    SAVINGS_AND_INVESTMENTS: "Savings and Investments",
    PETS: "Pets",
    MISCELLANEOUS: "Miscellaneous"
  };