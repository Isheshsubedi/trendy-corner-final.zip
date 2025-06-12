
import { useState } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useProductContext } from '@/context/ProductContext';

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProductContext();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<null | import('@/data/products').Product>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    image: '',
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
        setProductForm(prev => ({
          ...prev,
          image: imageUrl
        }));
      };
      reader.readAsDataURL(file);

      toast.success('Image uploaded successfully!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate category type
    if (!['tshirts', 'pants', 'shoes', 'socks'].includes(productForm.category)) {
      toast.error('Invalid category selected.');
      return;
    }

    const newProduct = {
      id: editingProduct ? editingProduct.id : `p_${Date.now()}`,
      name: productForm.name,
      brand: productForm.brand,
      category: productForm.category as 'tshirts' | 'pants' | 'shoes' | 'socks',
      price: Number(productForm.price),
      description: productForm.description,
      image: productForm.image,
      sizes: productForm.sizes,
      quantity: Number(productForm.quantity),
      inStock: Number(productForm.quantity) > 0,
      series: '',
      features: [],
      specs: {},
      rating: 0,
      reviewCount: 0,
      originalPrice: undefined
    };

    if (editingProduct) {
      editProduct(newProduct);
      toast.success('Product updated successfully!');
    } else {
      addProduct(newProduct);
      toast.success('Product added successfully!');
    }

    setIsAddDialogOpen(false);
    setEditingProduct(null);
    setSelectedImage(null);
    setImagePreview('');
    setProductForm({
      name: '',
      brand: '',
      category: '',
      price: '',
      description: '',
      image: '',
      sizes: ['S', 'M', 'L', 'XL'],
      quantity: ''
    });
  };

  const handleEdit = (product: import('@/data/products').Product) => {
    setEditingProduct(product);
    setImagePreview(product.image);
    setProductForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      quantity: product.inStock ? '50' : '0'
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast.success('Product deleted successfully!');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={productForm.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={productForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirts">T-Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="socks">Socks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productForm.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={productForm.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={productForm.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="Enter image URL or upload from computer"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="mt-3">
                      <Label>Image Preview:</Label>
                      <div className="mt-1 border rounded p-2">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>Rs. {product.price}</TableCell>
                <TableCell>{product.inStock ? 'In Stock' : 'Out of Stock'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
