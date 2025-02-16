
"use client";
import { useCart } from "../../../Context/cart";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { use } from "react";

const ProductDetail = ({ params }) => {
  // Unwrap params using `use()`
  const { slug } = use(params);

  const { cart, setCart } = useCart([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/product/get-product/${slug}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (res.ok && data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!Array.isArray(cart)) {
      setCart([]); // Ensure cart is an array
    }
    setCart((prevCart) => [...prevCart, product]);
    toast.success("Item Added to Cart");
  };

  if (loading) return <p className="text-center text-gray-500">Loading product details...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
      
      <div className="flex flex-col md:flex-row items-center">
        <Image
          src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg shadow-md"
        />

        <div className="md:ml-6 mt-4 md:mt-0">
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-semibold text-gray-800">Price: ${product.price}</p>

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
