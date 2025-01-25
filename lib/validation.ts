import * as z from "zod"

// Regular expressions for validation
const CARD_NUMBER_REGEX = /^[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}$/
const EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
const CVV_REGEX = /^[0-9]{3,4}$/

export const paymentFormSchema = z.object({
  cardOwner: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  
  cardNumber: z
    .string()
    .regex(CARD_NUMBER_REGEX, "Invalid card number format")
    .transform(val => val.replace(/\s/g, "")), // Remove spaces for processing
  
  expiryDate: z
    .string()
    .regex(EXPIRY_DATE_REGEX, "Invalid expiry date (MM/YY)")
    .refine((val) => {
      const [month, year] = val.split("/")
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      return expiry > new Date()
    }, "Card has expired"),
  
  cvv: z
    .string()
    .regex(CVV_REGEX, "Invalid CVV format")
})

export type PaymentFormData = z.infer<typeof paymentFormSchema>

// Additional type for the payment response
export type PaymentResponse = "subscription successful" | string

