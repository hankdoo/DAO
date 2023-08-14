import { useState } from "react";
// import Link from "next/link";;
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import FuntoNavbar from "./Nav";
import { menus } from "@/constants";
import Link from "next/link";
import FuntoNavbar from "./Nav";
import { ConnectWallet } from "@/components";
// import useStickyHeader from "./StickyHeader";
// import ConnectWallet from "../../pages/ConnectWallet";
import brandLogo  from  "./../../assets/img/core-img/logo.png";
import darkLogo from "./../../assets/img/core-img/logo-white.png";
import Image from "next/image";
import SearchForm from "./SearchForm";
export default function Header() {

  let [check] = useState(true);
  // const sticky = useStickyHeader(10);
  // const stickyClass = `${sticky && check ? "sticky-on" : ""}`;
  const stickyClass = `sticky-on`;

  
  return (
    <header className={`header-area ${stickyClass}`}>
      <Navbar expand="lg">
        <Container>
          <div className="navbar-brand">
          <Link href={"/"} >
          <Image src={brandLogo} className="light-logo"/>
          
          </Link>
          </div>
          <SearchForm />

            {/* <Image src={darkLogo} className="dark-logo"/> */}


          {/* Navbar Toggler */}
          <Navbar.Toggle className="navbar-toggler" aria-controls="funtoNav" />

          {/* Navbar */}
          <Navbar.Collapse id="funtoNav">
            {/* Navbar List */}
            <FuntoNavbar />

            {/* Header Meta */}
            
            <div className="header-meta d-flex align-items-center ms-lg-auto">

              {/* User Dropdown */}
              {/* <NavDropDown
                dropdownID="dropdownMenuButton1"
                toggleIcon="bi-three-dots"
                dropdownList={[
                  {
                    div: "Dashboard",
                    url: "/dashboard",
                    icon: "bi-speedometer2",
                  },
                  {
                    div: "Collections",
                    url: "/collections",
                    icon: "bi-collection",
                  },
                  {
                    div: "Notifications",
                    url: "/notifications",
                    icon: "bi-bell",
                  },
                  {
                    div: "Settings",
                    url: "/settings",
                    icon: "bi-gear",
                  },
                ]}
              /> */}

              {/* Create New Button */}
              {/* <CreateNewButton
                buttonColor="btn-warning"
                buttonURL="/create-new"
                buttondiv="Create New"
              /> */}
              <ConnectWallet />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
