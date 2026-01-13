'use server'

import dbConnect from "@/lib/mongodb"
import Customer from "@/models/Customer"

export async function syncUser(userData: {
    uid: string;
    email?: string | null;
    phoneNumber?: string | null;
    displayName?: string | null;
}) {
    await dbConnect();

    try {
        const query = userData.email
            ? { email: userData.email }
            : { phone: userData.phoneNumber };

        if (!query.email && !query.phone) {
            throw new Error("No identifier provided");
        }

        let customer = await Customer.findOne(query);

        if (!customer) {
            // Create new customer
            customer = await Customer.create({
                firstName: userData.displayName?.split(' ')[0] || 'Guest',
                lastName: userData.displayName?.split(' ').slice(1).join(' ') || 'User',
                email: userData.email || `guest-${Date.now()}@kiswastore.com`, // Fallback for phone-only users
                phone: userData.phoneNumber,
                orderCount: 0,
                totalSpent: 0
            });
        }

        return JSON.parse(JSON.stringify(customer));
    } catch (error) {
        console.error("Error syncing user:", error);
        return null;
    }
}
