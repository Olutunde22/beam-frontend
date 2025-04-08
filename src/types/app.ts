export enum HTTP {
    POST = 'POST',
    GET = 'GET',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    PUT = 'PUT',
}
export enum environment {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
}

export enum PaymentOption {
    BANK_TRANSFER  ='bank_transfer',
    CREDIT_OR_DEBIT = 'credit_or_debit'
}

export interface IOption {
    label: string;
    value: string
}

export interface IModalProps<T>{
    open: boolean
    onOpenChange: (open: boolean) => void;
    onOkay:(data: T) => void
}