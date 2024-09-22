import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Product } from '../types';
import { fetchItems } from '../lib/fetch';
import Layout from '../components/Layout';

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
    <Layout>
      <Box my={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          商品一覧
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imagePath}
                alt={product.name}
              />
              <CardContent style={{ gap: 12 ,display: "flex", flexDirection: 'column', justifyContent: "space-between", flexGrow: 1 }}>
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1">
                    M: ¥{product.priceM} / L: ¥{product.priceL}
                  </Typography>
                </Box>
                <Box>
                  <Button component={Link} to={`/products/${product.id}`} variant="contained" color="primary">
                    詳細を見る
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default ProductList;