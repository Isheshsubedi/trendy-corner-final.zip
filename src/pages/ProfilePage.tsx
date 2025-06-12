
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, Package, CreditCard, Settings, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  // Redirect to login if no user is logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-12 w-12 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#profile-tab">
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span>Personal Info</span>
                  </a>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#orders-tab">
                    <Package className="h-5 w-5 mr-2" />
                    <span>Orders</span>
                  </a>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#payment-tab">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>Payment Methods</span>
                  </a>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#settings-tab">
                    <Settings className="h-5 w-5 mr-2" />
                    <span>Account Settings</span>
                  </a>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile" id="profile-tab">Personal Info</TabsTrigger>
                <TabsTrigger value="orders" id="orders-tab">Orders</TabsTrigger>
                <TabsTrigger value="payment" id="payment-tab">Payment Methods</TabsTrigger>
                <TabsTrigger value="settings" id="settings-tab">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button type="submit" disabled={isUpdating} className="flex items-center">
                      {isUpdating ? 'Saving...' : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="orders" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                
                <div className="text-center py-12">
                  <div className="mx-auto mb-4">
                    <Package className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-gray-500">
                    Once you make a purchase, your orders will appear here.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <a href="/products">Browse Products</a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                
                <div className="text-center py-12">
                  <div className="mx-auto mb-4">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No payment methods added</h3>
                  <p className="mt-1 text-gray-500">
                    Add a payment method for faster checkout.
                  </p>
                  <div className="mt-6">
                    <Button>Add Payment Method</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </form>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProfilePage;
