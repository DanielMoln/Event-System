import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  {
    label: "Események lista",
    link: "/",
  },
  {
    label: "Eseménynaptár",
    link: "/event/calendar",
  },
  {
    label: "Térkép",
    link: "/event/map",
  },
];

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h3" sx={{ my: 2 }}>
        Események
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={item + "#" + i} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link to={item.link} sx={{ textDecoration: "none" }}>
                <Typography variant="h5">{item.label}</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" sx={{ color: "#fff" }}>
              Események
            </Link>
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                direction: "row",
                justifyContent: "space-evenly",
                gap: 10,
              },
            }}
          >
            {navItems.map((item, i) => (
              <Link
                key={item + i}
                to={item.link}
                sx={{
                  padding: "5px",
                  color: "#fff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                <Typography variant="h4" sx={{ color: "#fff" }}>
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
