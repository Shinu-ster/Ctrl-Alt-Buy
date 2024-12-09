import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminAT');
    navigate('/admin/login');
  };

  return (
    <aside className="h-screen w-72 bg-white shadow-md flex flex-col">
      <div className="flex items-center justify-center p-10 border-b">
        <img src="/logo/NavLogo.png" alt="Logo" className="w-52 h-auto" />
      </div>

      <nav className="flex-1 px-6 py-8 space-y-4">
        <ul>
          <Link to="/admin/viewProducts">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/admin/viewProducts") ? "bg-gray-200" : ""}`}
            >
              View Products
            </li>
          </Link>
          <Link to="/admin/addProducts">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/admin/addProducts") ? "bg-gray-200" : ""}`}
            >
              Add Products
            </li>
          </Link>
          <Link to="/admin/viewOrders">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/admin/viewOrders") ? "bg-gray-200" : ""}`}
            >
              View Orders
            </li>
          </Link>
          <li
            className="hover:bg-gray-100 p-3 rounded-md cursor-pointer"
            onClick={handleLogout} // Adding the logout functionality here
          >
            Logout
          </li>
        </ul>
      </nav>

      <div className="border-t p-6 flex items-center">
        <img src="/admin/profile-pic.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
        <div className="border-l border-gray-200 h-14 mx-4"></div>
        <div>
          <h4 className="font-semibold text-lg">Admin</h4>
          <span className="text-gray-500 text-sm">Administrator</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
