import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Subscriber from "@/models/Subscriber"

export async function POST(req: Request) {
    try {
        await dbConnect()
        const { email } = await req.json()

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Check if duplicate
        const existing = await Subscriber.findOne({ email })
        if (existing) {
            if (existing.status === "unsubscribed") {
                existing.status = "subscribed"
                await existing.save()
                return NextResponse.json({ message: "Welcome back! You have successfully resubscribed." }, { status: 200 })
            }
            return NextResponse.json({ message: "You are already subscribed." }, { status: 200 })
        }

        await Subscriber.create({ email })

        return NextResponse.json({ message: "Successfully subscribed!" }, { status: 201 })
    } catch (error) {
        console.error("Subscription Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
