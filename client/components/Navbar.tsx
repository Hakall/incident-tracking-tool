import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  active: string;
}

const Navbar = ({ active }: NavbarProps) => {
  return (
    <div className={"navbar columns"}>
      <div className={"logo-container"}>
        <Image src={"/logo.svg" as any} alt="logo" width={48} height={48} />
      </div>
      <div
        className={`column is-one-fifth is-offset-one-fifth navbar-link-container ${
          active === "form" ? "active" : ""
        }`}
      >
        <Link href="/form">
          <a>Création d'incident</a>
        </Link>
      </div>
      <div
        className={`column is-one-fifth navbar-link-container ${
          active === "incidents" ? "active" : ""
        }`}
      >
        <Link href="/incidents">
          <a>Liste des incidents</a>
        </Link>
      </div>
      <div
        className={`column is-one-fifth navbar-link-container ${
          active === "incidentsByDateAndProduct" ? "active" : ""
        }`}
      >
        <Link href="/incidentsByDateAndProduct">
          <a>Monitoring des incidents</a>
        </Link>
      </div>
    </div>
  );
};

export { Navbar };
