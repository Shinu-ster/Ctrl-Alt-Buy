import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      <h3 className="text-xl font-bold mb-4">Ctrl Alt Buy</h3>
      <p>Address: Patan, Lalitpur</p>
      <p>Email: ctrlaltbuysupport@gmail.com | Phone: +1 234 567 890</p>
      <div className="flex justify-center mt-4 space-x-4">
        <a
          href="#"
          className="text-blue-400 hover:text-blue-500"
        >
          Facebook
        </a>
        <a
          href="#"
          className="text-blue-300 hover:text-blue-400"
        >
          Twitter
        </a>
        <a
          href="#"
          className="text-pink-400 hover:text-pink-500"
        >
          Instagram
        </a>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        © 2024 Ctrl Alt Buy. All rights reserved.
      </p>
    </div>
  </footer>
  )
}
