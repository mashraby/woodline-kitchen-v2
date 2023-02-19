interface IOrderFood {
    _id: string
    count: number
}

export interface IOrder {
    _id: string
    user: string
    comment: string
    food: IOrderFood[]
    total_cost: number
    is_given: boolean
    is_canceled: boolean
}

export interface IOrdersProps {
    orders?: IOrder[]
}