"use client";

import { client } from "@/sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaStar, FaArrowLeft, FaPlus, FaMinus, FaCheckCircle, FaTimes, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useParams } from "next/navigation";

const sanityToken = process.env.NEXT_PUBLIC_SANITY_TOKEN;


const getProduct = async (id: string) => {
  const query = `*[_type == "menuItem" && _id == $id][0]{
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    category->{_id, title} 
  }`;
  return await client.fetch(query, { id });
};


const getRelatedProducts = async (catId: string, currentId: string) => {
  const query = `*[_type == "menuItem" && category._ref == $catId && _id != $currentId][0...3]{
    _id,
    name,
    price,
    "imageUrl": image.asset->url,
    category->{title}
  }`;
  return await client.fetch(query, { catId, currentId });
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedItems, setRelatedItems] = useState<any[]>([]); 
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Modal & Form States
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", payment: "cod" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProduct(id as string).then((data) => {
        setProduct(data);
        
      
        if (data && data.category) {
          getRelatedProducts(data.category._id, data._id).then((related) => {
            setRelatedItems(related);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, [id]);

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sanityToken) { alert("Error: Token missing"); return; }
    setIsSubmitting(true);

    const orderDoc = {
      _type: 'order',
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.payment,
      items: [{ _key: product._id, name: product.name, qty: qty, price: product.price }],
      total: product.price * qty,
      status: 'pending'
    };

    try {
      await client.withConfig({ token: sanityToken }).create(orderDoc);
      setShowOrderModal(false);
      setFormData({ name: "", phone: "", address: "", payment: "cod" });
      setQty(1);
      setNotification("Order Placed Successfully! 🎉");
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">Product Not Found</div>;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-orange-500 selection:text-white relative pb-20">
      
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -20, x: "-50%" }} className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-green-400">
            <FaCheckCircle className="text-xl" /> <span className="font-bold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-24 left-6 z-10">
        <Link href="/menu" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
           <FaArrowLeft /> Back to Menu
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Main Product Image */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="relative h-[400px] lg:h-[500px] w-full bg-[#161616] rounded-[40px] border border-white/5 p-10 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-orange-600/10 rounded-full blur-[100px]"></div>
             {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-contain drop-shadow-2xl" />}
          </motion.div>

          {/* Main Product Details */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-500/20">{product.category?.title}</span>
                  <div className="flex text-yellow-500 text-sm"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
               </div>
               <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{product.name}</h1>
               <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-8 border-y border-white/10 py-8">
               <div className="text-4xl font-bold"><span className="text-orange-500 text-lg mr-1">Rs.</span>{product.price * qty}</div>
               <div className="flex items-center gap-4 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/10">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition"><FaMinus className="text-xs"/></button>
                  <span className="text-xl font-bold w-6 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition"><FaPlus className="text-xs"/></button>
               </div>
            </div>

            <button onClick={() => setShowOrderModal(true)} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-3 transform active:scale-95">
              Order Now <FaShoppingCart />
            </button>
            <p className="text-sm text-gray-500 flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Free Delivery within 20 mins</p>
          </motion.div>
        </div>

        {/* ⭐ RELATED PRODUCTS SECTION ⭐ */}
        {relatedItems.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">You might also like 😋</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link href={`/menu/${item._id}`} key={item._id} className="group bg-[#1a1a1a] p-4 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all hover:-translate-y-2">
                  <div className="relative h-48 w-full mb-4 rounded-2xl overflow-hidden bg-[#111]">
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors line-clamp-1">{item.name}</h3>
                  <p className="text-orange-500 font-bold mt-1">Rs. {item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ORDER MODAL */}
      <AnimatePresence>
        {showOrderModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]" onClick={() => setShowOrderModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] bg-[#161616] w-full max-w-lg p-8 rounded-[30px] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout Details</h2>
                <button onClick={() => setShowOrderModal(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><FaTimes /></button>
              </div>
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border border-white/5 flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#222] rounded-lg overflow-hidden relative">
                     {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />}
                  </div>
                  <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-400">Qty: {qty} x Rs.{product.price}</p>
                  </div>
                  <div className="ml-auto text-xl font-bold text-orange-500">Rs. {product.price * qty}</div>
                </div>
                <div className="space-y-3">
                   <div className="relative"><FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input required type="text" placeholder="Full Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                   <div className="relative"><FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input required type="tel" placeholder="Phone Number" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                   <div className="relative"><FaMapMarkerAlt className="absolute left-4 top-4 text-gray-500" /><textarea required rows={2} placeholder="Delivery Address" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button type="button" onClick={() => setFormData({...formData, payment: 'cod'})} className={`py-3 rounded-xl border font-bold text-sm flex flex-col items-center gap-1 transition-all ${formData.payment === 'cod' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}><FaMoneyBillWave className="text-lg" /> Cash On Delivery</button>
                   <button type="button" onClick={() => setFormData({...formData, payment: 'card'})} className={`py-3 rounded-xl border font-bold text-sm flex flex-col items-center gap-1 transition-all ${formData.payment === 'card' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}><FaCreditCard className="text-lg" /> Card Payment</button>
                </div>
                <button disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition mt-4 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 disabled:opacity-50">{isSubmitting ? "Processing..." : "Confirm Order"} <FaCheckCircle /></button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}