import { Navbar } from "../components/Navbar";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar active={""} />
      <div className={"logo-container"}>
        <Image src={"/logo.svg" as any} alt="logo" width={256} height={256} />
        <div className={"title"}>Incident Tool Tracking</div>
      </div>
    </div>
  );
}
