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
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import DashboardPage from '../../pages/DashboardPage.tsx';
import FlowerPage from "../../pages/FlowerPage.tsx";
import { useEffect, useState } from "react";
import CustomerPage from "../../pages/CustomerPage.tsx";
import PlaceOrderPage from "../../pages/PlaceOrderPage.tsx";
import OrderDetailPage from "../../pages/OrderDetailPage.tsx";

const drawerWidth = 230;

export default function HoverableSidebar() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, []);

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clear tokens, session, etc.)
        console.log("User logged out");

        // Navigate to the root and then to the login page
        navigate("/");
        setTimeout(() => {
            navigate("/login");
        }, 0);
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundImage: 'url(/b3.jpg)', // Set your background image path
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
                        color: 'white', // Change text color to white
                        backgroundColor: '#578FCA', // Blue color for the sidebar
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
                            color: '#fff', // Change to white
                            fontFamily: 'Fira Code, monospace',
                            fontSize: '26px',
                            fontWeight: 'bold',
                            marginBottom: '30px', // Increased gap between name and sidebar components
                        }}
                    >
                        Blissful Elegance
                    </Typography>

                    <List>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon />, to: '/' },
                            { text: 'Flowers', icon: <LocalFloristIcon />, to: '/flower' },
                            { text: 'Customers', icon: <GroupIcon />, to: '/customer' },
                            { text: 'Place Order', icon: <ShoppingCartIcon />, to: '/placeOrder' },
                            { text: 'Order Details', icon: <ReceiptLongIcon />, to: '/orderDetails' },
                            { text: 'Log Out', icon: <ExitToAppIcon />, to: '/login' },
                        ].map((item) => (
                            <Tooltip title={item.text} placement="right" key={item.text}>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        marginBottom: '5px',
                                        border: '2px solid #0d47a1', // Darker blue for border
                                    }}
                                >
                                    <ListItemButton
                                        component={Link}
                                        to={item.to}
                                        onClick={item.text === 'Log Out' ? handleLogout : undefined}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(25, 118, 210, 0.8)', // Lighter blue on hover
                                                transition: '0.3s',
                                                '& .MuiListItemText-primary': {
                                                    color: '#fff', // Change text color on hover
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: '#fff', // Change icon color on hover
                                                },
                                            },
                                            ...(location.pathname === item.to && {
                                                backgroundColor: 'rgba(25, 118, 210, 0.8)',
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
                                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                sx: {
                                                    color: '#fff', // Change text color to white
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

            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#e3f2fd', borderRadius: '16px', marginLeft: '20px' }}>

                <Box
                    sx={{ padding: '16px', backgroundColor: '#578FCA', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                        {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', textAlign: 'right' }}
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
                                default:
                                    return '';
                            }
                        })()}
                    </Typography>
                </Box>

                <Box sx={{ padding: '16px', backgroundColor: '#578FCA', borderRadius: '8px', height: '87%' }}>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/flower" element={<FlowerPage />} />
                        <Route path="/customer" element={<CustomerPage />} />
                        <Route path="/placeOrder" element={<PlaceOrderPage />} />
                        <Route path="/orderDetails" element={<OrderDetailPage />} />
                    </Routes>
                </Box>

            </Box>
        </Box>
    );
}
