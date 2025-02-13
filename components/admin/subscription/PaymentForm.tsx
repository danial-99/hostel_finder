import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import processPayment from "@/actions/admin/processPayment";
import * as z from "zod";
import { paymentFormSchema, PaymentFormData } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Plan {
  name: string;
  price: number;
  duration: string;
  discount?: number;
  features: string[];
}

interface PaymentFormProps {
  plan: Plan;
  onPaymentComplete: () => void;
}

const calculateDiscountedPrice = (plan: Plan): string => {
  if (plan.discount) {
    return (plan.price * (100 - plan.discount) / 100).toFixed(2)
  }
  return plan.price.toFixed(2)
}

export default function PaymentForm({ plan, onPaymentComplete }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digits
    const limited = cleaned.slice(0, 16); // Limit to 16 digits
    return limited.replace(/(\d{4})/g, '$1 ').trim(); // Add spaces every 4 digits
  };

  // Format expiry date as user types
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digits
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Format CVV as user types
  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 4); // Remove non-digits and limit to 4
  };

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setIsProcessing(true);
      console.log("Processing payment with data:", data);
      const res = await processPayment(plan);
      
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentComplete();
      }, 3000);
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Enter your payment information for the {plan.name} plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="payment-form">
          <div className="space-y-2">
            <Label htmlFor="cardOwner">Card Owner Name</Label>
            <Input
              id="cardOwner"
              placeholder="John Doe"
              {...register("cardOwner")}
            />
            {errors.cardOwner && (
              <p className="text-red-500 text-sm">{errors.cardOwner.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={19} // 16 digits + 3 spaces
              {...register("cardNumber", {
                onChange: (e) => {
                  const formatted = formatCardNumber(e.target.value);
                  e.target.value = formatted;
                  setValue('cardNumber', formatted.replace(/\s/g, '')); // Remove spaces for validation
                }
              })}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                maxLength={5} // MM/YY format
                {...register("expiryDate", {
                  onChange: (e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    e.target.value = formatted;
                    setValue('expiryDate', formatted);
                  }
                })}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                maxLength={4}
                type="password"
                {...register("cvv", {
                  onChange: (e) => {
                    const formatted = formatCVV(e.target.value);
                    e.target.value = formatted;
                    setValue('cvv', formatted);
                  }
                })}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="payment-form"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay ${calculateDiscountedPrice(plan)}`}
        </Button>
      </CardFooter>
    </Card>
  );
}