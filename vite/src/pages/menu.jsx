import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Stack,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Pagination,
  InputAdornment
} from '@mui/material';
import {
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  CloudUploadOutlined,
  CloseOutlined,
  UpOutlined
} from '@ant-design/icons';

// 1. Initial Dummy Data
const initialMenuItems = [
  { id: 1, code: 'MN001', name: 'Classic Burger', category: 'Fast Food', price: 5.0, status: 'Available', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100' },
  { id: 2, code: 'MN002', name: 'Margherita Pizza', category: 'Main Course', price: 8.5, status: 'Available', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100' },
  { id: 3, code: 'MN003', name: 'Spaghetti Carbonara', category: 'Main Course', price: 7.5, status: 'Available', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100' },
  { id: 4, code: 'MN004', name: 'Fried Chicken', category: 'Main Course', price: 6.0, status: 'Unavailable', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100' },
  { id: 5, code: 'MN005', name: 'Cheesecake', category: 'Desserts', price: 4.5, status: 'Available', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=100' },
  { id: 6, code: 'MN006', name: 'Orange Juice', category: 'Beverages', price: 2.5, status: 'Available', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=100' },
  { id: 7, code: 'MN007', name: 'Iced Coffee', category: 'Beverages', price: 2.75, status: 'Available', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100' },
  { id: 8, code: 'MN008', name: 'Caesar Salad', category: 'Salads', price: 4.0, status: 'Unavailable', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=100' }
];

const categoryOptions = ['Fast Food', 'Main Course', 'Desserts', 'Beverages', 'Salads'];

const getCategoryColor = (category) => {
  switch (category) {
    case 'Fast Food': return { bg: '#f3e8ff', color: '#7c3aed' };
    case 'Main Course': return { bg: '#dbeafe', color: '#1d4ed8' };
    case 'Desserts': return { bg: '#fce7f3', color: '#be185d' };
    case 'Beverages': return { bg: '#fef3c7', color: '#b45309' };
    case 'Salads': return { bg: '#dcfce7', color: '#15803d' };
    default: return { bg: '#f1f5f9', color: '#475569' };
  }
};

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    price: '',
    description: '',
    status: 'Available',
    image: null,
    imagePreview: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('សូមជ្រើសរើសរូបភាពដែលមានទំហំតូចជាង 2MB!');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: file, imagePreview: previewUrl }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: file, imagePreview: previewUrl }));
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      category: '',
      price: '',
      description: '',
      status: 'Available',
      image: null,
      imagePreview: ''
    });
    setEditingId(null);
  };

  const handleSaveMenu = (e) => {
    e.preventDefault();

    if (!formData.code.trim() || !formData.name.trim() || !formData.category) {
      alert('សូមបំពេញ Menu Code, Menu Name និង Category!');
      return;
    }

    if (editingId) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingId
            ? {
                ...item,
                code: formData.code,
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price) || 0,
                status: formData.status,
                image: formData.imagePreview || item.image
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: menuItems.length + 1,
        code: formData.code,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        status: formData.status,
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'
      };
      setMenuItems([...menuItems, newItem]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      code: item.code,
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: '',
      status: item.status,
      image: null,
      imagePreview: item.image
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុប Menu នេះមែនទេ?')) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  const totalMenuItems = menuItems.length;
  const availableMenu = menuItems.filter((m) => m.status === 'Available').length;
  const unavailableMenu = menuItems.filter((m) => m.status === 'Unavailable').length;
  const totalCategories = new Set(menuItems.map((m) => m.category)).size;

  return (
    <Box sx={{ p: 1 }}>
      {/* 1. Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Menu Items', count: totalMenuItems, sub: 'All menu items', icon: <BellOutlined />, color: '#2563eb', bg: '#dbeafe' },
          { title: 'Available Menu', count: availableMenu, sub: 'Currently available', icon: <CheckCircleOutlined />, color: '#16a34a', bg: '#dcfce7' },
          { title: 'Unavailable Menu', count: unavailableMenu, sub: 'Not available', icon: <CloseCircleOutlined />, color: '#dc2626', bg: '#fee2e2' },
          { title: 'Categories', count: totalCategories, sub: 'Total categories', icon: <FolderOpenOutlined />, color: '#d97706', bg: '#fef3c7' }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 48, height: 48, borderRadius: '50%' }}>
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="medium">{card.title}</Typography>
                    <Typography variant="h4" fontWeight="bold">{card.count}</Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {card.sub}
                </Typography>
                <Button size="small" sx={{ p: 0 }}>View all &gt;</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 2. Main Area (Table + Form) */}
      <Grid container spacing={3}>
        {/* Table Section */}
        <Grid item xs={12} md={showAddForm ? 8 : 12}>
          <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold">Menu Items</Typography>
              {!showAddForm && (
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>
                  Add Menu
                </Button>
              )}
            </Stack>

            {/* Filter Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                placeholder="Search menu name, code..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  )
                }}
              />
              <Select defaultValue="All" size="small" sx={{ minWidth: 150 }}>
                <MenuItem value="All">All Categories</MenuItem>
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
              <Select defaultValue="All" size="small" sx={{ minWidth: 130 }}>
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
              </Select>
              <Button variant="outlined" startIcon={<ReloadOutlined />}>Reset</Button>
            </Stack>

            {/* Menu Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Menu Code</TableCell>
                    <TableCell>Menu Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuItems.map((item, index) => {
                    const catStyle = getCategoryColor(item.category);
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Avatar src={item.image} variant="rounded" sx={{ width: 42, height: 42 }} />
                        </TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.category} size="small" sx={{ bgcolor: catStyle.bg, color: catStyle.color, fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              bgcolor: item.status === 'Available' ? '#dcfce7' : '#fee2e2',
                              color: item.status === 'Available' ? '#15803d' : '#b91c1c',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton size="small" color="primary"><EyeOutlined /></IconButton>
                            <IconButton size="small" color="warning" onClick={() => handleEdit(item)}><EditOutlined /></IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteOutlined /></IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing 1 to {menuItems.length} of {menuItems.length} items
              </Typography>
              <Pagination count={Math.max(1, Math.ceil(menuItems.length / 8))} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Grid>

        {/* 3. Add / Edit Menu Form Panel */}
        {showAddForm && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {editingId ? 'Edit Menu' : 'Add New Menu'}
                </Typography>
                <IconButton size="small" onClick={() => { setShowAddForm(false); resetForm(); }}>
                  <UpOutlined />
                </IconButton>
              </Stack>

              <form onSubmit={handleSaveMenu}>
                <Stack spacing={2}>
                  {/* Image Upload */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Upload Food Image <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Box
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      sx={{
                        border: '2px dashed #cbd5e1',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        bgcolor: '#f8fafc',
                        cursor: 'pointer',
                        '&:hover': { borderColor: '#2563eb', bgcolor: '#eff6ff' }
                      }}
                      component="label"
                    >
                      <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                      {formData.imagePreview ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                          />
                          <Typography variant="caption" color="primary">Click to change image</Typography>
                        </Box>
                      ) : (
                        <>
                          <CloudUploadOutlined style={{ fontSize: 32, color: '#64748b' }} />
                          <Typography variant="body2" fontWeight="medium" sx={{ mt: 1 }}>
                            Click to upload or drag and drop
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            PNG, JPG or WEBP (Max. 2MB)
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>

                  {/* Menu Code */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Menu Code <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Enter menu code (e.g. MN001)"
                      size="small"
                      fullWidth
                    />
                  </Box>

                  {/* Menu Name */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Menu Name <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter menu name"
                      size="small"
                      fullWidth
                    />
                  </Box>

                  {/* Category */}
                  <FormControl fullWidth size="small">
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Category <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Select category</MenuItem>
                      {categoryOptions.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Price */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Price <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      type="number"
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>Description</Typography>
                    <TextField
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      multiline
                      rows={3}
                      size="small"
                      fullWidth
                    />
                  </Box>

                  {/* Status */}
                  <FormControl>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Status <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                      <FormControlLabel value="Available" control={<Radio size="small" />} label="Available" />
                      <FormControlLabel value="Unavailable" control={<Radio size="small" />} label="Unavailable" />
                    </RadioGroup>
                  </FormControl>

                  {/* Buttons */}
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Button type="submit" variant="contained" fullWidth startIcon={<PlusOutlined />}>
                      {editingId ? 'Update Menu' : 'Save Menu'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={() => { resetForm(); setShowAddForm(false); }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MenuPage;
