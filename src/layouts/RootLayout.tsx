import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 8, flex: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
