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
  Divider
} from '@mui/material';
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UpOutlined,
  DollarOutlined,
  PrinterOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

// 1. តារាងមើលភ្ញៀវបង់លុយមិនបង់លុយ
//  Table ជាព័ត៌មានចម្បង (primary) - paymentStatus ជា "Pay Ready" / "Not Pay" សម្រាប់ការគិតលុយ


const initialReservations = [
  {
    id: 'RES-001',
    table: 'A01 - Row A / Window',
    customerName: 'John Doe',
    phone: '012 345 678',
    date: '20 May 2024',
    time: '7:00 PM',
    guests: 5,
    status: 'Confirmed',
    paymentStatus: 'Not Pay',
    orderItems: [
      { name: 'Classic Burger', qty: 2, price: 5.0 },
      { name: 'Orange Juice', qty: 2, price: 2.5 },
      { name: 'Caesar Salad', qty: 1, price: 4.0 }
    ]
  },
  {
    id: 'RES-002',
    table: 'A02 - Row A / Window',
    customerName: 'Mary Jane',
    phone: '012 876 543',
    date: '20 May 2024',
    time: '7:00 PM',
    guests: 4,
    status: 'Pending',
    paymentStatus: 'Not Pay',
    orderItems: [
      { name: 'Margherita Pizza', qty: 1, price: 8.5 },
      { name: 'Iced Coffee', qty: 2, price: 2.75 }
    ]
  },
  {
    id: 'RES-003',
    table: 'B03 - Row B / Main Floor',
    customerName: 'David Smith',
    phone: '012 655 421',
    date: '16 May 2024',
    time: '7:00 PM',
    guests: 4,
    status: 'Seated',
    paymentStatus: 'Pay Ready',
    orderItems: [
      { name: 'Spaghetti Carbonara', qty: 2, price: 7.5 },
      { name: 'Cheesecake', qty: 1, price: 4.5 }
    ]
  },
  {
    id: 'RES-004',
    table: 'B04 - Row B / Garden',
    customerName: '',
    phone: '',
    date: '16 May 2024',
    time: '7:00 PM',
    guests: 3,
    status: 'Cancelled',
    paymentStatus: 'Not Pay',
    orderItems: []
  }
];

//  បញ្ជីតុ (ត្រូវផ្គូផ្គងជាមួយ Tables សម្រាប់គឹតលុយភ្ញៀវ)

const tableOptions = [
  'A01 - Row A / Window',
  'A02 - Row A / Window',
  'B03 - Row B / Main Floor',
  'B04 - Row B / Garden',
  'C05 - Row C / Window'
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmed': return { bg: '#dbeafe', color: '#1d4ed8' };
    case 'Pending': return { bg: '#fef3c7', color: '#b45309' };
    case 'Seated': return { bg: '#dcfce7', color: '#15803d' };
    case 'Cancelled': return { bg: '#fee2e2', color: '#b91c1c' };
    default: return { bg: '#f1f5f9', color: '#475569' };
  }
};

const getPaymentColor = (paymentStatus) =>
  paymentStatus === 'Pay Ready' ? { bg: '#dcfce7', color: '#15803d' } : { bg: '#fee2e2', color: '#b91c1c' };

