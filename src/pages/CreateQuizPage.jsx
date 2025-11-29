import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

const CreateQuizPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [correctOptionsMulti, setCorrectOptionsMulti] = useState([]);

  const handleAddOption = () => {
    if (!currentOption.trim()) return;
    setOptions([...options, currentOption]);
    setCurrentOption("");
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSaveQuestion = () => {
    if (!title || !question) {
      alert("Title and question are required");
      return;
    }

    let questionData = {
      id: Date.now(),
      title,
      question,
      type: selectedQuestionType,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    if (selectedQuestionType === "singleMCQ") {
      if (options.length < 2) return alert("Min 2 options");
      if (!correctOption) return alert("Select correct option");
      questionData.options = options;
      questionData.correctOption = correctOption;
    }

    if (selectedQuestionType === "multiMCQ") {
      if (options.length < 2) return alert("Min 2 options");
      if (!correctOptionsMulti.length)
        return alert("Select at least one correct option");
      questionData.options = options;
      questionData.correctOptions = correctOptionsMulti;
    }

    if (selectedQuestionType === "shortAnswer" || selectedQuestionType === "description") {
      if (!correctOption) return alert("Answer required");
      questionData.correctOption = correctOption;
    }

    const existing = JSON.parse(localStorage.getItem("questions")) || [];
    localStorage.setItem("questions", JSON.stringify([...existing, questionData]));

    alert("Question saved!");

    setTitle("");
    setQuestion("");
    setOptions([]);
    setCorrectOption("");
    setCorrectOptionsMulti([]);
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {/* Modal */}
      <Dialog open={openModal} PaperProps={{
        sx: {
          width: 420,
          borderRadius: 3,
          p: 1,
        },
      }}>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          Select Question Type
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth>
            <RadioGroup
              value={selectedQuestionType}
              onChange={(e) => setSelectedQuestionType(e.target.value)}
              sx={{ gap: 1.5, mt: 1 }}
            >
              <FormControlLabel value="singleMCQ" control={<Radio />} label="MCQ (Single Correct)" />
              <FormControlLabel value="multiMCQ" control={<Radio />} label="MCQ (Multi Correct)" />
              <FormControlLabel value="shortAnswer" control={<Radio />} label="Short Answer" />
              <FormControlLabel value="description" control={<Radio />} label="Description" />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            disabled={!selectedQuestionType}
            sx={{
              width: 150,
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={() => {
              setOpenModal(false);
              setShowForm(true);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* FORM */}
      {showForm && (
        <Card sx={{ width: "100%", maxWidth: 700, p: 2, boxShadow: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600}>{{
              singleMCQ: "MCQ (Single Correct)",
              multiMCQ: "MCQ (Multi Correct)",
              shortAnswer: "Short Answer",
              description: "Description",
            }[selectedQuestionType]}</Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                label="Question"
                fullWidth
                value={question}
                multiline={selectedQuestionType !== "singleMCQ"}
                rows={selectedQuestionType === "description" ? 3 : 1}
                onChange={(e) => setQuestion(e.target.value)}
              />

              {/* Single & Multi MCQ UI */}
              {(selectedQuestionType === "singleMCQ" ||
                selectedQuestionType === "multiMCQ") && (
                <>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Add Option"
                      fullWidth
                      value={currentOption}
                      onChange={(e) => setCurrentOption(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddOption}>
                      Add
                    </Button>
                  </Stack>

                  {options.map((opt, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <TextField fullWidth disabled value={opt} />

                      {selectedQuestionType === "multiMCQ" ? (
                        <Radio
                          checked={correctOptionsMulti.includes(opt)}
                          onChange={() => {
                            if (correctOptionsMulti.includes(opt)) {
                              setCorrectOptionsMulti(
                                correctOptionsMulti.filter((o) => o !== opt)
                              );
                            } else {
                              setCorrectOptionsMulti([...correctOptionsMulti, opt]);
                            }
                          }}
                        />
                      ) : null}

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteOption(index)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  ))}

                  {/* Single Correct Dropdown */}
                  {selectedQuestionType === "singleMCQ" && (
                    <Select
                      value={correctOption}
                      onChange={(e) => setCorrectOption(e.target.value)}
                      fullWidth
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Select Correct Option</MenuItem>
                      {options.map((opt, i) => (
                        <MenuItem key={i} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  )}
                </>
              )}

              {/* Short Answer */}
              {selectedQuestionType === "shortAnswer" && (
                <TextField
                  label="Answer (2 words)"
                  fullWidth
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value)}
                />
              )}

              {/* Description */}
              {selectedQuestionType === "description" && (
                <TextField
                  label="Answer (2-4 sentences)"
                  fullWidth
                  multiline
                  rows={4}
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value)}
                />
              )}

              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.4, mt: 2, borderRadius: 2, textTransform: "none" }}
                onClick={handleSaveQuestion}
              >
                Save Question
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CreateQuizPage;
