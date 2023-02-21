interface IUser {
    _id: string
    fullname: string
}

export interface IPayment {
    _id: string
    user: IUser 
    amount: number
    balance: number
    date: string
    type: boolean
}

export interface IPaymentsProps {
    payments?: IPayment[]
}