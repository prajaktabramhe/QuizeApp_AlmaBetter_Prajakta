import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#000",    // Black background
        color: "#fff",      // White text
        py: 1.5,            // Vertical padding
        textAlign: "center",
        position: "fixed",  // Make it fixed
        bottom: 0,          // Stick to bottom
        left: 0,
        width: "100%",      // Full width
        zIndex: 1200,       // Above content
      }}
    >
      <Typography variant="body2">
        &copy; 2025 AlmaBetter. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
