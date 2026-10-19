import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-black text-white">
      {/* Top Bar: Logo & Navigation Right (Search, Cart, Login, Register) */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wider">
          CYBERLEARN
        </Link>

        {/* Right Action Menu */}
        <div className="flex items-center space-x-6 text-sm">
          <Link to="/search" className="flex items-center space-x-1 hover:text-gray-300">
            <span>🔍</span>
            <span>Search</span>
          </Link>
          
          <Link to="/carts" className="flex items-center space-x-1 hover:text-gray-300">
            <span>🛒</span>
            <span>(0)</span>
          </Link>

          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="bg-gray-100 text-black border-t">
        <div className="container mx-auto flex space-x-8 px-4 py-2 text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "border-b-2 border-black pb-1 font-bold" : "hover:text-gray-600"}>Home</NavLink>
          <NavLink to="/men" className={({ isActive }) => isActive ? "border-b-2 border-black pb-1 font-bold" : "hover:text-gray-600"}>Men</NavLink>
          <NavLink to="/woman" className={({ isActive }) => isActive ? "border-b-2 border-black pb-1 font-bold" : "hover:text-gray-600"}>Woman</NavLink>
          <NavLink to="/kid" className={({ isActive }) => isActive ? "border-b-2 border-black pb-1 font-bold" : "hover:text-gray-600"}>Kid</NavLink>
          <NavLink to="/sport" className={({ isActive }) => isActive ? "border-b-2 border-black pb-1 font-bold" : "hover:text-gray-600"}>Sport</NavLink>
        </div>
      </nav>
    </header>
  );
}