import { useState } from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const QuizCard = ({ questionData, onNext }) => {
  const [selected, setSelected] = useState("");

  // Safely get options array, default to empty array
  const options = questionData?.options || [];

  const handleNext = () => {
    onNext(selected);
    setSelected(""); // reset selection for next question
  };

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {questionData?.title || "Untitled Question"}
      </Typography>
      <Typography sx={{ mb: 2 }}>{questionData?.question}</Typography>

      <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
        {options.length > 0 ? (
          options.map((opt, index) => (
            <FormControlLabel key={index} value={opt} control={<Radio />} label={opt} />
          ))
        ) : (
          <Typography color="error">No options available</Typography>
        )}
      </RadioGroup>

      <Button
        variant="contained"
        color="primary"
        disabled={!selected}
        onClick={handleNext}
        sx={{ mt: 2 }}
      >
        Next Question
      </Button>
    </Box>
  );
};

export default QuizCard;
