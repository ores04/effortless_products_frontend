import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, CssBaseline } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import KeyIcon from '@mui/icons-material/VpnKeyOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import StorageIcon from '@mui/icons-material/StorageOutlined';
import ApiIcon from '@mui/icons-material/ApiOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260; // Slightly wider for better spacing

// Grouped menu structure to match the reference image style
const menuGroups = [
  {
    title: null, // Top section, no title
    items: [
      { text: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'API-Schlüssel', icon: <KeyIcon />, path: '/dashboard/keys' },
    ]
  },
  {
    title: 'Management',
    items: [
      { text: 'Datasets', icon: <StorageIcon />, path: '/dashboard/datasets' },
      { text: 'Endpoints', icon: <ApiIcon />, path: '/dashboard/endpoints' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { text: 'Billing', icon: <CreditCardIcon />, path: '/dashboard/billing' },
    ]
  }
];

export default function DashboardLayout() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const activeMenuGroups = [...menuGroups];
  if (isAdmin) {
    activeMenuGroups.push({
      title: 'Admin',
      items: [
        { text: 'Video Upload', icon: <CloudUploadIcon />, path: '/dashboard/video-upload' },
      ]
    });
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: 'none', // Remove default border
            bgcolor: '#F5F5F7', // Light grey background like provided image
            color: '#1A1A1A',
            p: 2, // Padding around the content
          },
        }}
      >
        {/* Simple header or logo area if needed, otherwise just spacing */}
        <Box sx={{ mb: 4, px: 2 }}>
             {/* Placeholder for logo or brand name if desired, currently empty to match clean style */}
             <Typography variant="subtitle2" sx={{ fontWeight: 'bold', letterSpacing: 1, opacity: 0.5 }}>
                 Effortless Products
             </Typography>
        </Box>

        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {activeMenuGroups.map((group, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              {group.title && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    px: 2, 
                    mb: 1, 
                    display: 'block', 
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  {group.title}
                </Typography>
              )}
              <List>
                {group.items.map((item) => {
                   const isSelected = location.pathname === item.path;
                   return (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton 
                        selected={isSelected}
                        onClick={() => navigate(item.path)}
                        sx={{
                          borderRadius: 2, // Rounded corners
                          py: 1,
                          px: 2,
                          '&.Mui-selected': {
                            bgcolor: 'rgba(0, 0, 0, 0.05)', // Subtle grey selection
                            color: 'text.primary',
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.08)',
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'text.primary',
                            }
                          },
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.03)',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            fontSize: '0.95rem', 
                            fontWeight: isSelected ? 600 : 400 
                          }} 
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ))}

          {/* User/Footer Section */}
          <Box sx={{ mt: 'auto', pt: 2 }}>
             <ListItem disablePadding>
                <ListItemButton 
                    onClick={handleLogout}
                     sx={{
                          borderRadius: 2,
                          py: 1,
                          px: 2,
                          color: 'text.secondary',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.03)',
                            color: 'error.main'
                          },
                        }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.95rem' }} />
                </ListItemButton>
             </ListItem>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#FFFFFF', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
