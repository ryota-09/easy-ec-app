import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Product } from '../types';
import { fetchItems } from '../lib/fetch';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchItems();
        for (const item of data) {
          setProducts((prev) => [...prev, { ...item, imagePath: item.image_path, priceM: item.price_m, priceL: item.price_l }]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getItems();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        商品一覧
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.imagePath}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body1">
                  M: ¥{product.priceM} / L: ¥{product.priceL}
                </Typography>
                <Button component={Link} to={`/products/${product.id}`} variant="contained" color="primary">
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;