import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormControlLabel, Checkbox, Box } from '@mui/material';
import { Product, Topping } from '../types';
import { fetchItemDetail, fetchToppings } from '../lib/fetch';
import Layout from '../components/Layout';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<'M' | 'L'>('M');
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  useEffect(() => {
    if (!id) return;
    const getItemById = async (id: string) => {
      try {
        const { data } = await fetchItemDetail(id);
        setProduct({ ...data, imagePath: data.image_path, priceM: data.price_m, priceL: data.price_l });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    const getToppings = async () => {
      try {
        const { data } = await fetchToppings();
        setToppings(data.map((item: any) => ({ ...item, priceM: item.price_m, priceL: item.price_l })));
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };
    getItemById(id);
    getToppings();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Added to cart:', { product, size, selectedToppings });
  };

  const handleSizeChange = (event: SelectChangeEvent<'M' | 'L'>) => {
    setSize(event.target.value as 'M' | 'L');
  };

  const handleToppingChange = (topping: Topping) => {
    setSelectedToppings((prev) => {
      if (prev.some((selected) => selected.id === topping.id)) {
        return prev.filter((selected) => selected.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = size === 'M' ? product?.priceM ?? 0 : product?.priceL ?? 0;
    const toppingPrice = selectedToppings.reduce((total, topping) => {
      return total + (size === 'M' ? topping.priceM : topping.priceL);
    }, 0);
    return basePrice + toppingPrice;
  };

  if (!product) {
    return (
      <Layout>
        <Typography variant="h4" component="h1" gutterBottom>
          ローディング中...
        </Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box my={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={product.imagePath}
          alt={product.name}
          style={{ width: '100%', maxWidth: '400px', objectFit: 'cover' }}
        />
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1">
          {product.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          サイズ
        </Typography>
        <FormControl size='small' style={{ width: "30%" }}>
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
        <Box>
          {toppings.map((topping) => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppings.some((selected) => selected.id === topping.id)}
                  onChange={() => handleToppingChange(topping)}
                />
              }
              label={`${topping.name}: ¥${size === 'M' ? topping.priceM : topping.priceL}`}
            />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          価格: ¥{calculateTotalPrice()}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{ marginTop: '1.5rem', width: '50%' }}
          >
            カートに追加
          </Button>
        </Box>
      </div>
    </Layout>
  );
};

export default ProductDetail;