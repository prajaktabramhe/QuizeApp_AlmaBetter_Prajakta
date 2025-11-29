import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const MyQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // LOAD "questions"
  useEffect(() => {
    const allQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(allQuestions);
  }, []);

  const handleStatusChange = (id, status) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, status } : q
    );
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
  };

  const handleEdit = (question) => {
    setSelectedQuestion({ ...question });
    setEditModalOpen(true);
  };

  const saveEdit = () => {
    const updated = questions.map((q) =>
      q.id === selectedQuestion.id ? selectedQuestion : q
    );
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
    setEditModalOpen(false);
  };

  const handleDelete = (question) => {
    setSelectedQuestion(question);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updated = questions.filter((q) => q.id !== selectedQuestion.id);
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
    setDeleteModalOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Quiz Questions
      </Typography>

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#56684cff" }}>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Created
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {questions.map((q) => (
              <TableRow
                key={q.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell
                  onClick={() => handleEdit(q)}
                  sx={{
                    fontWeight: 500,
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  {q.title}
                </TableCell>

                <TableCell sx={{ textTransform: "capitalize" }}>
                  {q.type === "singleMCQ" && "MCQ (Single)"}
                  {q.type === "multiMCQ" && "MCQ (Multiple)"}
                  {q.type === "shortAnswer" && "Short Answer"}
                  {q.type === "description" && "Description"}
                </TableCell>

                <TableCell>
                  <RadioGroup
                    row
                    value={q.status}
                    onChange={(e) =>
                      handleStatusChange(q.id, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="Active"
                      control={<Radio size="small" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="Inactive"
                      control={<Radio size="small" />}
                      label="Inactive"
                    />
                  </RadioGroup>
                </TableCell>

                <TableCell>{q.createdAt?.slice(0, 10)}</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(q)}
                    sx={{ mr: 1 }}
                  >
                    ✏️Edit
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(q)}
                  >
                   ✘ Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* EDIT MODAL */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            width: 420,
            background: "#fff",
            p: 4,
            borderRadius: 3,
            mx: "auto",
            mt: "10vh",
            boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Question
          </Typography>

          <TextField
            fullWidth
            label="Title"
            value={selectedQuestion?.title || ""}
            onChange={(e) =>
              setSelectedQuestion({
                ...selectedQuestion,
                title: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Question"
            value={selectedQuestion?.question || ""}
            onChange={(e) =>
              setSelectedQuestion({
                ...selectedQuestion,
                question: e.target.value,
              })
            }
            sx={{ mt: 2 }}
          />

          <Button
            onClick={saveEdit}
            sx={{ mt: 3 }}
            variant="contained"
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* DELETE MODAL */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            margin: "15vh auto",
            width: 400,
            borderRadius: 3,
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Delete Question?
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to delete this question?
          </Typography>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Yes, Delete
          </Button>

          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default MyQuizPage;
