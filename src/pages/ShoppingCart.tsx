import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CartItem } from '../types';

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // カート内のアイテムを取得（ローカルストレージやAPIから）
    // この例では、ダミーデータを使用します
    setCartItems([
      { id: 1, name: 'Product 1', size: 'M', price: 1000, quantity: 1 },
      { id: 2, name: 'Product 2', size: 'L', price: 1700, quantity: 2 },
      // 他のカートアイテム...
    ]);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        ショッピングカート
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell>サイズ</TableCell>
              <TableCell align="right">価格</TableCell>
              <TableCell align="right">数量</TableCell>
              <TableCell align="right">小計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell align="right">¥{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">¥{item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">合計</TableCell>
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
    </Container>
  );
};

export default ShoppingCart;