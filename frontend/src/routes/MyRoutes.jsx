import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/adminPages/AdminLogin";
import AdminRegister from "../pages/adminPages/AdminRegister";
import AddProducts from "../pages/adminPages/AddProducts";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import Shop from "../pages/Shop";
import ViewOrders from "../pages/adminPages/ViewOrders";
import SingleProduct from "../pages/SingleProduct";

import Cart from "../pages/Cart";
import Success from "../pages/payment/Success";
import CancelPage from "../pages/payment/Cancel";
import AdminViewProducts from "../pages/adminPages/AdminViewProducts";

//   const { cart, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);

//   const availableProducts = [
//     // Example products, can be replaced by dynamic data
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 30 },
//   ];

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   const handleUpdateQuantity = (id, quantity) => {
//     updateQuantity(id, quantity);
//   };

//   const handleRemoveFromCart = (id) => {
//     removeFromCart(id);
//   };

//   console.log('card count on page 1',cart)

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Page 1: Manage Cart</h1>

//       {/* Available Products Section */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {availableProducts.map((product) => (
//             <div key={product.id} className="bg-white border rounded-lg shadow-lg p-4 text-center">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
//               <p className="text-lg text-gray-600 mb-4">${product.price}</p>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Cart Section */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Cart</h2>
//         {cart.length === 0 ? (
//           <p className="text-gray-600">Your cart is empty.</p>
//         ) : (
//           cart.map((item) => (
//             <div key={item.id} className="bg-white border rounded-lg shadow-lg p-4 mb-4">
//               <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
//               <p className="text-lg text-gray-600">Price: ${item.price}</p>
//               <p className="text-lg text-gray-600">Quantity: {item.quantity}</p>
//               <div className="mt-4 flex justify-between items-center">
//                 {/* Increase Quantity Button */}
//                 <button
//                   onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                   className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300"
//                 >
//                   Increase
//                 </button>
//                 {/* Decrease Quantity Button */}
//                 <button
//                   onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                   className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
//                 >
//                   Decrease
//                 </button>
//                 {/* Remove from Cart Button */}
//                 <button
//                   onClick={() => handleRemoveFromCart(item.id)}
//                   className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// const Page2 = () => {
//   const { cart, getTotalQuantity, getTotalPrice } = useContext(CartContext);

//   // Use useState and useEffect to update the cart count and total price
//   const [cartCount, setCartCount] = useState(getTotalQuantity());
//   const [totalPrice, setTotalPrice] = useState(getTotalPrice());

//   // Update cart count and total price when cart changes
//   useEffect(() => {
//     setCartCount(getTotalQuantity());
//     setTotalPrice(getTotalPrice());
//   }, [cart]); // Re-run when cart changes

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Page 2: Cart Details</h1>

//       <div className="cart-items">
//         {cart.map((item) => (
//           <div key={item.id} className="cart-item">
//             <h2>{item.name}</h2>
//             <p>Quantity: {item.quantity}</p>
//             <p>Total Price: ${item.totalPrice }</p> {/* Display individual item total price */}
//           </div>
//         ))}
//       </div>

//       <p className="text-lg text-gray-700 mt-4">
//         Your cart has {cartCount} {cartCount === 1 ? 'item' : 'items'}.
//       </p>
//       <p className="text-lg text-gray-700 mt-4">
//         Total Price: ${totalPrice} {/* Display the grand total price */}
//       </p>
//     </div>
//   );
// };

export default function MyRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/addproducts" element={<AddProducts />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/viewOrders" element={<ViewOrders />} />
        <Route path="/admin/viewProducts" element={<AdminViewProducts />} />
        <Route path="/productdetails/:id" element={<SingleProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<CancelPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
