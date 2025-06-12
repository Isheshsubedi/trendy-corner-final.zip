
import { Link } from 'react-router-dom';
import { Shirt, Package, ShoppingCart, Footprints } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  path: string;
  icon: 'shirt' | 'pants' | 'shoes' | 'socks';
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, path, icon, description }) => {
  const getIcon = () => {
    switch (icon) {
      case 'shirt':
        return <Shirt className="h-8 w-8" />;
      case 'pants':
        return <Package className="h-8 w-8" />;
      case 'shoes':
        return <ShoppingCart className="h-8 w-8" />;
      case 'socks':
        return <Footprints className="h-8 w-8" />;
      default:
        return <Shirt className="h-8 w-8" />;
    }
  };

  return (
    <Link to={path} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
        <div className="text-primary mb-4 flex justify-center">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
