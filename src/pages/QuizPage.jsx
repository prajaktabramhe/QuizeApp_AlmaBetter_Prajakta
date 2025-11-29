import { useState, useEffect } from "react";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const allQuestions = JSON.parse(localStorage.getItem("question")) || [];
    const activeQuestions = allQuestions.filter(q => q.status === "Active");
    setQuestions(activeQuestions);
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNext = () => {
    setAnswers({ ...answers, [currentIndex]: selectedOption });
    setSelectedOption("");
    setCurrentIndex(prev => prev + 1);
  };

  const handleSubmit = () => {
    setAnswers({ ...answers, [currentIndex]: selectedOption });
    localStorage.setItem("quizAnswers", JSON.stringify({ ...answers, [currentIndex]: selectedOption }));
    navigate("/result");
  };

  if (questions.length === 0) return <Typography variant="h6">No active questions found.</Typography>;

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">{currentQuestion.title}</Typography>
        <Typography sx={{ mt: 2 }}>{currentQuestion.question}</Typography>

        <RadioGroup value={selectedOption} onChange={handleOptionChange} sx={{ mt: 2 }}>
          {currentQuestion.options.map((opt, idx) => (
            <FormControlLabel
              key={idx}
              value={(idx + 1).toString()}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>
            Question {currentIndex + 1} of {questions.length}
          </Typography>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedOption}
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit Quiz
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizPage;
