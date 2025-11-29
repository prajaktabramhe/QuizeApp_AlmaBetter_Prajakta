import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const fullName = useSelector((state) => state.user.fullName);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000", // Black navbar
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* 🔥 LEFT SIDE LOGO */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
          <img
             src={logo}  // 👉 Update your actual logo path
            alt="logo"
            style={{ height: "40px", width: "auto" }}
          />
          </Link>
        </Box>

        {/* 🔥 RIGHT SIDE NAV LINKS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            component={NavLink}
            to="/"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/my-quiz"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            My Quiz
          </Button>

          <Button
            component={NavLink}
            to="/play-quiz"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            Play Quiz
          </Button>

          {/* Username if exists */}
          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            {fullName || ""}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
