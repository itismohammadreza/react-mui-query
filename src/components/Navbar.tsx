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
import RemoveIcon from '@mui/icons-material/Remove';
import LToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import RToLIcon from '@mui/icons-material/FormatTextdirectionRToL';

interface NavbarProps extends WithChildren {
  window?: () => Window;
}

const drawerWidth = 240;

export const Navbar = (props: NavbarProps) => {
  const {t} = useLocales();
  const {paletteMode, rtl, setAppConfig} = useApp();
  const currentUser = useUser();
  const location = useLocation();
  const {window, children} = props;
  const [open, setOpen] = useState(false);
  const navItems = [
    {text: t('home'), href: '/', icon: <RemoveIcon/>},
    {text: t('login'), href: '/auth/login', icon: <RemoveIcon/>},
    {text: t('protected'), href: '/protected', icon: <RemoveIcon/>},
  ];

  const handleDirectionToggle = () => {
    setAppConfig({rtl: !rtl});
  }

  const handleThemeToggle = () => {
    setAppConfig({paletteMode: paletteMode == "light" ? "dark" : "light"});
  }

  const handleDrawerToggle = () => {
    setOpen(prev => !prev);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
      <>
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
      </>
  );

  return (
      <Box sx={{display: "flex"}}>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{mr: 2, display: {md: "none"}}}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap sx={{flexGrow: 1}}>
              {t("appTitle")}
            </Typography>
            <IconButton onClick={handleDirectionToggle} color="inherit">
              {rtl ? <LToRIcon/> : <RToLIcon/>}
            </IconButton>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {paletteMode === 'dark' ? <LightModeIcon/> : <ModeNightIcon/>}
            </IconButton>
            {
                currentUser &&
                <IconButton color="inherit">
                  <AccountCircle/>
                </IconButton>
            }
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}>
          <Drawer
              container={container}
              variant="temporary"
              open={open}
              onClose={handleDrawerToggle}
              ModalProps={{keepMounted: true}}
              sx={{
                display: {xs: "block", sm: "block", md: "none"},
                "& .MuiDrawer-paper": {
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
