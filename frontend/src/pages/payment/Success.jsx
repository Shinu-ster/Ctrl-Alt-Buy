
import { useNavigate } from 'react-router-dom';  // React Router for navigation

const Success = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Center the checkmark icon */}
        <div className="flex justify-center items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-4">Thank you for your purchase. Your payment has been completed successfully.</p>
        <button 
          onClick={handleBackToShopping} 
          className="bg-green-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-600 transition"
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
