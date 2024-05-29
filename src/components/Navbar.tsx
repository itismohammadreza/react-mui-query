import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WithChildren } from "@models/dataModel";
import Link from "next/link";
import { useLocales } from "@hooks/useLocales";

interface NavbarProps extends WithChildren {
  window?: () => Window;
}

export const Navbar = (props: NavbarProps) => {
  const {t} = useLocales();
  const {window, children} = props;
  const [open, setOpen] = useState(false);
  const appTitle = t("appTitle")
  const navItems = [
    {text: t('home'), href: '/'},
    {text: t('login'), href: '/auth/login'},
    {text: t('register'), href: '/auth/register'},
  ];

  const handleDrawerToggle = () => {
    setOpen(prev => !prev);
  };

  const appBarItems = (
      navItems.map(item => (
          <Button component={Link} href={item.href} key={item.text} sx={{color: '#fff'}}>
            {item.text}
          </Button>
      ))
  )
  const drawerItems = (
      <List>
        {
          navItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.href} sx={{textAlign: 'center'}}>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
          ))
        }
      </List>
  )
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box sx={{display: 'flex'}}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{mr: 2, display: {sm: 'none'}}}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
              {appTitle}
            </Typography>
            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              {appBarItems}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
            component="nav"
            container={container}
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{keepMounted: true}}
            sx={{display: {xs: 'block', sm: 'none'}, '& .MuiDrawer-paper': {width: 240}}}>
          <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>{appTitle}</Typography>
            <Divider/>
            {drawerItems}
          </Box>
        </Drawer>
        <Box component="main" sx={{p: 1}}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
  );
}
