import {
  Modal,
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

export default function CongratulationsModal({ score, total, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 380,
            p: 4,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            🎉 Congratulations! 🎉
          </Typography>

          <Typography variant="h6" mb={4}>
            You scored{" "}
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
            </Typography>
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1.2, fontSize: 16, borderRadius: 2 }}
            onClick={onClose}
          >
            Continue
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}
