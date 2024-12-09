import { useNavigate } from 'react-router-dom';  

function CancelPage() {
  const navigate = useNavigate(); 

  const handleBackToShopping = () => {
    navigate('/shop');  
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      {/* Center the cancel icon */}
      <div className="flex justify-center items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Payment Cancelled</h1>
      <p className="text-lg text-gray-600 mb-4">Your payment was not successful. Please try again.</p>
      <button 
        onClick={handleBackToShopping} 
        className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-600 transition"
      >
        Back to Shopping
      </button>
    </div>
  </div>
  )
}

export default CancelPage
