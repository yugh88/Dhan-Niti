"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create Story",
      path: "/create-story",
    },
    {
      name: "Explore Story",
      path: "/explore-story",
    },
    {
      name: "Contact us",
      path: "/contact-us",
    },
  ];

  const { user, isSignedIn } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-5">
      <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <Link href="/">
            <NavbarBrand>
              <Image
                src={"/logo.png"}
                height={40}
                width={30}
                alt="Company Logo"
              />
              <h3 className="font-bold text-2xl text-primary ml-3">
                FinanceTeller
              </h3>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        <NavbarContent justify="center" className="hidden sm:flex">
          {MenuList.map((item, index) => (
            <NavbarItem key={index}>
              <Link color="foreground" href={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <Link href={"/dashboard"}>
            <Button color="primary" variant="ghost">
              {isSignedIn ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
          <UserButton />
        </NavbarContent>

        <NavbarMenu>
          {MenuList.map((item, index) => (
            <NavbarItem key={index}>
              <Link color="foreground" href={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;
