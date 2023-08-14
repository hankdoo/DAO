import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function FuntoNavbar() {
  return (
    <div className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
      <NavLink href="/home">Home</NavLink>

      <NavDropdown className="ft-dd" title="Explore" id="Explore">
        {/* <NavLink href="/explore1">Explore 1</NavLink> */}
        <NavLink href="/explore">Explore</NavLink>
        <NavLink href="/featured-items">Featured Drops</NavLink>
        <NavLink href="/live-bidding">Live Auctions</NavLink>
        <NavLink href="/collections">Collections</NavLink>
        <NavLink href="/top-seller">Top Seller</NavLink>
        <NavLink href="/top-buyer">Top Buyer</NavLink>
        {/* <NavLink href="/live-bid/1">Item Details</NavLink> */}
      </NavDropdown>

      {/* <NavDropdown className="ft-dd" title="Admin" id="Admin"> */}
      {/* <NavLink href="/live-bids">Live Bids</NavLink>
        <NavLink href="/my-collection">My Collection</NavLink>
        <NavLink href="/my-wallet">My Wallet</NavLink>
        <NavLink href="/notifications">Notifications</NavLink>
        <NavLink href="/settings">Settings</NavLink> */}
      {/* </NavDropdown> */}

      <NavDropdown className="ft-dd" title="Pages" id="Pages">
        <NavLink href="/activity">Activity</NavLink>
        <NavLink href="/ranking">Ranking</NavLink>
        <NavLink href="/create-new">Create New Items</NavLink>
        {/* <NavLink href="/connect-wallet">Connect Wallet</NavLink> */}
        <NavLink href="/author/designing_world">Author Profile</NavLink>

        <NavDropdown
          className="ft-dd"
          title="Authentification"
          id="Authentification"
          drop="end"
        >
          <NavLink href="/register">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/forget-password">Forget Password</NavLink>
        </NavDropdown>

        <NavDropdown className="ft-dd" title="Blog" id="Blog" drop="end">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/blog-details/1">Blog Details</NavLink>
        </NavDropdown>

        <NavDropdown className="ft-dd" title="Others" id="Others" drop="end">
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/newsletter">Newsletter</NavLink>
          <NavLink href="/privacy">Privacy Policy</NavLink>
          <NavLink href="/terms">Terms</NavLink>
          <NavLink href="/404">404</NavLink>
        </NavDropdown>

        <NavDropdown
          className="ft-dd"
          title="Help Center"
          id="HelpCenter"
          drop="end"
        >
          <NavLink href="/help-center">Help Home</NavLink>
          <NavLink href="/help-center/licenses">All Questions</NavLink>
          <NavLink href="/help-question-details/1">Question Details</NavLink>
        </NavDropdown>
      </NavDropdown>

      <NavLink href="/help-center">Help Center</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
    </div>
  );
}
