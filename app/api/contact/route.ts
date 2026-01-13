import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Message from "@/models/Message"

export async function POST(req: Request) {
    try {
        await dbConnect()
        const { name, email, subject, message } = await req.json()

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        await Message.create({ name, email, subject, message })

        return NextResponse.json({ message: "Message sent successfully!" }, { status: 201 })
    } catch (error) {
        console.error("Contact Form Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
