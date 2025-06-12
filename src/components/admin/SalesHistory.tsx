
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const SalesHistory = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  // Mock sales data
  const salesData = [
    {
      date: '2024-06-10',
      orders: 12,
      revenue: 23450,
      topProduct: 'Classic Cotton Tee',
      units: 45
    },
    {
      date: '2024-06-09',
      orders: 8,
      revenue: 15670,
      topProduct: 'Running Shoes',
      units: 12
    },
    {
      date: '2024-06-08',
      orders: 15,
      revenue: 28990,
      topProduct: 'Cargo Tactical Pants',
      units: 18
    },
    {
      date: '2024-06-07',
      orders: 6,
      revenue: 12340,
      topProduct: 'Athletic Sports Socks',
      units: 25
    },
    {
      date: '2024-06-06',
      orders: 10,
      revenue: 19870,
      topProduct: 'Casual Chino Pants',
      units: 15
    }
  ];

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600">↗ +12.5% from last period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-xs text-green-600">↗ +8.3% from last period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {Math.round(avgOrderValue)}</p>
              <p className="text-xs text-green-600">↗ +3.8% from last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales History Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daily Sales Report</CardTitle>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Top Product</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Avg. Order Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{day.date}</TableCell>
                  <TableCell>{day.orders}</TableCell>
                  <TableCell>Rs. {day.revenue.toLocaleString()}</TableCell>
                  <TableCell>{day.topProduct}</TableCell>
                  <TableCell>{day.units}</TableCell>
                  <TableCell>Rs. {Math.round(day.revenue / day.orders)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Classic Cotton Tee</TableCell>
                <TableCell>T-Shirts</TableCell>
                <TableCell>89</TableCell>
                <TableCell>Rs. 115,611</TableCell>
                <TableCell className="text-green-600">↗ +15%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Running Shoes</TableCell>
                <TableCell>Shoes</TableCell>
                <TableCell>34</TableCell>
                <TableCell>Rs. 186,966</TableCell>
                <TableCell className="text-green-600">↗ +22%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cargo Tactical Pants</TableCell>
                <TableCell>Pants</TableCell>
                <TableCell>45</TableCell>
                <TableCell>Rs. 157,455</TableCell>
                <TableCell className="text-green-600">↗ +8%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Athletic Sports Socks</TableCell>
                <TableCell>Socks</TableCell>
                <TableCell>67</TableCell>
                <TableCell>Rs. 60,233</TableCell>
                <TableCell className="text-red-600">↘ -3%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesHistory;
