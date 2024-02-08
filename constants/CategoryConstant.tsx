import { Backpack, Banknote, BusFront, Clapperboard, Gift, GraduationCap, HeartPulse, Lamp, PawPrint, PiggyBank, Receipt, Shirt, Soup, Sparkles, Wallet } from "lucide-react"

type category = {
    [key:string]:JSX.Element
}
export const categoryConstant:category = {
HOUSING_EXPENSES : <Lamp/>,
TRANSPORTATION_COSTS:<BusFront/>,
FOOD_AND_DINING:<Soup/>,
HEALTHCARE:<HeartPulse/>,
UTILITIES:<Receipt/>,
ENTERTAINMENT:<Clapperboard/>,
PERSONAL_CARE:<Sparkles/>,
EDUCATION:<GraduationCap/>,
DEBTS_AND_LOANS:<Banknote/>,
CLOTHING_AND_ACCESSORIES:<Shirt/>,
TRAVEL:<Backpack/>,
GIFTS_AND_DONATIONS:<Gift/>,
SAVINGS_AND_INVESTMENTS:<PiggyBank/>,
PETS:<PawPrint/>,
MISCELLANEOUS:<Wallet/>
}