'use server'

import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import Customer from "@/models/Customer"

export async function createOrder(orderData: any) {
    await dbConnect();

    try {
        // 1. Find or Create Customer (ensure sync)
        // Normalize phone: remove +966 or 966 prefix if present to match stored format
        // This is a simple fuzzy match logic. Ideally we normalize everything to E.164
        let queryPhone = orderData.customerInfo.phone;

        // Try to find customer by exact email or phone
        let customer = await Customer.findOne({
            $or: [
                { email: orderData.customerInfo.email },
                { phone: queryPhone }
            ]
        });
        if (!customer) {
            customer = await Customer.create({
                firstName: orderData.customerInfo.firstName,
                lastName: orderData.customerInfo.lastName || '',
                email: orderData.customerInfo.email || `guest-${Date.now()}@kiswastore.com`,
                phone: orderData.customerInfo.phone,
                addresses: [{
                    street: orderData.shippingAddress.street,
                    city: orderData.shippingAddress.city,
                    country: 'Saudi Arabia', // Default for now
                    type: 'shipping'
                }]
            });
        } else {
            // Update customer address/stats
            customer.addresses.push({
                street: orderData.shippingAddress.street,
                city: orderData.shippingAddress.city,
                country: 'Saudi Arabia',
                type: 'shipping'
            });
            await customer.save();
        }

        // 2. Create Order
        const newOrder = await Order.create({
            orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            customer: customer._id,
            items: orderData.items.map((item: any) => ({
                product: item.product._id,
                name: item.product.name,
                image: item.product.images[0], // Save the first image
                quantity: item.quantity,
                price: item.product.price,
                total: item.product.price * item.quantity
            })),
            subtotal: orderData.total,
            tax: 0, // Calculate if needed
            shippingCost: 0,
            total: orderData.total,
            status: 'pending',
            paymentStatus: 'pending',
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod
        });

        // 3. Update Customer Stats
        customer.totalSpent += orderData.total;
        customer.orderCount += 1;
        customer.lastOrderDate = new Date();
        customer.save(); // Async save is fine

        return { success: true, orderId: newOrder._id.toString(), orderNumber: newOrder.orderNumber };

    } catch (error: any) {
        console.error("Error creating order:", error);
        return { success: false, error: error.message };
    }
}

export async function getOrderByNumber(orderNumber: string) {
    await dbConnect();
    try {
        const order = await Order.findOne({ orderNumber })
            .populate('customer')
            .lean();

        if (!order) return null;

        // Deeply serialize to ensure only plain objects are sent to the client
        // This handles ObjectIds, Dates, and nested arrays/objects (like addresses)
        const serializedOrder = JSON.parse(JSON.stringify(order));

        const customer = serializedOrder.customer as any;

        return {
            ...serializedOrder,
            customerInfo: { // Map for compatibility with existing UI
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone
            },
            orderDate: serializedOrder.createdAt || serializedOrder.orderDate // For UI compatibility
        };
    } catch (error) {
        console.error("Error fetching order:", error);
        return null;
    }
}
