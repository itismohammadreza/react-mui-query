import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WithChildren } from "@models/common";
import { useLocales } from "@hooks/useLocales";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@hooks/useUser";
import { AccountCircle } from "@mui/icons-material";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useApp } from "@hooks/useApp";

interface NavbarProps extends WithChildren {
  window?: () => Window;
}

const drawerWidth = 240;

export const Navbar = (props: NavbarProps) => {
  const {t} = useLocales();
  const {paletteMode, setAppConfig} = useApp();
  const currentUser = useUser();
  const location = useLocation();
  const {window, children} = props;
  const [open, setOpen] = useState(false);
  const navItems = [
    {text: t('home'), href: '/', icon: <MenuIcon/>},
    {text: t('login'), href: '/auth/login', icon: <MenuIcon/>},
    {text: t('protected'), href: '/protected', icon: <MenuIcon/>},
  ];

  const handleDrawerToggle = () => {
    setOpen(prev => !prev);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
      <div>
        <Toolbar/>
        <List>
          {
            navItems.map(item => (
                <ListItem selected={item.href === location.pathname} key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>
                  </ListItemButton>
                </ListItem>
            ))
          }
        </List>
      </div>
  );

  return (
      <Box sx={{display: "flex"}}>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{mr: 2, display: {md: "none"}}}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
              {t("appTitle")}
            </Typography>
            {
                paletteMode === 'dark' &&
                <IconButton onClick={() => setAppConfig({paletteMode: 'light'})} size="large" color="inherit">
                  <LightModeIcon/>
                </IconButton>
            }
            {
                paletteMode === 'light' &&
                <IconButton onClick={() => setAppConfig({paletteMode: 'dark'})} size="large" color="inherit">
                  <ModeNightIcon/>
                </IconButton>
            }
            {
                currentUser &&
                <IconButton size="large" color="inherit">
                  <AccountCircle/>
                </IconButton>
            }
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}} aria-label="mailbox folders">
          <Drawer
              container={container}
              variant="temporary"
              open={open}
              onClose={handleDrawerToggle}
              ModalProps={{keepMounted: true}}
              sx={{
                display: {xs: "block", sm: "block", md: "none"},
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth
                }
              }}>
            {drawer}
          </Drawer>
          <Drawer
              variant="permanent"
              sx={{
                display: {xs: "none", sm: "none", md: "block"},
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth
                }
              }}
              open>
            {drawer}
          </Drawer>
        </Box>
        <Box component="main"
             sx={{
               flexGrow: 1,
               p: 3,
               width: {md: `calc(100% - ${drawerWidth}px)`}
             }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
  );
}
