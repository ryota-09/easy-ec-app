import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Product, Topping } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<'M' | 'L'>('M');
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    // 商品データを取得します（例: APIコール）
    setProduct({
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      priceM: 1000,
      priceL: 1500,
      imagePath: '/path/to/image1.jpg'
    });

    // トッピングデータを取得
    setToppings([
      { id: 1, name: 'Topping 1', priceM: 100, priceL: 150 },
      { id: 2, name: 'Topping 2', priceM: 200, priceL: 250 },
    ]);
  }, [id]);

  const handleAddToCart = () => {
    console.log('Added to cart:', { product, size });
  };

  const handleSizeChange = (event: SelectChangeEvent<'M' | 'L'>) => {
    setSize(event.target.value as 'M' | 'L');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* 上部は縦に並べる */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={product.imagePath}
            alt={product.name}
            style={{ width: '100%', maxWidth: '400px', objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            価格: ¥{size === 'M' ? product.priceM : product.priceL}
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="size-select-label">サイズ</InputLabel>
            <Select
              labelId="size-select-label"
              value={size}
              onChange={handleSizeChange}
            >
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            トッピング
          </Typography>
          {toppings.map((topping) => (
            <Typography key={topping.id} variant="body1">
              {topping.name}: ¥{size === 'M' ? topping.priceM : topping.priceL}
            </Typography>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            カートに追加
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;