interface IOrderFood {
    food: string
    count: number
}

export interface IOrder {
    _id: string
    user: string
    comment: string
    food: IOrderFood
    total_cost: number
    is_given: boolean
}

export interface IOrdersProps {
    orders?: IOrder[]
}