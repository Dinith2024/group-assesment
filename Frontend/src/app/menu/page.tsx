"use client";

import { client } from "@/sanity";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaSearch, FaFilter, FaCheckCircle, FaTrash, FaTimes, FaPlus, FaMinus, FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 

// Sanity Token
const sanityToken = process.env.NEXT_PUBLIC_SANITY_TOKEN;

const getData = async () => {
  const categoriesQuery = `*[_type == "category"]{_id, title}`;
  const productsQuery = `*[_type == "menuItem"]{_id, name, price, description, "imageUrl": image.asset->url, category->{title}}`;
  return { products: await client.fetch(productsQuery), categories: await client.fetch(categoriesQuery) };
};


function MenuContent() {
  const searchParams = useSearchParams(); 
  const urlCategory = searchParams.get("category"); 

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  

  const [activeCategory, setActiveCategory] = useState("All"); 

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Cart & Checkout States
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart');
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", payment: "cod" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data Fetching
  useEffect(() => {
    getData().then((data) => {
      setProducts(data.products);
      setCategories(data.categories);
      setLoading(false);
    });
  }, []);

 
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  // --- Cart Logic ---
  const addToCart = (product: any) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      return exist ? prev.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.name} Added! 🍔`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((item) => item._id !== id));
  
  const updateQty = (id: string, amount: number) => {
    setCart((prev) => prev.map((item) => item._id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  // --- Order Logic ---
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sanityToken) { alert("Error: Token Missing"); return; }
    setIsSubmitting(true);

    const orderDoc = {
      _type: 'order',
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.payment,
      items: cart.map(item => ({ _key: item._id, name: item.name, qty: item.qty, price: item.price })),
      total: totalPrice,
      status: 'pending'
    };

    try {
      await client.withConfig({ token: sanityToken }).create(orderDoc);
      setCart([]); setCheckoutStep('cart'); setIsCartOpen(false);
      setFormData({ name: "", phone: "", address: "", payment: "cod" });
      setNotification("Order Placed Successfully! 🎉");
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category?.title === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -20, x: "-50%" }} className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-green-400">
            <FaCheckCircle className="text-xl" /> <span className="font-bold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-32 pb-10 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our <span className="text-orange-500">Menu</span></h1>
          <div className="mt-8 relative max-w-md mx-auto">
            <input type="text" placeholder="Search for food..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#222] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all" />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 pb-32">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Categories Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="sticky top-24 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-500"><FaFilter /> Categories</h3>
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                <button onClick={() => setActiveCategory("All")} className={`px-4 py-2 rounded-xl text-sm font-bold text-left transition-all ${activeCategory === "All" ? "bg-orange-600 text-white" : "bg-[#222] text-gray-400 hover:text-white"}`}>All Items</button>
                {categories.map((cat: any) => (
                  <button key={cat._id} onClick={() => setActiveCategory(cat.title)} className={`px-4 py-2 rounded-xl text-sm font-bold text-left transition-all ${activeCategory === cat.title ? "bg-orange-600 text-white" : "bg-[#222] text-gray-400 hover:text-white"}`}>{cat.title}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            {loading ? <div className="text-center py-20">Loading Menu...</div> : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((item: any) => (
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={item._id} className="bg-[#1a1a1a] rounded-[24px] p-4 border border-white/5 hover:border-orange-500/30 transition-all flex flex-col hover:-translate-y-1 hover:shadow-xl">
                      <Link href={`/menu/${item._id}`} className="block flex-1 group">
                        <div className="relative h-48 w-full mb-4 rounded-2xl overflow-hidden bg-[#111]">
                          {item.imageUrl ? <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" /> : null}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">{item.name}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8">{item.description}</p>
                      </Link>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                         <span className="text-xl font-bold text-white"><span className="text-orange-500 text-sm align-top mr-1">Rs.</span>{item.price}</span>
                         <button onClick={(e) => { e.preventDefault(); addToCart(item); }} className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 active:scale-95 z-10">ADD <FaShoppingCart /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-[#1a1a1a] rounded-2xl border border-white/5">
                <p className="text-xl text-gray-400">No items found in {activeCategory} category.</p>
                <button onClick={() => setActiveCategory("All")} className="mt-4 text-orange-500 underline">View All Items</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Button */}
      <motion.button onClick={() => setIsCartOpen(true)} className="fixed bottom-8 right-8 z-40 bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <FaShoppingCart className="text-2xl" />
        {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#0f0f0f]">{cart.reduce((acc, i) => acc + i.qty, 0)}</span>}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#161616] z-[60] shadow-2xl border-l border-white/10 flex flex-col">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                <h2 className="text-xl font-bold flex items-center gap-2">{checkoutStep === 'cart' ? `Cart (${cart.length})` : 'Checkout'}</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition"><FaTimes /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#111]">
                {checkoutStep === 'cart' && (
                  <div className="space-y-4">
                    {cart.length === 0 ? <p className="text-center text-gray-500 mt-10">Cart is empty</p> : cart.map((item) => (
                      <div key={item._id} className="bg-[#0f0f0f] p-4 rounded-2xl flex gap-4 border border-white/5">
                        <div className="w-16 h-16 bg-[#222] rounded-xl overflow-hidden relative flex-shrink-0">{item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}</div>
                        <div className="flex-1"><div className="flex justify-between"><h4 className="font-bold line-clamp-1">{item.name}</h4><button onClick={() => removeFromCart(item._id)} className="text-red-500"><FaTrash /></button></div><p className="text-orange-500 font-bold text-sm">Rs. {item.price * item.qty}</p><div className="flex items-center gap-3 mt-2 bg-[#222] w-max px-2 py-1 rounded-lg"><button onClick={() => updateQty(item._id, -1)} className="w-6 h-6 flex justify-center items-center hover:bg-white/10"><FaMinus className="text-xs" /></button><span className="text-sm font-bold w-4 text-center">{item.qty}</span><button onClick={() => updateQty(item._id, 1)} className="w-6 h-6 flex justify-center items-center hover:bg-white/10"><FaPlus className="text-xs" /></button></div></div>
                      </div>
                    ))}
                  </div>
                )}
                {checkoutStep === 'form' && (
                  <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
                     <button type="button" onClick={() => setCheckoutStep('cart')} className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-4"><FaArrowLeft /> Back to Cart</button>
                     <div className="relative"><FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input required type="text" placeholder="Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                     <div className="relative"><FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input required type="tel" placeholder="Phone" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                     <div className="relative"><FaMapMarkerAlt className="absolute left-4 top-4 text-gray-500" /><textarea required rows={3} placeholder="Address" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea></div>
                     <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setFormData({...formData, payment: 'cod'})} className={`py-3 rounded-xl border text-sm font-bold ${formData.payment === 'cod' ? 'bg-orange-600 border-orange-600' : 'bg-[#0a0a0a] border-white/10'}`}>Cash</button>
                        <button type="button" onClick={() => setFormData({...formData, payment: 'card'})} className={`py-3 rounded-xl border text-sm font-bold ${formData.payment === 'card' ? 'bg-orange-600 border-orange-600' : 'bg-[#0a0a0a] border-white/10'}`}>Card</button>
                     </div>
                     <div className="bg-[#0f0f0f] p-4 rounded-xl border border-white/5 mt-4"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>Rs. {totalPrice}</span></div></div>
                  </form>
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 bg-[#1a1a1a] border-t border-white/10">
                  {checkoutStep === 'cart' ? (
                     <button onClick={() => setCheckoutStep('form')} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition">Checkout</button>
                  ) : (
                     <button form="checkout-form" disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition disabled:opacity-50">{isSubmitting ? "Processing..." : "Confirm Order"}</button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      <Suspense fallback={<div className="text-center py-20 text-white">Loading Menu...</div>}>
        <MenuContent />
      </Suspense>
    </main>
  );
}