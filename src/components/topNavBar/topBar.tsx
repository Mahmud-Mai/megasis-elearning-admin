"use client";
import Link from "next/link";
import React from "react";
import ImageAvater from "../imageAvater/imageAvater";
import topBarStyle from "./topBar.module.css";

export default function TopBar({ title }: { title?: string }) {
  return (
    <div
      className="p-4 m-0 h-[60px] flex flex-row items-center justify-start"
      style={{
        backgroundColor: "white",
        padding: "0",
        margin: "0",
        position: "sticky",
        top: "0",
        zIndex: "10",
        right: "0",
        width: "100%"
      }}
    >
      <div className="ms-20 md:text-center sm:text-center uppercase font-bold">
        {title == "" ? "Admin Dashboard" : title ?? "Admin Dashboard"}
      </div>
    </div>
  );
}