const ReservationsPage = () => {
  const [reservations, setReservations] = useState(initialReservations);

  // add reservation ថ្មី: 'add' | 'edit' | 'invoice'

  const [panelMode, setPanelMode] = useState('add');
  const [showPanel, setShowPanel] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [invoiceReservationId, setInvoiceReservationId] = useState(null);

  const [formData, setFormData] = useState({
    table: '',
    customerName: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
    status: 'Confirmed'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      table: '',
      customerName: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      specialRequests: '',
      status: 'Confirmed'
    });
    setEditingId(null);
  };

  const openAddForm = () => {
    resetForm();
    setPanelMode('add');
    setInvoiceReservationId(null);
    setShowPanel(true);
  };

  // ចុចលើតុ បើក Invoice panel ជំនួស Add form

  const openInvoice = (reservation) => {
    setInvoiceReservationId(reservation.id);
    setPanelMode('invoice');
    setShowPanel(true);
  };

  const handleSaveReservation = (e) => {
    e.preventDefault();

    if (!formData.table || !formData.date.trim() || !formData.time.trim()) {
      alert('សូមជ្រើសរើស Table និងបំពេញ Date & Time!');
      return;
    }

    if (editingId) {
      setReservations(
        reservations.map((r) =>
          r.id === editingId
            ? {
                ...r,
                table: formData.table,
                customerName: formData.customerName,
                phone: formData.phone,
                date: formData.date,
                time: formData.time,
                guests: parseInt(formData.guests, 10) || 0,
                status: formData.status
              }
            : r
        )
      );
      setEditingId(null);
    } else {
      const newReservation = {
        id: `RES-${String(reservations.length + 1).padStart(3, '0')}`,
        table: formData.table,
        customerName: formData.customerName,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests, 10) || 0,
        status: formData.status,
        paymentStatus: 'Not Pay',
        orderItems: []
      };
      setReservations([...reservations, newReservation]);
    }

    resetForm();
    setPanelMode('add');
  };

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setFormData({
      table: reservation.table,
      customerName: reservation.customerName,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: String(reservation.guests),
      specialRequests: '',
      status: reservation.status
    });
    setPanelMode('edit');
    setShowPanel(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុប Reservation នេះមែនទេ?')) {
      setReservations(reservations.filter((r) => r.id !== id));
    }
  };

  //   Invoice panel 
  const markAsPaid = (id) => {
    setReservations(reservations.map((r) => (r.id === id ? { ...r, paymentStatus: 'Pay Ready' } : r)));
  };

  const totalReservations = reservations.length;
  const confirmedCount = reservations.filter((r) => r.status === 'Confirmed').length;
  const pendingCount = reservations.filter((r) => r.status === 'Pending').length;
  const cancelledCount = reservations.filter((r) => r.status === 'Cancelled').length;

  const invoiceReservation = reservations.find((r) => r.id === invoiceReservationId);
  const invoiceTotal = invoiceReservation
    ? invoiceReservation.orderItems.reduce((sum, item) => sum + item.qty * item.price, 0)
    : 0;

  return (
    <Box sx={{ p: 1 }}>
      {/* 1. Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Reservations', count: totalReservations, sub: `Today: ${totalReservations}`, icon: <BellOutlined />, color: '#2563eb', bg: '#dbeafe' },
          { title: 'Confirmed', count: confirmedCount, sub: 'Confirmed', icon: <CheckCircleOutlined />, color: '#16a34a', bg: '#dcfce7' },
          { title: 'Pending', count: pendingCount, sub: 'Pending', icon: <ClockCircleOutlined />, color: '#d97706', bg: '#fef3c7' },
          { title: 'Cancelled', count: cancelledCount, sub: 'Cancelled', icon: <CloseCircleOutlined />, color: '#dc2626', bg: '#fee2e2' }
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

      {/* 2. Main Area (Table + Side Panel) */}
      
      <Grid container spacing={3}>
        {/* Table Section */}
        <Grid item xs={12} md={showPanel ? 8 : 12}>
          <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold">Reservations List</Typography>
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={openAddForm}>
                Add Reservation
              </Button>
            </Stack>

            {/* Filter Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField placeholder="Search by table, reservation ID..." size="small" fullWidth />
              <Select defaultValue="All" size="small" sx={{ minWidth: 130 }}>
                <MenuItem value="All">All Tables</MenuItem>
                {tableOptions.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
              <Button variant="outlined" startIcon={<CalendarOutlined />}>Date Picker</Button>
            </Stack>

            {/* Reservations Table -  ដើម្បីកុំឲ្យ Guests/Status ធ្លាក់ចុះក្រោម */}

            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 780 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Reservation ID</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Table</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Customer</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Date & Time</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Guests</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Status</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Payment</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((r) => {
                    const statusStyle = getStatusColor(r.status);
                    const paymentStyle = getPaymentColor(r.paymentStatus);
                    return (
                      <TableRow
                        key={r.id}
                        hover
                        onClick={() => openInvoice(r)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>#{r.id}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <Chip label={r.table} size="small" sx={{ bgcolor: '#e0e7ff', color: '#3730a3', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {r.customerName ? (
                            <Box>
                              <Typography variant="body2" fontWeight="medium">{r.customerName}</Typography>
                              <Typography variant="caption" color="text.secondary">{r.phone}</Typography>
                            </Box>
                          ) : (
                            <Typography variant="caption" color="text.secondary">Walk-in</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <Typography variant="body2">{r.date}</Typography>
                          <Typography variant="caption" color="text.secondary">{r.time}</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{r.guests}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <Chip label={r.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <Chip label={r.paymentStatus} size="small" sx={{ bgcolor: paymentStyle.bg, color: paymentStyle.color, fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.5} justifyContent="center" onClick={(e) => e.stopPropagation()}>
                            <IconButton size="small" color="primary" onClick={() => openInvoice(r)}><EyeOutlined /></IconButton>
                            <IconButton size="small" color="warning" onClick={() => handleEdit(r)}><EditOutlined /></IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(r.id)}><DeleteOutlined /></IconButton>
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
                Showing 1 to {reservations.length} of {reservations.length} items
              </Typography>
              <Pagination count={Math.max(1, Math.ceil(reservations.length / 8))} color="primary" shape="rounded" />
            </Box>
          </Paper>
        </Grid>

        {/* 3. Side Panel: Add/Edit Form OR Invoice */}

        {showPanel && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>

              {/*  INVOICE VIEW - ចេញពេលចុចលើតុណាមួយ */}

              {panelMode === 'invoice' && invoiceReservation ? (
                <>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton size="small" onClick={openAddForm}><ArrowLeftOutlined /></IconButton>
                      <Typography variant="h6" fontWeight="bold">Invoice</Typography>
                    </Stack>
                    <IconButton size="small" onClick={() => setShowPanel(false)}><UpOutlined /></IconButton>
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <Chip label={invoiceReservation.table} sx={{ bgcolor: '#e0e7ff', color: '#3730a3', fontWeight: 'bold', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {invoiceReservation.customerName || 'Walk-in customer'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {invoiceReservation.date} · {invoiceReservation.time} · {invoiceReservation.guests} pax
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Order Items</Typography>

                  {invoiceReservation.orderItems.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      មិនទាន់មានការកម្ម៉ង់សម្រាប់តុនេះទេ
                    </Typography>
                  ) : (
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {invoiceReservation.orderItems.map((item, idx) => (
                        <Stack key={idx} direction="row" justifyContent="space-between">
                          <Typography variant="body2">
                            {item.name} <Typography component="span" variant="caption" color="text.secondary">x{item.qty}</Typography>
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">${(item.qty * item.price).toFixed(2)}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )}

                  <Divider sx={{ mb: 2 }} />

                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">${invoiceTotal.toFixed(2)}</Typography>
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>Payment Status</Typography>
                    <Chip
                      label={invoiceReservation.paymentStatus}
                      sx={{
                        bgcolor: getPaymentColor(invoiceReservation.paymentStatus).bg,
                        color: getPaymentColor(invoiceReservation.paymentStatus).color,
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>

                  <Stack direction="row" spacing={2}>
                    {invoiceReservation.paymentStatus === 'Not Pay' ? (
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<DollarOutlined />}
                        onClick={() => markAsPaid(invoiceReservation.id)}
                      >
                        Mark as Pay Ready
                      </Button>
                    ) : (
                      <Button variant="contained" fullWidth startIcon={<PrinterOutlined />}>
                        Print Invoice
                      </Button>
                    )}
                  </Stack>
                </>
              ) : (
                /*   / EDIT RESERVATION FORM  */
                <>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {panelMode === 'edit' ? 'Edit Reservation' : 'Add New Reservation'}
                    </Typography>
                    <IconButton size="small" onClick={() => setShowPanel(false)}>
                      <UpOutlined />
                    </IconButton>
                  </Stack>

                  <form onSubmit={handleSaveReservation}>
                    <Stack spacing={2}>
                      <FormControl fullWidth size="small">
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Table <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Select name="table" value={formData.table} onChange={handleChange} displayEmpty>
                          <MenuItem value="" disabled>Select table</MenuItem>
                          {tableOptions.map((t) => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                          ))}
                        </Select>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          ការគិតលុយផ្អែកលើតុនេះ មិនមែនលើឈ្មោះភ្ញៀវទេ
                        </Typography>
                      </FormControl>

                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Customer Name (Optional)
                        </Typography>
                        <TextField
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          placeholder="Enter customer name (if known)"
                          size="small"
                          fullWidth
                        />
                      </Box>

                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Phone Number (Optional)
                        </Typography>
                        <TextField
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone (if known)"
                          size="small"
                          fullWidth
                        />
                      </Box>

                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Reservation Date & Time <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <TextField name="date" value={formData.date} onChange={handleChange} placeholder="20 May 2024" size="small" fullWidth />
                          <TextField name="time" value={formData.time} onChange={handleChange} placeholder="7:00 PM" size="small" fullWidth />
                        </Stack>
                      </Box>

                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Number of Guests (pax)
                        </Typography>
                        <TextField
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          placeholder="pax"
                          type="number"
                          size="small"
                          fullWidth
                        />
                      </Box>

                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>Special Requests</Typography>
                        <TextField
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleChange}
                          placeholder="Special Requests"
                          multiline
                          rows={2}
                          size="small"
                          fullWidth
                        />
                      </Box>

                      <FormControl>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          Status <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                          <FormControlLabel value="Confirmed" control={<Radio size="small" />} label="Confirmed" />
                          <FormControlLabel value="Pending" control={<Radio size="small" />} label="Pending" />
                        </RadioGroup>
                      </FormControl>

                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Button type="submit" variant="contained" fullWidth startIcon={<PlusOutlined />}>
                          {panelMode === 'edit' ? 'Update Reservation' : 'Save Reservation'}
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          onClick={() => { resetForm(); setShowPanel(false); }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReservationsPage;
