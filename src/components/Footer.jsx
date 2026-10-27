import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 border-t">
      {/* Sử dụng flex flex-row để ép GET HELP, SUPPORT, REGISTER nằm cùng 1 hàng ngang */}
      <div className="container mx-auto flex flex-row justify-between gap-8 px-4 py-8 text-sm">

        {/* Col 1: GET HELP */}
        <div className="w-1/3">
          <h3 className="font-bold text-black mb-3 text-base">
            GET HELP
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Nike</a></li>
            <li><a href="#" className="hover:underline">Adidas</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Col 2: SUPPORT */}
        <div className="w-1/3">
          <h3 className="font-bold text-black mb-3 text-base">
            SUPPORT
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
            <li><a href="#" className="hover:underline">Phone</a></li>
          </ul>
        </div>

        {/* Col 3: REGISTER */}
        <div className="w-1/3">
          <h3 className="font-bold text-black mb-3 text-base">
            REGISTER
          </h3>
          <ul className="space-y-2">
            <li><a href="/register" className="hover:underline">Register</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

      </div>

      {/* Dòng bản quyền */}
      <div className="bg-gray-200 text-center py-4 text-xs text-gray-500">
        © 2022 Cybersoft All Rights Reserved | Design Theme
      </div>
    </footer>
  );
}