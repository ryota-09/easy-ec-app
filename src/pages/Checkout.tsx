import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { OrderFormData } from '../types';
import Layout from '../components/Layout';
import { useGlobalState } from '../providers';
import { registerOrder } from '../lib/fetch';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    userId: "00a717b2-3e60-47be-9ea1-7797fb158efc",
    destinationName: "テスト",
    destinationEmail: "test@example.us",
    destinationZipcode: "0001111",
    destinationAddress: "東京都",
    destinationTel: "000-0000",
    deliveryTime: "10:00-12:00",
    paymentMethod: "0",
    orderDate: new Date().toISOString(),
    totalPrice: 0,
    status: 0,
    orderList: []
  });
  const { state } = useGlobalState(); // Access the global state
  const cartItems = state.shoppingCart || [];

  const calculateItemPrice = (item: any) => {
    const basePrice = item.size === 'M' ? 1000 : 1700; // Example base price logic, adjust as needed
    const toppingsPrice = item.toppings.reduce(
      (total: number, topping: any) => total + (item.size === 'M' ? topping.priceM : topping.priceL),
      0
    );
    return basePrice + toppingsPrice;
  };

  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + calculateItemPrice(item) * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetData = {
      ...formData,
      totalPrice: totalPrice,
      orderList: state.shoppingCart.map((item) => (
        {
          productId: item.product.id,
          size: item.size,
          quantity: item.quantity,
          toppingIds: item.toppings.map((topping) => topping.id)
        }
      ))
    }

    const data = await registerOrder(targetData);
    console.log('Success posting order:', data);
  };

  return (
    <Layout>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          購入手続き
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="destinationName"
              label="お名前"
              value={formData.destinationName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="destinationEmail"
              label="メールアドレス"
              type="email"
              value={formData.destinationEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="destinationZipcode"
              label="郵便番号"
              value={formData.destinationZipcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="destinationAddress"
              label="住所"
              value={formData.destinationAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="destinationTel"
              label="電話番号"
              value={formData.destinationTel}
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
                <MenuItem value="0">クレジットカード</MenuItem>
                <MenuItem value="1">銀行振込</MenuItem>
                <MenuItem value="2">代金引換</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>商品名</TableCell>
                    <TableCell>サイズ</TableCell>
                    <TableCell align="right">価格</TableCell>
                    <TableCell align="right">数量</TableCell>
                    <TableCell align="right">トッピング</TableCell>
                    <TableCell align="right">小計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item: any) => (
                    <TableRow key={item.product.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell align="right">¥{calculateItemPrice(item)}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {item.toppings.map((topping: any) => (
                          <div key={topping.id}>
                            {topping.name} (¥{item.size === 'M' ? topping.priceM : topping.priceL})
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="right">¥{calculateItemPrice(item) * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} align="right">合計</TableCell>
                    <TableCell align="right">¥{totalPrice}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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