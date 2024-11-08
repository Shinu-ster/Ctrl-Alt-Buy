import React from "react";
import { Link } from "react-router-dom";
import { IconButton, InputBase, Badge } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon } from "@mui/icons-material";

const Navbar = () => {
  // const cartItems = 5; 

  return (
    <nav className="bg-[#4CAF50] text-white p-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyShop</Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center border border-white rounded-md px-3 py-1 w-1/3 space-x-2">
          <InputBase
            placeholder="Search products..."
            sx={{ color: "white", width: "100%" }}
          />
          <IconButton type="submit" sx={{ color: "white" }}>
            <SearchIcon />
          </IconButton>
        </div>

        {/* Cart Icon with Badge (Desktop) */}
        <div className="hidden md:block relative">
          <Link to="/cart">
            <IconButton>
              <Badge
                // badgeContent={cartItems}
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile View (Menu) */}
      <div className="md:hidden mt-4 space-y-4 px-4">
        <div className="w-full flex items-center border border-white rounded-md px-3 py-1">
          <InputBase
            placeholder="Search..."
            sx={{ color: "white", width: "100%" }}
          />
          <IconButton type="submit" sx={{ color: "white" }}>
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex items-center justify-between">
            <IconButton>
              <Badge
                // badgeContent={}
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
