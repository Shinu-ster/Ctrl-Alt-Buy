import Slider from "react-slick"; // React-slick for carousel
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoToShopping = () => {
    navigate("/shop"); // Navigate to the shop page
  };

  const bannerImages = [
    "/banner/banner1.jpg",
    "/banner/banner2.jpg",
    "/banner/banner3.jpg",
  ];

  const categories = [
    { name: "Keyboards", image: "/categories/keyboards.jpg" },
    { name: "Mice", image: "/categories/mice.jpg" },
    { name: "Headsets", image: "/categories/headset.jpg" },
    { name: "Controllers", image: "/categories/controllers.jpeg" },
  ];

  const featuredProducts = [
    {
      name: "Mechanical Keyboard",
      image: "/products/keyboard.jpg",
      price: "$89.99",
    },
    {
      name: "Gaming Mouse",
      image: "/products/mouse.jpg",
      price: "$59.99",
    },
    {
      name: "Wireless Headset",
      image: "/products/headset.jpg",
      price: "$129.99",
    },
    {
      name: "Gaming Controller",
      image: "/products/controller.jpg",
      price: "$69.99",
    },
  ];

  const reviews = [
    {
      name: "Gadafi",
      image: "/reviews/gadafi.jpeg",
      review:
        "Amazing products! The quality of the gaming headset I purchased exceeded my expectations. Highly recommend this store.",
    },
    {
      name: "Mr. Lakhe",
      image: "/reviews/lakhe.jpeg",
      review:
        "Fast shipping and great customer service. The mechanical keyboard is a game-changer for my setup!",
    },
    {
      name: "Gamer Khadgi",
      image: "/reviews/girl.jpg",
      review:
        "Love the gaming mouse I got from here. The precision and ergonomics are top-notch. Will shop again.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      {/* Banner Section */}
      <Slider {...sliderSettings} className="overflow-hidden">
        {bannerImages.map((image, index) => (
          <div key={index} className="relative w-full h-[400px]">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>



      {/* Categories Section */}
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
            {/* Go to Shopping Button */}
            <div className="flex justify-center my-8">
        <button
          onClick={handleGoToShopping}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        >
          Go to Shopping
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="py-8 px-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="font-semibold">{review.name}</p>
              <p className="text-gray-600 mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
