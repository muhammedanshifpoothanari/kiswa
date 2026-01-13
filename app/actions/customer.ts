"use server"

import dbConnect from "@/lib/mongodb"
import Customer from "@/models/Customer"
import Order from "@/models/Order"

export async function getCustomer(identifier: string) {
    await dbConnect();
    try {
        console.log("getCustomer searching for:", identifier);

        let query;
        if (identifier.includes('@')) {
            query = { email: identifier };
        } else {
            query = { phone: identifier };
        }

        const customer = await Customer.findOne(query).lean();
        console.log("getCustomer found:", customer ? customer._id : "null");
        if (!customer) return null;

        return {
            ...customer,
            _id: customer._id.toString(),
            addresses: customer.addresses?.map((addr: any) => ({
                ...addr,
                _id: addr._id ? addr._id.toString() : undefined
            })) || [],
            // Ensure no BigInts or complex types remain
        };
    } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
    }
}

export async function getCustomerOrders(customerId: string) {
    await dbConnect();
    try {
        const orders = await Order.find({ customer: customerId })
            .sort({ createdAt: -1 })
            .lean();

        return orders.map((order: any) => ({
            ...order,
            _id: order._id.toString(),
            customer: order.customer.toString(),
            items: order.items.map((item: any) => ({
                ...item,
                _id: item._id ? item._id.toString() : undefined,
                product: item.product ? item.product.toString() : null
            })),
            orderDate: order.createdAt // Standardize
        }));
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        return [];
    }
}
