import NavDropdown from "react-bootstrap/NavDropdown";
import { menus } from "@/constants";
import Link from "next/link";

export default function FuntoNavbar() {
  return (
    <div className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
      {/* <NavDropdown className="ft-dd" title="Explore" id="Explore"> */}


      {menus.map((menu) => (
          menu.childrens.length==0?<Link href={menu.url} key={menu.url}>
          <a>
            <div >
              {menu.name}
            </div>
          </a>
        </Link>:

      <NavDropdown className="ft-dd" title={menu.name}> 
      {
        menu.childrens.map((children)=>
        
        <Link href={children.url} key={children.url}>
          <a>
            <div >
              {children.name}
            </div>
          </a>
        </Link>
        )
      }
    </NavDropdown> 


        ))}
      {/* </NavDropdown> */}

      {/* <NavDropdown className="ft-dd" title="Explore" id="Explore">
        <Link href="/explore1">Explore 1</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/featured-items">Featured Drops</Link>
        <Link href="/live-bidding">Live Auctions</Link>
        <Link href="/collections">Collections</Link>
        <Link href="/top-seller">Top Seller</Link>
        <Link href="/top-buyer">Top Buyer</Link>
        <Link href="/live-bid/1">Item Details</Link>
      </NavDropdown> */}

      {/* <NavDropdown className="ft-dd" title="Admin" id="Admin"> */}
      {/* <Link href="/live-bids">Live Bids</Link>
        <Link href="/my-collection">My Collection</Link>
        <Link href="/my-wallet">My Wallet</Link>
        <Link href="/notifications">Notifications</Link>
        <Link href="/settings">Settings</Link> */}
      {/* </NavDropdown> */}
{/* 
      <NavDropdown className="ft-dd" title="Pages" id="Pages">
        <Link href="/activity">Activity</Link>
        <Link href="/ranking">Ranking</Link>
        <Link href="/create-new">Create New Items</Link>
        <Link href="/connect-wallet">Connect Wallet</Link>
        <Link href="/author/designing_world">Author Profile</Link>

        <NavDropdown
          className="ft-dd"
          title="Authentification"
          id="Authentification"
          drop="end"
        >
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/forget-password">Forget Password</Link>
        </NavDropdown>

        <NavDropdown className="ft-dd" title="Blog" id="Blog" drop="end">
          <Link href="/blog">Blog</Link>
          <Link href="/blog-details/1">Blog Details</Link>
        </NavDropdown>

        <NavDropdown className="ft-dd" title="Others" id="Others" drop="end">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/404">404</Link>
        </NavDropdown>

        <NavDropdown
          className="ft-dd"
          title="Help Center"
          id="HelpCenter"
          drop="end"
        >
          <Link href="/help-center">Help Home</Link>
          <Link href="/help-center/licenses">All Questions</Link>
          <Link href="/help-question-details/1">Question Details</Link>
        </NavDropdown>
      </NavDropdown> */}

      {/* <Link href="/help-center">Help Center</Link> */}
      {/* <Link href="/dashboard">Dashboard</Link> */}
    </div>
  );
}
