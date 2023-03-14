import { IProduct } from "./products.interface"

export interface IFood {
    _id: string
    name: string
    cost: number
    category: string
    products: IProduct[]
}

export interface IFoodProps {
    foods: IFood[] 
}

export interface IAddFoodProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IChangeFoodProps {
    changeOpen: boolean
    setChangeOpen: React.Dispatch<React.SetStateAction<boolean>>
    oldCost?: number
    foodId: string
}