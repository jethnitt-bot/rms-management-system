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
  Pagination
} from '@mui/material';
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  CloudUploadOutlined,
  CloseOutlined
} from '@ant-design/icons';

// 1. Initial Dummy Data
const initialCategories = [
  { id: 1, name: 'Appetizers', description: 'Start your meal with our delicious appetizers.', itemsCount: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=100' },
  { id: 2, name: 'Main Course', description: 'Hearty and tasty main course dishes.', itemsCount: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100' },
  { id: 3, name: 'Desserts', description: 'Sweet treats to complete your meal.', itemsCount: 12, status: 'Active', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100' },
  { id: 4, name: 'Beverages', description: 'Refreshing drinks and beverages.', itemsCount: 18, status: 'Active', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100' },
  { id: 5, name: 'Fast Food', description: 'Quick and delicious fast food.', itemsCount: 20, status: 'Active', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=100' },
  { id: 6, name: 'Soups', description: 'Warm and tasty soup varieties.', itemsCount: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=100' },
  { id: 7, name: 'Salads', description: 'Healthy and fresh salad options.', itemsCount: 10, status: 'Active', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100' },
  { id: 8, name: 'Bread & Bakery', description: 'Freshly baked bread and bakery.', itemsCount: 6, status: 'Active', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100' },
  { id: 9, name: 'Sauces & Dips', description: 'Flavourful sauces and dips.', itemsCount: 4, status: 'Active', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=100' },
  { id: 10, name: 'Others', description: 'Other special items and extras.', itemsCount: 2, status: 'Inactive', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100' }
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    image: null,
    imagePreview: ''
  });

  // Handle Text Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('សូមជ្រើសរើសរូបភាពដែលមានទំហំតូចជាង 2MB!');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    }
  };

  // Handle Drag and Drop Image
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    }
  };

  // Save / Update Category Function
  const handleSaveCategory = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('សូមបញ្ចូល Category Name!');
      return;
    }

    if (editingId) {
      // ករណី Edit
      setCategories(
        categories.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                name: formData.name,
                description: formData.description,
                status: formData.status,
                image: formData.imagePreview || cat.image
              }
            : cat
        )
      );
      setEditingId(null);
    } else {
      // ករណី Add ថ្មី
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description || 'No description provided.',
        itemsCount: 0,
        status: formData.status,
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'
      };
      setCategories([...categories, newCategory]);
    }

    // Reset Form
    resetForm();
  };

  // Edit Action
  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      image: null,
      imagePreview: category.image
    });
    setShowAddForm(true);
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុប Category នេះមែនទេ?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // Reset Form Action
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      image: null,
      imagePreview: ''
    });
    setEditingId(null);
  };

  // Calculate Stat Cards Values dynamically
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.status === 'Active').length;
  const inactiveCategories = categories.filter((c) => c.status === 'Inactive').length;
  const totalMenuItems = categories.reduce((sum, c) => sum + c.itemsCount, 0);

  return (
    <Box sx={{ p: 1 }}>
      {/* 1. Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Categories', count: totalCategories, icon: <AppstoreOutlined />, color: '#2563eb', bg: '#eff6ff', sub: 'Categories' },
          { title: 'Active Categories', count: activeCategories, icon: <CheckCircleOutlined />, color: '#16a34a', bg: '#f0fdf4', sub: 'Categories' },
          { title: 'Inactive Categories', count: inactiveCategories, icon: <CloseCircleOutlined />, color: '#dc2626', bg: '#fef2f2', sub: 'Categories' },
          { title: 'Total Menu Items', count: totalMenuItems, icon: <FileTextOutlined />, color: '#d97706', bg: '#fffbeb', sub: 'Items' }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 52, height: 52, borderRadius: 3 }}>
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="medium">{card.title}</Typography>
                    <Typography variant="h4" fontWeight="bold">{card.count}</Typography>
                    <Typography variant="caption" color="text.secondary">{card.sub}</Typography>
                  </Box>
                </Stack>
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
              <Typography variant="h5" fontWeight="bold">Categories List</Typography>
              {!showAddForm && (
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>
                  Add Category
                </Button>
              )}
            </Stack>

            {/* Filter Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField placeholder="Search category name..." size="small" fullWidth />
              <Select defaultValue="All" size="small" sx={{ minWidth: 130 }}>
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
              <Button variant="outlined" startIcon={<FilterOutlined />}>Filter</Button>
            </Stack>

            {/* Categories Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Menu Items</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((cat, index) => (
                    <TableRow key={cat.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar src={cat.image} variant="rounded" sx={{ width: 42, height: 42 }} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">{cat.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Typography variant="body2" color="text.secondary">{cat.description}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={cat.itemsCount} size="small" sx={{ bgcolor: '#e0e7ff', color: '#3730a3', fontWeight: 'bold' }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={cat.status}
                          size="small"
                          sx={{
                            bgcolor: cat.status === 'Active' ? '#dcfce7' : '#fee2e2',
                            color: cat.status === 'Active' ? '#15803d' : '#b91c1c',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton size="small" color="primary" onClick={() => handleEdit(cat)}>
                            <EditOutlined />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(cat.id)}>
                            <DeleteOutlined />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing 1 to {categories.length} of {categories.length} categories
              </Typography>
              <Pagination count={1} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Grid>

        {/* 3. Add / Edit Category Form Panel */}
        {showAddForm && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {editingId ? 'Edit Category' : 'Add New Category'}
                </Typography>
                <IconButton size="small" onClick={() => { setShowAddForm(false); resetForm(); }}>
                  <CloseOutlined />
                </IconButton>
              </Stack>

              <form onSubmit={handleSaveCategory}>
                <Stack spacing={2}>
                  {/* Category Name */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Category Name <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      size="small"
                      fullWidth
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

                  {/* Image Upload Box */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Image <span style={{ color: 'red' }}>*</span>
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
                            Click to upload image
                          </Typography>
                          <Typography variant="caption" color="text.secondary">or drag and drop</Typography>
                          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                            PNG, JPG or WEBP (Max. 2MB)
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>

                  {/* Status Radio Buttons */}
                  <FormControl>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Status <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                      <FormControlLabel value="Active" control={<Radio size="small" />} label="Active" />
                      <FormControlLabel value="Inactive" control={<Radio size="small" />} label="Inactive" />
                    </RadioGroup>
                  </FormControl>

                  {/* Buttons */}
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Button type="submit" variant="contained" fullWidth startIcon={<PlusOutlined />}>
                      {editingId ? 'Update Category' : 'Save Category'}
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

export default Categories;
