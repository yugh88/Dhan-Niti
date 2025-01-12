"use client";
import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Provider({ children }: { children?: React.ReactNode }) {
  const [userDetail, setUserDetail]: any = useState();
  const { user } = useUser();

  useEffect(() => {
    user && saveNewUserIFNotExist();
  }, [user]);

  const saveNewUserIFNotExist = async () => {
    const userResponse = await db
      .select()
      .from(Users)
      .where(
        eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
      );
    if (!userResponse[0]) {
      const result = await db
        .insert(Users)
        .values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName,
        })
        .returning({
          userEmail: Users.userEmail,
          userName: Users.userName,
          userImage: Users.userImage,
          credits: Users.credit,
        });

      setUserDetail(result[0]);
    } else {
      setUserDetail(userResponse[0]);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "" }}
      >
        <NextUIProvider>
          <Header />
          {children}
          <ToastContainer />
        </NextUIProvider>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
