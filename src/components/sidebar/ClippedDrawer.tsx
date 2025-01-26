import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import DashboardPage from '../../pages/DashboardPage.tsx';
import FlowerPage from "../../pages/FlowerPage.tsx";
import { useEffect, useState } from "react";
import CustomerPage from "../../pages/CustomerPage.tsx";
import PlaceOrderPage from "../../pages/PlaceOrderPage.tsx";
import b1 from './assets/b1.jpg';

const drawerWidth = 230;

export default function HoverableSidebar() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, []);

    const location = useLocation();

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundImage: 'url(/b1.jpg)',
            backgroundSize: 'cover', // Ensure the image covers the entire background
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // Prevent repeating the image
            padding: '20px',
        }}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        color: '#003366', // Dark blue for text color
                        backgroundColor: '#d0e9f5', // Light blue for background
                        opacity: 0.9,
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                        borderRadius: '16px',
                        height: 'calc(100vh - 40px)',
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginLeft: '20px',
                        marginRight: '20px',
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ textAlign: 'center', mt: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#003366', // Dark blue color
                            fontFamily: 'Fira Code, monospace',
                            fontSize: '26px',
                            fontWeight: 'bold',
                            marginBottom: '0',
                        }}
                    >
                        Floral Dreams
                    </Typography>

                    <img
                        src="/logo.png"
                        alt="Green Shadow Logo"
                        style={{ width: '150px', height: 'auto', marginTop: '0', marginLeft: '40px' }} // Adjust size and spacing
                    />

                    <List>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon />, to: '/' },
                            { text: 'Flowers', icon: <LocalFloristIcon />, to: '/flower' },
                            { text: 'Customers', icon: <GroupIcon />, to: '/customer' },
                            { text: 'Place Order', icon: <ShoppingCartIcon />, to: '/placeOrder' },
                            { text: 'Order Details', icon: <ReceiptLongIcon />, to: '/orderDetails' },
                            { text: 'Payment', icon: <PaymentIcon />, to: '/payment' },
                            { text: 'Log Out', icon: <ExitToAppIcon />, to: '/logout' },
                        ].map((item) => (
                            <Tooltip title={item.text} placement="right" key={item.text}>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        marginBottom: '5px',
                                        border: '2px solid #7da6d5', // Blue border
                                    }}
                                >
                                    <ListItemButton
                                        component={Link}
                                        to={item.to}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 102, 204, 0.8)', // Blue hover effect
                                                transition: '0.3s',
                                                '& .MuiListItemText-primary': {
                                                    color: '#fff', // White text on hover
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: '#fff', // White icon on hover
                                                },
                                            },
                                            ...(location.pathname === item.to && {
                                                backgroundColor: 'rgba(0, 102, 204, 0.8)',
                                                fontWeight: 'bold',
                                                '& .MuiListItemText-primary': {
                                                    color: '#fff',
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: '#fff',
                                                },
                                            }),
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#003366' }}>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                sx: {
                                                    color: '#003366', // Dark blue text
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#d0e9f5', opacity: 0.9, borderRadius: '16px', marginLeft: '20px' }}>
                {/* Upper box for the page title */}
                <Box
                    sx={{ padding: '16px', backgroundColor: '#336699', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                        {currentTime.toLocaleDateString()}  -  {currentTime.toLocaleTimeString()}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', textAlign: 'right' }}
                    >
                        {(() => {
                            switch (location.pathname) {
                                case '/':
                                    return 'Dashboard';
                                case '/flower':
                                    return 'Flower Management';
                                case '/customer':
                                    return 'Customer Management';
                                case '/placeOrder':
                                    return 'Orders Management';
                                case '/orderDetails':
                                    return 'Order Details';
                                case '/payment':
                                    return 'Payments';
                                case '/logout':
                                    return 'Logout';
                                default:
                                    return '';
                            }
                        })()}
                    </Typography>
                </Box>

                {/* Lower box for the page content */}
                <Box sx={{ padding: '16px', backgroundColor: '#336699', borderRadius: '8px', height: '87%' }}>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/flower" element={<FlowerPage />} />
                        <Route path="/customer" element={<CustomerPage />} />
                        <Route path="/placeOrder" element={<PlaceOrderPage />} />
                        <Route path="/orderDetails" element={<FlowerPage />} />
                        <Route path="/payment" element={<FlowerPage />} />
                    </Routes>
                </Box>

            </Box>

        </Box>
    );
}
