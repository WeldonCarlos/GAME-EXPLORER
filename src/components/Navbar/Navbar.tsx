import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Favorites", path: "/favorites" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          sx={{
            flexGrow: 1,
            fontSize: {
              xs: "1rem",   // mobile
              sm: "1.2rem", // tablet
              md: "1.5rem", // desktop
            },
            fontWeight: 600,
          }}
        >
          Game Explorer
        </Typography>

        {/* DESKTOP MENU */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              to={item.path}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* MOBILE MENU BUTTON */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* DRAWER MOBILE */}
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

      </Toolbar>
    </AppBar>
  );
}