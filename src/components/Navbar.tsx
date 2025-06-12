
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">Trendy Corner</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products/tshirts" className="text-gray-700 hover:text-primary transition-colors">
              T-Shirts
            </Link>
            <Link to="/products/pants" className="text-gray-700 hover:text-primary transition-colors">
              Pants
            </Link>
            <Link to="/products/shoes" className="text-gray-700 hover:text-primary transition-colors">
              Shoes
            </Link>
            <Link to="/products/socks" className="text-gray-700 hover:text-primary transition-colors">
              Socks
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to={currentUser ? "/profile" : "/login"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 space-y-1 border-t">
              <Link to="/" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products/tshirts" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                T-Shirts
              </Link>
              <Link to="/products/pants" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Pants
              </Link>
              <Link to="/products/shoes" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Shoes
              </Link>
              <Link to="/products/socks" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Socks
              </Link>
              <Link to="/login" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Login / Register
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
