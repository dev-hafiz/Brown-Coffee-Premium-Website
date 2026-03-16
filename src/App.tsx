/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  ShoppingBag, 
  Menu, 
  X, 
  Star, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatar?: string;
  coverImage?: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Signature Espresso", price: "৳180", image: "https://i.ibb.co.com/6J4mQg0N/unnamed.webp", category: "Hot Coffee" },
  { id: 2, name: "Caramel Frappé", price: "৳250", image: "https://i.ibb.co.com/vCFw2ZQb/unnamed.jpg", category: "Specialty" },
  { id: 3, name: "Iced Americano", price: "৳200", image: "https://i.ibb.co.com/nNFpZwcB/2023-09-06.jpg", category: "Cold Brew" },
  { id: 4, name: "Hazelnut Latte", price: "৳280", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", category: "Hot Coffee" },
];

const TESTIMONIALS: Testimonial[] = [
  { 
    id: 1, 
    name: "Rashed Mukith Sami", 
    rating: 5, 
    text: "Best coffee shop in Beanibazar! The environment is very peaceful and the coffee quality is top-notch.",
    avatar: "https://i.ibb.co.com/G30W0fCN/user1.png",
    coverImage: "https://i.ibb.co.com/MDSmTh5p/unnamed.jpg"
  },
  { 
    id: 2, 
    name: "Shabbir Ahmed", 
    rating: 5, 
    text: "Truly a premium experience. Their cold coffee is a must-try. Highly recommended for coffee lovers.",
    avatar: "https://i.ibb.co.com/ZpPbndcT/user2.png",
    coverImage: "https://i.ibb.co.com/67b9CDqY/unnamed.jpg"
  },
  { 
    id: 3, 
    name: "Tanvir Chowdhury", 
    rating: 5, 
    text: "Great place to hang out with friends. The staff are friendly and the service is excellent.",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 4, 
    name: "Rifat Jahan", 
    rating: 4, 
    text: "Loved the Hazelnut Latte. The interior design is very cinematic and cozy.",
    coverImage: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800"
  },
];

// --- Components ---

