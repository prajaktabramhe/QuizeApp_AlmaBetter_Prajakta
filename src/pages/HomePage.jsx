import { Grid, Card, CardActionArea, CardMedia, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import myQuiz from "../assets/Frame2.jpg";
import createQuiz from "../assets/Frame3.jpg";
import playQuiz from "../assets/frame4.jpg";


const HomePage = () => {
  const frames = [
    { src: myQuiz, alt: "Frame 1", link: "/my-quiz" },
    { src: createQuiz, alt: "Frame 2", link: "/create-quiz"},
    { src: playQuiz, alt: "Frame 3", link: "/play-quiz"},
  ];

  return (
    <Box
  sx={{
    bgcolor: "#c7d6beff",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",   
    justifyContent: "center",
    py: 5,
  }}
>
  <Container maxWidth="lg">
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      {frames.map((frame, index) => (
        <Grid
          key={index}
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              maxWidth: 300,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              },
              position: "relative",
            }}
          >
            <CardActionArea component={Link} to={frame.link}>
              <CardMedia
                component="img"
                image={frame.src}
                alt={frame.alt}
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 250, md: 280 },
                  objectFit: "cover",
                }}
              />

              {/* Overlay text */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: { xs: 200, sm: 250, md: 280 },
                  bgcolor: "rgba(0,0,0,0.4)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  textAlign: "center",
                  padding: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {frame.title}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

  );
};

export default HomePage;
