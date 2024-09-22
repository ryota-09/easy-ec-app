import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import Layout from '../components/Layout';
import { useGlobalState } from '../providers';

const ShoppingCart: React.FC = () => {
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

  return (
    <Layout>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ショッピングカート
        </Typography>
      </Box>
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
      <Button
        component={Link}
        to="/checkout"
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
      >
        購入手続きへ
      </Button>
    </Layout>
  );
};

export default ShoppingCart;