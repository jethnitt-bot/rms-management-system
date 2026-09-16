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
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Pagination
} from '@mui/material';
import {
  UserOutlined,
  UsergroupAddOutlined,
  UserDeleteOutlined,
  SafetyCertificateOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  CloseOutlined
} from '@ant-design/icons';

const initialUsersList = [
  { id: 'U001', name: 'John Doe', username: 'johndoe', role: 'Administrator', phone: '012 345 678', status: 'Active' },
  { id: 'U002', name: 'Mary Jane', username: 'maryjane', role: 'Manager', phone: '012 876 543', status: 'Active' },
  { id: 'U003', name: 'David Smith', username: 'davids', role: 'Cashier', phone: '097 654 321', status: 'Active' },
  { id: 'U004', name: 'Sophia Brown', username: 'sophia', role: 'Waiter', phone: '098 765 432', status: 'Active' },
  { id: 'U005', name: 'Michael Lee', username: 'michael', role: 'Kitchen Staff', phone: '096 321 654', status: 'Inactive' }
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsersList);
  const [showAddForm, setShowAddForm] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'Administrator',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.username) {
      alert('សូមបំពេញព័ត៌មាន Full Name និង Username!');
      return;
    }

    const newUser = {
      id: `U00${users.length + 1}`,
      name: formData.name,
      username: formData.username,
      role: formData.role || 'Administrator',
      phone: formData.phone || 'N/A',
      status: formData.status
    };

    setUsers([...users, newUser]);

    setFormData({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      role: 'Administrator',
      status: 'Active'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator': return { bg: '#f3e5f5', color: '#7b1fa2' };
      case 'Manager': return { bg: '#e3f2fd', color: '#1976d2' };
      case 'Cashier': return { bg: '#fff3e0', color: '#e65100' };
      case 'Waiter': return { bg: '#e0f2f1', color: '#00695c' };
      default: return { bg: '#fce4ec', color: '#c2185b' };
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* 1. Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Users', count: users.length, icon: <UserOutlined />, color: '#7c4dff', bg: '#f3e8ff' },
          { title: 'Active Users', count: users.filter((u) => u.status === 'Active').length, icon: <UsergroupAddOutlined />, color: '#2e7d32', bg: '#e8f5e9' },
          { title: 'Inactive Users', count: users.filter((u) => u.status === 'Inactive').length, icon: <UserDeleteOutlined />, color: '#d32f2f', bg: '#ffebee' },
          { title: 'Administrators', count: users.filter((u) => u.role === 'Administrator').length, icon: <SafetyCertificateOutlined />, color: '#ed6c02', bg: '#fff3e0' }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 48, height: 48, borderRadius: 2 }}>
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{card.title}</Typography>
                    <Typography variant="h4" fontWeight="bold">{card.count}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 2. Main Area */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={showAddForm ? 8 : 12}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold">Users List</Typography>
              {!showAddForm && (
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>
                  Add User
                </Button>
              )}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField placeholder="Search by name, username..." size="small" fullWidth />
              <Select defaultValue="All" size="small" sx={{ minWidth: 120 }}>
                <MenuItem value="All">All Roles</MenuItem>
              </Select>
              <Select defaultValue="All" size="small" sx={{ minWidth: 120 }}>
                <MenuItem value="All">All Status</MenuItem>
              </Select>
              <Button variant="outlined" startIcon={<FilterOutlined />}>Filter</Button>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    const roleStyle = getRoleColor(user.role);
                    return (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
                            <Typography variant="body2" fontWeight="medium">{user.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <Chip label={user.role} size="small" sx={{ bgcolor: roleStyle.bg, color: roleStyle.color, fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'error'} />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            <IconButton size="small" color="primary"><EyeOutlined /></IconButton>
                            <IconButton size="small" color="warning"><EditOutlined /></IconButton>
                            <IconButton size="small" color="error"><DeleteOutlined /></IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Pagination count={1} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Grid>

        {/* 3. Add User Form */}
        {showAddForm && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Add New User</Typography>
                <IconButton size="small" onClick={() => setShowAddForm(false)}><CloseOutlined /></IconButton>
              </Stack>

              <Stack spacing={2}>
                <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} size="small" fullWidth placeholder="Enter full name" />
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} size="small" fullWidth placeholder="Enter username" />
                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} size="small" fullWidth placeholder="Enter password" />
                <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} size="small" fullWidth placeholder="Confirm password" />
                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} size="small" fullWidth placeholder="Enter email address" />
                <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} size="small" fullWidth placeholder="Enter phone number" />

                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" name="role" value={formData.role} onChange={handleChange}>
                    <MenuItem value="Administrator">Administrator</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Cashier">Cashier</MenuItem>
                    <MenuItem value="Waiter">Waiter</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Status</Typography>
                  <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                    <FormControlLabel value="Active" control={<Radio size="small" />} label="Active" />
                    <FormControlLabel value="Inactive" control={<Radio size="small" />} label="Inactive" />
                  </RadioGroup>
                </FormControl>

                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button variant="contained" fullWidth startIcon={<PlusOutlined />} onClick={handleSaveUser}>
                    Save User
                  </Button>
                  <Button variant="outlined" color="secondary" fullWidth onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserManagement;
