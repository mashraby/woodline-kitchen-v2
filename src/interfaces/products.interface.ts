export interface IProduct {
    _id: string
    name: string
    cost: number
}

export interface IProductsProps {
    products: IProduct[]
}

export interface IAddProductProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}