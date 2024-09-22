import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront'; // 商品一覧用のアイコン
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // ショッピングカート用のアイコン

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1A3636' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ECサイト
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/products" startIcon={<StorefrontIcon />}>
            商品一覧
          </Button>
          <Button color="inherit" component={RouterLink} to="/cart" startIcon={<ShoppingCartIcon />}>
            ショッピングカート
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;