const Navbar = ({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
      <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-700 ${isScrolled ? 'scale-[0.98] md:scale-95' : 'scale-100'}`}>
        <div className={`flex justify-between items-center transition-all duration-700 rounded-2xl md:rounded-[2rem] px-4 md:px-8 ${isScrolled ? 'bg-espresso/60 backdrop-blur-xl py-2 md:py-3 shadow-2xl shadow-black/50' : 'bg-transparent py-0'}`}>
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-caramel/20 blur-md group-hover:bg-caramel/30 transition-all duration-700" />
              <img 
                src="https://i.ibb.co.com/0pfm53jH/326009096-575368037386275-7299997457018322443-n.jpg" 
                alt="Brown's Coffee Logo" 
                className="relative w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border border-caramel/50 shadow-xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-2xl font-serif-elegant italic text-white leading-none group-hover:text-caramel transition-colors duration-500">Brown Coffee</span>
              <span className="hidden sm:block text-[7px] uppercase tracking-[0.4em] text-caramel/60 font-bold mt-1">Artisanal Roasters</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Shop', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative text-[11px] uppercase tracking-[0.2em] font-bold text-cream/60 hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-caramel transition-all duration-500 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onCartClick}
              className="group relative p-3 bg-white/5 hover:bg-caramel rounded-full transition-all duration-500 hover:border-caramel"
            >
              <ShoppingBag className="w-4 h-4 text-cream group-hover:text-espresso transition-colors" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-white text-espresso text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={onCartClick} 
              className="p-2.5 bg-white/5 rounded-full relative"
            >
              <ShoppingBag className="w-4 h-4 text-cream" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-caramel text-espresso text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="p-2.5 bg-white/5 rounded-full text-cream" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 bg-espresso/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {['Home', 'Shop', 'About', 'Contact'].map((item, i) => (
                <motion.a 
                  key={item} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm uppercase tracking-[0.3em] font-bold text-cream/70 hover:text-caramel transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/60 to-espresso z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src="https://i.ibb.co.com/MkTpVQ5w/2023-09-06.webp" 
          alt="Brown Coffee Beanibazar Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-caramel uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
            Established 2023 • Artisanal Roastery
          </span>
          <div className="h-[1px] w-24 bg-caramel/30 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h1 className="text-[10vw] md:text-[7vw] font-perception leading-[0.9] tracking-tighter mb-8 text-white/95">
            Artisanal Coffee <br /> 
            <span className="text-caramel italic">Sylheti</span> Soul
          </h1>
          
          {/* Decorative floating text */}
          <div className="absolute -top-10 -left-10 opacity-10 hidden lg:block">
            <span className="text-8xl font-perception italic">Premium</span>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-cream/60 mb-16 max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
        >
          Awaken your senses with the soul of Sylhet. <br className="hidden md:block" /> 
          Experience coffee as a cinematic masterpiece, crafted with devotion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <a 
            href="#shop"
            className="group relative px-12 py-6 overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-caramel transition-transform duration-500 group-hover:scale-105" />
            <span className="relative z-10 text-espresso font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              Begin the Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a 
            href="#shop"
            className="group flex items-center gap-4 text-xs uppercase tracking-[0.4em] font-bold hover:text-caramel transition-colors"
          >
            <span>Explore Menu</span>
            <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-caramel transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* Floating Meta Info */}
      <div className="absolute bottom-12 left-12 z-20 hidden xl:block">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-caramel font-bold">Location</span>
          <span className="text-xs font-light text-cream/40 italic">Beanibazar, Sylhet</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-20 hidden xl:block">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-[10px] uppercase tracking-widest text-caramel font-bold">Open Daily</span>
          <span className="text-xs font-light text-cream/40 italic">08:00 AM — 11:00 PM</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-cream/30 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-caramel to-transparent" />
      </motion.div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  key?: React.Key;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 bg-white/5 border border-white/10 shadow-2xl shadow-black/40">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-cream/80 text-xs leading-relaxed font-light italic">
              Carefully selected beans from the highlands, roasted to perfection in our Beanibazar atelier.
            </p>
            <div className="w-8 h-[1px] bg-caramel/50 mx-auto" />
          </motion.div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 left-6">
          <span className="px-5 py-2 bg-black/40 backdrop-blur-xl text-[8px] uppercase tracking-[0.3em] font-bold rounded-full text-caramel border border-caramel/30">
            {product.category}
          </span>
        </div>

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#D4AF37' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="absolute bottom-6 left-6 right-6 py-4 bg-caramel/90 backdrop-blur-md text-espresso rounded-2xl flex items-center justify-center gap-3 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out font-bold text-[10px] uppercase tracking-widest"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Experience
        </motion.button>
      </div>
      
      {/* Product Info */}
      <div className="px-4 space-y-3">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-2xl font-serif italic text-white leading-tight group-hover:text-caramel transition-colors duration-500">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-xl font-light text-caramel">
              {product.price}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-cream/20 font-bold">Inc. Tax</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-caramel text-caramel" />
            ))}
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-cream/40 font-medium">
            Artisanal Selection
          </span>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-caramel/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    </motion.div>
  );
};

const FeaturedProducts = ({ onAddToCart }: { onAddToCart: (product: Product) => void }) => {
  return (
    <section id="shop" className="py-40 px-6 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[30vw] font-perception leading-none uppercase tracking-tighter">
          Collection
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-caramel" />
              <span className="text-caramel uppercase tracking-[0.5em] text-[10px] font-bold">
                The Atelier Selection
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-perception tracking-tight leading-[0.9]"
            >
              Curated <br /> <span className="text-caramel italic font-serif">Masterpieces</span>
            </motion.h2>
          </div>
          <motion.a 
            href="#shop"
            whileHover={{ x: 8 }}
            className="group text-cream/60 hover:text-caramel flex items-center gap-3 transition-all cursor-pointer text-xs uppercase tracking-[0.2em] font-bold"
          >
            Explore Full Menu 
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-caramel transition-colors">
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {PRODUCTS.map((product, index) => (
            <div key={product.id} className={`${index % 2 !== 0 ? 'lg:translate-y-20' : ''}`}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SensoryJourney = () => {
  const notes = [
    { label: "Aroma", value: "Jasmine & Bergamot", description: "A delicate floral opening that awakens the senses with ethereal lightness." },
    { label: "Body", value: "Velvety & Silk", description: "A smooth, medium-bodied texture that coats the palate in pure elegance." },
    { label: "Finish", value: "Dark Cacao & Honey", description: "A sweet, complex finish that lingers with a hint of toasted hazelnut." }
  ];

  return (
    <section className="py-40 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="text-caramel uppercase tracking-[0.8em] text-[10px] font-bold block">Sensory Profile</span>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tighter">
                The Art of <br /> <span className="text-caramel">Perception</span>
              </h2>
            </motion.div>

            <div className="space-y-0">
              {notes.map((note, i) => (
                <motion.div
                  key={note.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="group cursor-default"
                >
                  <div className="flex items-start gap-12 border-t border-white/10 py-12 group-hover:border-caramel/50 transition-colors duration-700">
                    <span className="text-caramel/40 font-mono text-[10px] uppercase tracking-[0.3em] mt-2 group-hover:text-caramel transition-colors">
                      0{i + 1}
                    </span>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-widest text-cream/30 font-medium">{note.label}</span>
                        <div className="h-[1px] w-8 bg-caramel/30" />
                      </div>
                      <h3 className="text-4xl font-light text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                        {note.value}
                      </h3>
                      <p className="text-cream/40 text-sm font-light max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                        {note.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-full overflow-hidden border border-white/10 p-6 backdrop-blur-3xl">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 2 }}
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1200"
                  alt="Coffee Essence"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>
            </div>
            
            {/* Decorative Rings */}
            <div className="absolute -top-20 -right-20 w-80 h-80 border border-caramel/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Floating Label */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-12 bg-caramel text-espresso px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl rotate-90 origin-left"
            >
              Pure Essence
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] select-none">
        <span className="text-[30vw] font-perception leading-none absolute -top-20 -left-20 whitespace-nowrap">ARTISANAL</span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              style={{ scale }}
              className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-black/50"
            >
              <motion.img 
                style={{ y }}
                src="https://i.ibb.co.com/hJdyZWRh/unnamed.webp" 
                alt="Roasting Process" 
                className="absolute inset-0 w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full glass border border-white/10 flex items-center justify-center p-4 text-center">
                <span className="text-[10px] uppercase tracking-widest font-bold leading-tight">Est. 2023 <br /> <span className="text-caramel">Sylhet</span></span>
              </div>
            </motion.div>

            {/* Decorative line */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r-2 border-b-2 border-caramel/20 rounded-br-[4rem] hidden lg:block" />
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-caramel" />
                <span className="text-caramel uppercase tracking-[0.5em] text-[10px] font-bold">
                  The Experience
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-perception leading-[0.9] tracking-tighter"
              >
                Cinematic Roasting <br /> 
                <span className="text-caramel italic">&</span> Barista Craft
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-cream/50 font-light leading-relaxed max-w-xl"
              >
                We believe every cup tells a story. From the high-altitude farms where our beans are hand-picked to the precise temperature of our custom roasters, every step is an act of devotion.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-8 border-t border-white/5">
              {[
                { label: "Origin", value: "Ethically Sourced", desc: "Direct trade with farmers" },
                { label: "Roast", value: "Small Batch", desc: "Roasted daily in Beanibazar" },
                { label: "Quality", value: "Grade A+", desc: "Top 1% of global beans" },
                { label: "Delivery", value: "Freshly Roasted", desc: "From roaster to cup in 48h" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-caramel/60 font-bold mb-2 group-hover:text-caramel transition-colors">{stat.label}</p>
                  <p className="text-2xl font-perception mb-1">{stat.value}</p>
                  <p className="text-xs text-cream/30 font-light italic">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8"
            >
              <button className="group flex items-center gap-6 text-sm uppercase tracking-[0.3em] font-bold hover:text-caramel transition-colors">
                <span>Discover our process</span>
                <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-caramel transition-all duration-500" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sanctuary = () => {
  return (
    <section className="relative min-h-screen flex items-center py-40 overflow-hidden bg-black">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000" 
            alt="Coffee Shop Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-caramel/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-espresso/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-caramel" />
                <span className="text-caramel uppercase tracking-[0.6em] text-[10px] font-bold">
                  The Sanctuary
                </span>
              </div>
              <h2 className="text-6xl md:text-9xl font-perception tracking-tighter leading-[0.85] text-white">
                A Space <br /> 
                <span className="text-caramel italic font-serif">for Stillness</span>
              </h2>
            </div>

            <div className="space-y-8 max-w-lg">
              <p className="text-xl text-cream/70 font-light leading-relaxed italic font-serif">
                "In the heart of Beanibazar, we've carved out a cinematic escape. A place where time slows down to the rhythm of the roast."
              </p>
              <p className="text-sm text-cream/40 leading-relaxed tracking-wide">
                High ceilings, hand-picked warm wood, and the intoxicating aroma of freshly roasted beans. Our sanctuary is designed for those who seek more than just a cup—they seek a moment of pure perception.
              </p>
            </div>

            <div className="flex flex-wrap gap-12 pt-4">
              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-caramel transition-colors duration-500">
                    <MapPin className="w-4 h-4 text-caramel" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cream/40 group-hover:text-cream transition-colors">Location</span>
                </div>
                <p className="text-lg font-serif italic text-white ml-14">Beanibazar, Sylhet</p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-caramel transition-colors duration-500">
                    <Coffee className="w-4 h-4 text-caramel" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cream/40 group-hover:text-cream transition-colors">Hours</span>
                </div>
                <p className="text-lg font-serif italic text-white ml-14">Daily: 9am — 11pm</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-transparent border border-white/20 overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 bg-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
              <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-espresso transition-colors duration-500">
                Get Directions
              </span>
            </motion.button>
          </motion.div>

          {/* Decorative Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative aspect-square"
          >
            <div className="absolute inset-0 border border-caramel/20 rounded-[3rem] translate-x-8 translate-y-8" />
            <div className="absolute inset-0 bg-espresso/20 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                alt="Coffee Detail" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <span className="text-4xl font-perception text-caramel">01</span>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mt-2">The Roastery Floor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-40 bg-black relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-caramel/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-espresso/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-caramel" />
              <span className="text-caramel uppercase tracking-[0.6em] text-[10px] font-bold">
                The Community
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-perception tracking-tighter leading-[0.85]"
            >
              What Our <br /> 
              <span className="text-caramel italic font-serif">Club Says</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-8"
          >
            <div className="text-right">
              <p className="text-4xl font-perception text-white">4.9/5</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/40 font-bold">Average Rating</p>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="text-right">
              <p className="text-4xl font-perception text-white">2k+</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/40 font-bold">Club Members</p>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <div className="relative h-[500px] md:h-[400px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < TESTIMONIALS[currentIndex].rating ? 'text-caramel fill-caramel' : 'text-cream/10'}`} />
                      ))}
                    </div>
                    <blockquote className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight mb-12">
                      "{TESTIMONIALS[currentIndex].text}"
                    </blockquote>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-caramel/10 flex items-center justify-center text-caramel text-2xl font-perception border border-caramel/20 overflow-hidden">
                          {TESTIMONIALS[currentIndex].avatar ? (
                            <img 
                              src={TESTIMONIALS[currentIndex].avatar} 
                              alt={TESTIMONIALS[currentIndex].name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            TESTIMONIALS[currentIndex].name[0]
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-caramel rounded-full flex items-center justify-center border-2 border-black">
                          <Star className="w-3 h-3 text-espresso fill-espresso" />
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-perception text-white">{TESTIMONIALS[currentIndex].name}</p>
                        <p className="text-[10px] text-caramel uppercase tracking-[0.3em] font-bold">Verified Club Member</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block lg:col-span-5">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5">
                      <img 
                        src={TESTIMONIALS[currentIndex].coverImage || TESTIMONIALS[currentIndex].avatar || `https://picsum.photos/seed/${TESTIMONIALS[currentIndex].name}/800/800`}
                        alt="Member"
                        className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Member Since</p>
                        <p className="text-xl font-perception text-caramel">Oct 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom Navigation */}
          <div className="flex items-center gap-6 mt-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => paginate(-1)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-caramel hover:text-caramel transition-all duration-500 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => paginate(1)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-caramel hover:text-caramel transition-all duration-500 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="h-[1px] flex-grow bg-white/10 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-caramel"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / TESTIMONIALS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-perception text-white">0{currentIndex + 1}</span>
              <span className="text-[10px] text-cream/30 font-bold">/ 0{TESTIMONIALS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-caramel/5 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-caramel/5 blur-[120px] rounded-full -translate-y-1/4 translate-x-1/4" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="glass rounded-[4rem] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-caramel uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block"
          >
            Exclusive Access
          </motion.span>
          
          <h2 className="text-5xl md:text-8xl font-perception leading-[0.9] mb-8 tracking-tighter">
            Join the <span className="text-caramel italic">Brown Coffee</span> <br /> 
            <span className="text-white/90">Private Club</span>
          </h2>
          
          <p className="text-cream/50 mb-16 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Subscribe to receive exclusive offers, early access to new roasts, and <br className="hidden md:block" /> 
            curated brewing guides from our head barista.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-grow relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-caramel/50 transition-all duration-500 text-cream placeholder:text-cream/20"
              />
              <div className="absolute inset-0 rounded-full bg-caramel/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <button className="px-12 py-6 bg-caramel text-espresso font-bold rounded-full hover:bg-white hover:text-espresso transition-all duration-500 whitespace-nowrap shadow-xl shadow-caramel/10 group flex items-center justify-center gap-3">
              <span>Subscribe</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center gap-8 opacity-30 grayscale">
            <span className="text-[10px] uppercase tracking-widest">Artisanal</span>
            <div className="w-1 h-1 rounded-full bg-cream" />
            <span className="text-[10px] uppercase tracking-widest">Precise</span>
            <div className="w-1 h-1 rounded-full bg-cream" />
            <span className="text-[10px] uppercase tracking-widest">Soulful</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-espresso pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-caramel/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-5 group cursor-default">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-caramel/20 blur-md group-hover:bg-caramel/30 transition-all duration-700" />
              <div className="relative p-1 rounded-full border border-caramel/20 group-hover:border-caramel/40 transition-colors duration-700">
                <img 
                  src="https://i.ibb.co.com/0pfm53jH/326009096-575368037386275-7299997457018322443-n.jpg" 
                  alt="Brown's Coffee Logo" 
                  className="w-14 h-14 rounded-full object-cover border border-caramel/50 shadow-2xl transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-serif-elegant italic text-white tracking-tight leading-none group-hover:text-caramel transition-colors duration-700">Brown Coffee</span>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[1px] w-4 bg-caramel/30" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-caramel/70 font-medium">Artisanal Roasters</span>
                <div className="h-[1px] w-4 bg-caramel/30" />
              </div>
            </div>
          </div>
          <p className="text-cream/50 text-base leading-relaxed font-light">
            An artisanal sanctuary for coffee purists. We curate the world's most exceptional beans, roasted with precision and served with soul in the heart of Sylhet.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' }
            ].map((social) => (
              <a 
                key={social.label}
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-caramel hover:text-caramel transition-all duration-300 group"
              >
                <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-caramel text-[11px] uppercase tracking-[0.2em] font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-cream/40">
              {['Home', 'Shop Coffee', 'Our Story', 'Brewing Guides', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-caramel group-hover:w-3 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-caramel text-[11px] uppercase tracking-[0.2em] font-bold mb-8">Contact</h4>
            <ul className="space-y-6 text-sm text-cream/40">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-caramel shrink-0" />
                <span className="leading-relaxed">Beanibazar - Sylhet Rd,<br />Beanibazar 3170, Bangladesh</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-caramel shrink-0" />
                <span>+880 1886-683687</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-caramel shrink-0" />
                <span>brownscoffee4@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Experience Column */}
        <div className="lg:col-span-3">
          <h4 className="text-caramel text-[11px] uppercase tracking-[0.2em] font-bold mb-8">The Experience</h4>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-xs text-cream/60 uppercase tracking-widest">Mon — Fri</span>
              <span className="text-sm text-white font-mono">09:00 - 23:00</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-xs text-cream/60 uppercase tracking-widest">Sat — Sun</span>
              <span className="text-sm text-white font-mono">09:00 - 23:00</span>
            </div>
            <a href="#contact" className="relative group block rounded-2xl overflow-hidden aspect-[4/3] mt-8">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-espresso/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="px-6 py-3 bg-white text-espresso text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Visit the Sanctuary
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-cream/20 text-[10px] uppercase tracking-widest">© 2026 Brown Coffee Beanibazar</p>
          <div className="flex gap-6">
            <a href="#" className="text-cream/20 text-[10px] uppercase tracking-widest hover:text-caramel transition-colors">Privacy</a>
            <a href="#" className="text-cream/20 text-[10px] uppercase tracking-widest hover:text-caramel transition-colors">Terms</a>
            <a href="#" className="text-cream/20 text-[10px] uppercase tracking-widest hover:text-caramel transition-colors">Cookies</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-cream/40 text-[10px] uppercase tracking-widest">Roastery Status: Active</span>
        </div>
      </div>
    </footer>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) => {
  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price.replace('৳', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-espresso border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-caramel" />
                Your Cart
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-cream" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-cream/20" />
                  </div>
                  <p className="text-cream/40">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-caramel text-espresso font-bold rounded-full"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 glass p-4 rounded-2xl relative group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-white mb-1">{item.name}</h4>
                      <p className="text-caramel text-sm mb-3">{item.price}</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-caramel hover:text-espresso transition-colors"
                        >
                          -
                        </button>
                        <span className="text-white font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-caramel hover:text-espresso transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="absolute top-4 right-4 text-cream/20 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="text-2xl font-bold text-white">৳{total}</span>
                </div>
                <button className="w-full py-4 bg-caramel text-espresso font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-caramel selection:text-espresso">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <FeaturedProducts onAddToCart={addToCart} />
        <Experience />
        <SensoryJourney />
        <Sanctuary />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
