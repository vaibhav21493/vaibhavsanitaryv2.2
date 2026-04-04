import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Users, ShoppingCart, Phone, Mail, Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react";

import { supabase } from "../auth/supabaseClient";
import { useAuth } from "../auth/AuthProvider";
import { ProductService, Product } from "./ProductService";

interface Customer {
  user_id: string;
  email: string;
  joined_at: string;
  full_name: string | null;
  phone: string | null;
  profile_updated_at: string | null;
}

interface Inquiry {
  id: string;
  created_at: string;
  user_id: string;
  email: string;
  full_name: string | null;
  note: string | null;
  items: Array<{
    product_id: string;
  }>;
}

const ADMIN_EMAIL = "pamartipranathi55@gmail.com";

export default function AdminPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: null,
    image: null,
    parent_id: null,
    nav_id: "",
  });

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      setError("Access denied. Admin only.");
      setLoading(false);
      return;
    }

    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch customers with profiles
      const { data: customersData, error: customersError } = await supabase
        .from('customer_details')
        .select('*')
        .order('joined_at', { ascending: false });

      if (customersError) throw customersError;
      setCustomers(customersData || []);

      // Fetch inquiries with item counts
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries_with_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);

      // Fetch products from database
      const productsData = await ProductService.getAll();
      setProducts(productsData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    try {
      await ProductService.update(editingProduct.nav_id, {
        title: editingProduct.title,
        description: editingProduct.description,
        image: editingProduct.image,
        parent_id: editingProduct.parent_id,
      });
      setEditingProduct(null);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createProduct = async () => {
    if (!newProduct.title || !newProduct.nav_id) {
      setError("Title and Nav ID are required");
      return;
    }
    try {
      await ProductService.create({
        title: newProduct.title,
        description: newProduct.description || null,
        image: newProduct.image || null,
        parent_id: newProduct.parent_id || null,
        nav_id: newProduct.nav_id,
      });
      setNewProduct({ title: "", description: null, image: null, parent_id: null, nav_id: "" });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteProduct = async (nav_id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await ProductService.delete(nav_id);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const stats = useMemo(() => ({
    totalCustomers: customers.length,
    totalInquiries: inquiries.length,
    totalProducts: products.length,
    newCustomersThisMonth: customers.filter(c => {
      const joined = new Date(c.joined_at);
      const now = new Date();
      return joined.getMonth() === now.getMonth() && joined.getFullYear() === now.getFullYear();
    }).length,
    newInquiriesThisMonth: inquiries.filter(i => {
      const created = new Date(i.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
  }), [customers, inquiries, products]);

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(17,24,39)] to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-[rgb(17,24,39)]">Access Denied</CardTitle>
            <CardDescription>You don't have permission to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(17,24,39)] to-white flex items-center justify-center">
        <div className="text-[rgb(17,24,39)]">Loading admin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(17,24,39)] to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-[rgb(17,24,39)]">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={fetchData} className="w-full">Retry</Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(17,24,39)] to-white">
      <div className="container mx-auto px-4 py-8 vs-route-enter">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="size-4 mr-2" />
              Back to store
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[rgb(17,24,39)] mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage products, customers and inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[rgb(17,24,39)]">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[rgb(17,24,39)]">{stats.totalInquiries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[rgb(17,24,39)]">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-[rgb(17,24,39)]">
                {stats.newCustomersThisMonth} customers, {stats.newInquiriesThisMonth} inquiries
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="size-5" />
                      Products ({products.length})
                    </CardTitle>
                    <CardDescription>Manage your product catalog</CardDescription>
                  </div>
                  <Button onClick={() => setNewProduct({ title: "", description: null, image: null, parent_id: null, nav_id: "" })}>
                    <Plus className="size-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {newProduct.title !== undefined && (
                  <Card className="mb-4 border-2 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">New Product</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="new-nav-id">Nav ID (unique identifier)</Label>
                        <Input
                          id="new-nav-id"
                          value={newProduct.nav_id || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, nav_id: e.target.value })}
                          placeholder="e.g., product-123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-title">Title</Label>
                        <Input
                          id="new-title"
                          value={newProduct.title}
                          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-description">Description</Label>
                        <Textarea
                          id="new-description"
                          value={newProduct.description || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-image">Image URL</Label>
                        <Input
                          id="new-image"
                          value={newProduct.image || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={createProduct}>
                          <Save className="size-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setNewProduct({ title: "", description: null, image: null, parent_id: null, nav_id: "" })}>
                          <X className="size-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div key={product.id} className="rounded-lg border p-4">
                        {editingProduct?.id === product.id ? (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`edit-title-${product.id}`}>Title</Label>
                              <Input
                                id={`edit-title-${product.id}`}
                                value={editingProduct.title}
                                onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`edit-desc-${product.id}`}>Description</Label>
                              <Textarea
                                id={`edit-desc-${product.id}`}
                                value={editingProduct.description || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`edit-image-${product.id}`}>Image URL</Label>
                              <Input
                                id={`edit-image-${product.id}`}
                                value={editingProduct.image || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => saveProduct()}>
                                <Save className="size-4 mr-2" />
                                Save
                              </Button>
                              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                                <X className="size-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-[rgb(17,24,39)]">{product.title}</div>
                              {product.description && (
                                <div className="text-sm text-muted-foreground mt-1">{product.description}</div>
                              )}
                              {product.image && (
                                <div className="text-xs text-muted-foreground mt-1 truncate">{product.image}</div>
                              )}
                              <div className="text-xs text-muted-foreground mt-2">Nav ID: {product.nav_id}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                                <Edit className="size-3" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.nav_id)}>
                                <Trash2 className="size-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" />
                  Customers ({customers.length})
                </CardTitle>
                <CardDescription>All registered customers and their profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-2">
                    {customers.map((customer) => (
                      <div key={customer.user_id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="size-4 text-muted-foreground" />
                              <span className="font-medium text-[#0F2854]">{customer.email}</span>
                            </div>
                            {customer.full_name && (
                              <div className="text-sm text-muted-foreground">{customer.full_name}</div>
                            )}
                            {customer.phone && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <Phone className="size-3" />
                                {customer.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                              <Calendar className="size-3" />
                              Joined {new Date(customer.joined_at).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant={customer.full_name ? "default" : "secondary"}>
                            {customer.full_name ? "Profile Complete" : "Profile Incomplete"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="size-5" />
                  Inquiries ({inquiries.length})
                </CardTitle>
                <CardDescription>Customer product requests and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-2">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="size-4 text-muted-foreground" />
                              <span className="font-medium text-[#0F2854]">{inquiry.email}</span>
                            </div>
                            {inquiry.full_name && (
                              <div className="text-sm text-muted-foreground">{inquiry.full_name}</div>
                            )}
                            {inquiry.note && (
                              <div className="text-sm text-muted-foreground mt-1 italic">"{inquiry.note}"</div>
                            )}
                            {inquiry.items.length > 0 && (
                              <div className="mt-2">
                                <div className="text-sm font-medium text-[#0F2854]">Products requested:</div>
                                <div className="mt-1 space-y-1">
                                  {inquiry.items.map((item, index) => (
                                    <div key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                      {item.product_id}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                              <Calendar className="size-3" />
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant="outline">ID: {inquiry.id.slice(0, 8)}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
