"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const DashboardHeader = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="font-bold text-3xl">My Stories</h2>
      <div className="flex gap-3 items-center">
        <Image
          src={"/coin.png"}
          alt="Payment"
          height={50}
          width={50}
          className="rounded-lg bg-transparent"
        />
        <span className="text-2xl">{userDetail?.credit} Credit Left</span>
        <Link href={"/buy-credit"}>
          <Button color="secondary" className="text-1xl p-3" variant="solid">
            Buy Credit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
