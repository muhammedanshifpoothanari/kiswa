export interface Product {
    id: string
    name: string
    category: string
    price: number
    currency: string
    description: string
    features: string[]
    images: string[]
    specifications: {
        weight?: string
        thickness?: string
        material?: string
        size?: string
        [key: string]: string | undefined
    }
    inStock: boolean
    isBestSeller?: boolean
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface Cart {
    items: CartItem[]
    total: number
}

export interface OrderDetails {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    postalCode: string
    notes?: string
}
