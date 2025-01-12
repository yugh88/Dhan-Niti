"use client";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const creditOptions = [
  {
    id: 1,
    price: 1.99,
    credits: 10,
  },
  {
    id: 2,
    price: 2.99,
    credits: 20,
  },
  {
    id: 3,
    price: 5.99,
    credits: 70,
  },
  {
    id: 4,
    price: 9.99,
    credits: 150,
  },
];

const BuyCredit = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Set to null for no selection
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);

  // Update price when a new option is selected
  useEffect(() => {
    if (selectedOption !== null) {
      const option = creditOptions.find((opt) => opt.id === selectedOption);
      if (option) {
        setSelectedPrice(option.price);
      } else {
        setSelectedPrice(0); // Reset price if no valid option is selected
      }
    }
  }, [selectedOption]);

  // On Payment success
  const OnPaymentSuccess = async () => {
    try {
      const selectedOptionDetails = creditOptions.find(
        (option) => option.id === selectedOption
      );

      if (!selectedOptionDetails || !userDetail) {
        throw new Error("Invalid option or user details");
      }

      const result = await db
        .update(Users)
        .set({
          credit: selectedOptionDetails.credits + userDetail?.credit,
        })
        .where(eq(Users.userEmail, userDetail.userEmail));

      if (result) {
        notify("Credit added successfully");
        setUserDetail((prev: any) => ({
          ...prev,
          credit: selectedOptionDetails.credits + userDetail?.credit,
        }));
        router.replace("/dashboard");
      } else {
        notifyError("Server Error");
      }
    } catch (error) {
      notifyError("Failed to add credits");
      console.error(error);
    }
  };

  // On cancel Payment
  const OnCancelPayment = () => {
    notifyError("Payment Cancelled");
    setSelectedPrice(0);
  };

  return (
    <div className="min-h-screen text-center p-10 md:px-20 lg:px-40">
      <h2 className="text-4xl font-bold text-primary my-10">
        Add more Credits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div>
          {creditOptions.map((option: any) => (
            <div
              key={option.id}
              className={`p-6 my-3 border bg-primary text-center rounded-lg cursor-pointer hover:scale-105 transition-all
              ${selectedOption === option.id ? "bg-secondary-900" : ""}
              `}
              onClick={() => setSelectedOption(option.id)}
            >
              <h2>
                Get {option.credits} Credits = {option.credits} Stories
              </h2>
              <h2 className="font-bold text-2xl">${option.price}</h2>
            </div>
          ))}
        </div>

        <div className="mx-5">
          {selectedPrice > 0 && (
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={!selectedOption}
              onApprove={() => OnPaymentSuccess()}
              onCancel={() => OnCancelPayment()}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: selectedPrice.toFixed(2),
                        currency_code: "USD",
                      },
                    },
                  ],
                  intent: "CAPTURE",
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
