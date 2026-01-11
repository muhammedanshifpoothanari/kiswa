// "use server"

// import twilio from "twilio"

// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID

// export async function sendOtp(phone: string) {
//     if (!accountSid || !authToken || !serviceSid) {
//         return { success: false, error: "Twilio credentials are not configured" }
//     }

//     try {
//         const client = twilio(accountSid, authToken)

//         // Ensure phone number starts with +
//         const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`

//         await client.verify.v2.services(serviceSid)
//             .verifications.create({ to: formattedPhone, channel: "sms" })

//         return { success: true }
//     } catch (error: any) {
//         console.error("Error sending OTP:", error)
//         return { success: false, error: error.message || "Failed to send verification code" }
//     }
// }

// export async function verifyOtp(phone: string, code: string) {
//     if (!accountSid || !authToken || !serviceSid) {
//         return { success: false, error: "Twilio credentials are not configured" }
//     }

//     try {
//         const client = twilio(accountSid, authToken)

//         // Ensure phone number starts with +
//         const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`

//         const verification = await client.verify.v2.services(serviceSid)
//             .verificationChecks.create({ to: formattedPhone, code })

//         if (verification.status === "approved") {
//             return { success: true }
//         } else {
//             return { success: false, error: "Invalid verification code" }
//         }
//     } catch (error) {
//         console.error("Error verifying OTP:", error)
//         return { success: false, error: "Failed to verify code" }
//     }
// }



"use server"

import { generateOTP, storeOTP, sendWhatsAppOTP, verifyOTP as verifyWhatsAppOTP } from "@/lib/whatsapp"

/**
 * Send OTP via WhatsApp
 */
export async function sendOtp(phone: string) {
    if (!phone) {
        return { success: false, error: "Phone number is required" }
    }

    try {
        // Normalize phone number
        let formattedPhone = phone.replace(/\D/g, "")
        if (!formattedPhone.startsWith("966") && formattedPhone.length === 9) {
            formattedPhone = "966" + formattedPhone
        }

        // Generate OTP
        const otp = generateOTP()
        storeOTP(formattedPhone, otp)

        // Send via WhatsApp
        const sent = await sendWhatsAppOTP(formattedPhone, otp)

        if (sent) {
            return {
                success: true,
                message: "OTP sent via WhatsApp",
                // DEV mode: return OTP for testing
                ...(process.env.NODE_ENV === "development" && { devOtp: otp })
            }
        } else {
            return { success: false, error: "Failed to send OTP via WhatsApp" }
        }
    } catch (error: any) {
        console.error("Send OTP Error:", error)
        return { success: false, error: error.message || "Failed to send OTP" }
    }
}

/**
 * Verify OTP entered by user
 */
export async function verifyOtp(phone: string, code: string) {
    if (!phone || !code) {
        return { success: false, error: "Phone and OTP are required" }
    }

    try {
        // Normalize phone number
        let formattedPhone = phone.replace(/\D/g, "")
        if (!formattedPhone.startsWith("966") && formattedPhone.length === 9) {
            formattedPhone = "966" + formattedPhone
        }

        const result = verifyWhatsAppOTP(formattedPhone, code)

        if (result.valid) {
            return { success: true }
        } else {
            return { success: false, error: result.error || "Invalid OTP" }
        }
    } catch (error: any) {
        console.error("Verify OTP Error:", error)
        return { success: false, error: error.message || "Failed to verify OTP" }
    }
}
