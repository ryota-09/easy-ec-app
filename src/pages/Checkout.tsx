import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { OrderFormData } from '../types';
import Layout from '../components/Layout';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    zipcode: '',
    address: '',
    tel: '',
    deliveryTime: '',
    paymentMethod: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ここで注文処理を行います（APIコールなど）
    console.log('Order submitted:', formData);
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        購入手続き
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="お名前"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="メールアドレス"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="zipcode"
              label="郵便番号"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="address"
              label="住所"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="tel"
              label="電話番号"
              value={formData.tel}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="delivery-time-label">配達時間</InputLabel>
              <Select
                labelId="delivery-time-label"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleSelectChange}
              >
                <MenuItem value="10:00-12:00">10:00-12:00</MenuItem>
                <MenuItem value="14:00-16:00">14:00-16:00</MenuItem>
                <MenuItem value="18:00-20:00">18:00-20:00</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="payment-method-label">支払い方法</InputLabel>
              <Select
                labelId="payment-method-label"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleSelectChange}
              >
                <MenuItem value="credit-card">クレジットカード</MenuItem>
                <MenuItem value="bank-transfer">銀行振込</MenuItem>
                <MenuItem value="cash-on-delivery">代金引換</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          注文を確定する
        </Button>
      </form>
    </Layout>
  );
};

export default Checkout;