import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation(); 


  const isActive = (path) => location.pathname === path;

  return (
    <aside className="h-screen w-72 bg-white shadow-md flex flex-col">
      <div className="flex items-center justify-center p-6 border-b">
        <img src="src/assets/logo.jpg" alt="Logo" className="w-36 h-auto" />
      </div>

      <nav className="flex-1 px-6 py-8 space-y-4">
        <ul>
          <Link to="/adminDashboard">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/adminDashboard") ? "bg-gray-200" : ""}`}
            >
              Dashboard
            </li>
          </Link>
          <Link to="/viewProducts">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/viewProducts") ? "bg-gray-200" : ""}`}
            >
              View Products
            </li>
          </Link>
          <Link to="/addProducts">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/addProducts") ? "bg-gray-200" : ""}`}
            >
              Add Products
            </li>
          </Link>
          <Link to="/viewOrders">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/orders") ? "bg-gray-200" : ""}`}
            >
              View Orders
            </li>
          </Link>
          <Link to="/settings">
            <li
              className={`hover:bg-gray-100 p-3 rounded-md ${isActive("/settings") ? "bg-gray-200" : ""}`}
            >
              Settings
            </li>
          </Link>
        </ul>
      </nav>

      <div className="border-t p-6 flex items-center">
        <img src="src/assets/profile-pic.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
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
