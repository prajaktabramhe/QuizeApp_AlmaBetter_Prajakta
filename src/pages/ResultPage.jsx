import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import CongratulationsModal from "./CongratulationsModal";

export default function ResultPage() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        pt: 5,
        px: 2,
      }}
    >
      {/* Modal */}
      <CongratulationsModal
        score={score}
        total={total}
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* Result Card */}
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 650,
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Quiz Results
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={4}>
          You answered{" "}
          <Typography
            component="span"
            fontWeight="bold"
            color="primary"
            sx={{ fontSize: "1.4rem" }}
          >
            {score}
          </Typography>{" "}
          out of{" "}
          <Typography
            component="span"
            fontWeight="bold"
            color="primary"
            sx={{ fontSize: "1.4rem" }}
          >
            {total}
          </Typography>{" "}
          questions correctly 🎉
        </Typography>
      </Paper>
    </Box>
  );
}
