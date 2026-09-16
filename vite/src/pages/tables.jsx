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
  Pagination,
  InputAdornment
} from '@mui/material';
import {
  TableOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  CalendarOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  UpOutlined
} from '@ant-design/icons';

// 1. Initial Dummy Data
const initialTables = [
  { id: 'DRD-00041', name: 'Table 01', capacity: '4 Seater', zone: 'Main Floor', location: '', status: 'Available' },
  { id: 'DRD-00042', name: 'Table 02', capacity: '4 Seater', zone: 'Main Floor', location: '', status: 'Occupied' },
  { id: 'DRD-00043', name: 'Table 03', capacity: '2 Seater', zone: 'Window', location: '', status: 'Occupied' },
  { id: 'DRD-00044', name: 'Table 04', capacity: '2 Seater', zone: 'Garden', location: '', status: 'Reserved' },
  { id: 'DRD-00045', name: 'Table 05', capacity: '4 Seater', zone: 'Window', location: '', status: 'Occupied' },
  { id: 'DRD-00047', name: 'Table 07', capacity: '2 Seater', zone: 'Garden', location: '', status: 'Reserved' },
  { id: 'DRD-00048', name: 'Table 08', capacity: '4 Seater', zone: 'Window', location: '', status: 'Cleaning' },
  { id: 'DRD-00049', name: 'Table 09', capacity: '2 Seater', zone: 'Garden', location: '', status: 'Cleaning' }
];

const capacityOptions = ['2 Seater', '4 Seater', '6 Seater', '8 Seater'];
const zoneOptions = ['Main Floor', 'Window', 'Garden', 'Private Room'];

const getStatusColor = (status) => {
  switch (status) {
    case 'Available': return { bg: '#dcfce7', color: '#15803d' };
    case 'Occupied': return { bg: '#dbeafe', color: '#1d4ed8' };
    case 'Reserved': return { bg: '#fef3c7', color: '#b45309' };
    case 'Cleaning': return { bg: '#f1f5f9', color: '#475569' };
    default: return { bg: '#f1f5f9', color: '#475569' };
  }
};

const TablesPage = () => {
  const [tables, setTables] = useState(initialTables);
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    zone: '',
    location: '',
    status: 'Available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      capacity: '',
      zone: '',
      location: '',
      status: 'Available'
    });
    setEditingId(null);
  };

  const handleSaveTable = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.capacity || !formData.zone) {
      alert('សូមបំពេញ Table Name, Capacity និង Zone!');
      return;
    }

    if (editingId) {
      setTables(
        tables.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: formData.name,
                capacity: formData.capacity,
                zone: formData.zone,
                location: formData.location,
                status: formData.status
              }
            : t
        )
      );
      setEditingId(null);
    } else {
      const newTable = {
        id: `DRD-${String(tables.length + 41).padStart(5, '0')}`,
        name: formData.name,
        capacity: formData.capacity,
        zone: formData.zone,
        location: formData.location,
        status: formData.status
      };
      setTables([...tables, newTable]);
    }

    resetForm();
  };

  const handleEdit = (table) => {
    setEditingId(table.id);
    setFormData({
      name: table.name,
      capacity: table.capacity,
      zone: table.zone,
      location: table.location,
      status: table.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុប Table នេះមែនទេ?')) {
      setTables(tables.filter((t) => t.id !== id));
    }
  };

  const totalTables = tables.length;
  const availableTables = tables.filter((t) => t.status === 'Available').length;
  const occupiedTables = tables.filter((t) => t.status === 'Occupied').length;
  const reservedCleaningTables = tables.filter((t) => t.status === 'Reserved' || t.status === 'Cleaning').length;

  return (
    <Box sx={{ p: 1 }}>
      {/* 1. Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Tables', count: totalTables, sub: 'Total Tables', icon: <TableOutlined />, color: '#2563eb', bg: '#dbeafe' },
          { title: 'Available Tables', count: availableTables, sub: 'Available Tables', icon: <CheckCircleOutlined />, color: '#16a34a', bg: '#dcfce7' },
          { title: 'Occupied Tables', count: occupiedTables, sub: 'Occupied Tables', icon: <TeamOutlined />, color: '#d97706', bg: '#fef3c7' },
          { title: 'Reserved/Cleaning', count: reservedCleaningTables, sub: 'Reserved/Cleaning', icon: <CalendarOutlined />, color: '#7c3aed', bg: '#f3e8ff' }
        ].map((card, index) => (
          <Grid  xs={12} sm={6} md={3} key={index}>
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
              <Typography variant="h5" fontWeight="bold">Tables List</Typography>
              {!showAddForm && (
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>
                  Add Table
                </Button>
              )}
            </Stack>

            {/* Filter Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                placeholder="Search by tables name, tables..."
                size="small"
                fullwidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  )
                }}
              />
              <Select defaultValue="All" size="small" sx={{ minWidth: 130 }}>
                <MenuItem value="All">Zone</MenuItem>
                {zoneOptions.map((z) => (
                  <MenuItem key={z} value={z}>{z}</MenuItem>
                ))}
              </Select>
              <Select defaultValue="All" size="small" sx={{ minWidth: 130 }}>
                <MenuItem value="All">Status</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Reserved">Reserved</MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
              </Select>
              <Button variant="outlined" startIcon={<FilterOutlined />}>Filter</Button>
            </Stack>

            {/* Tables Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Table ID</TableCell>
                    <TableCell>Table Name</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Zone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tables.map((table) => {
                    const statusStyle = getStatusColor(table.status);
                    return (
                      <TableRow key={table.id} hover>
                        <TableCell>#{table.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{table.name}</Typography>
                        </TableCell>
                        <TableCell>{table.capacity}</TableCell>
                        <TableCell>{table.zone}</TableCell>
                        <TableCell>
                          <Chip
                            label={table.status}
                            size="small"
                            sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton size="small" color="primary"><EyeOutlined /></IconButton>
                            <IconButton size="small" color="warning" onClick={() => handleEdit(table)}><EditOutlined /></IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(table.id)}><DeleteOutlined /></IconButton>
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
                Showing 1 to {tables.length} of {tables.length} items
              </Typography>
              <Pagination count={Math.max(1, Math.ceil(tables.length / 8))} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Grid>

        {/* 3. Add / Edit Table Form Panel */}
        {showAddForm && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {editingId ? 'Edit Table' : 'Add New Table'}
                </Typography>
                <IconButton size="small" onClick={() => { setShowAddForm(false); resetForm(); }}>
                  <UpOutlined />
                </IconButton>
              </Stack>

              <form onSubmit={handleSaveTable}>
                <Stack spacing={2}>
                  {/* Table Name */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Table Name <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter table name"
                      size="small"
                      fullWidth
                    />
                  </Box>

                  {/* Capacity */}
                  <FormControl fullWidth size="small">
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Capacity <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Select name="capacity" value={formData.capacity} onChange={handleChange} displayEmpty>
                      <MenuItem value="" disabled>Select capacity</MenuItem>
                      {capacityOptions.map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Zone */}
                  <FormControl fullWidth size="small">
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Zone <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Select name="zone" value={formData.zone} onChange={handleChange} displayEmpty>
                      <MenuItem value="" disabled>Select zone</MenuItem>
                      {zoneOptions.map((z) => (
                        <MenuItem key={z} value={z}>{z}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Location */}
                  <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                      Location <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
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
                      {editingId ? 'Update Table' : 'Save Table'}
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

export default TablesPage;
