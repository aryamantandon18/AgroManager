// src/components/FarmAI/FarmAIChat.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { getAIResponse } from "../../services/aiService";
import { promptTemplates } from "../../constants/aiPrompts";

export default function FarmAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Format prompt based on content
      let prompt;
      if (input.toLowerCase().includes("fertilizer")) {
        const crop = input.split("for")[1]?.trim() || "crops";
        prompt = promptTemplates.fertilizer(crop);
      } else if (
        input.toLowerCase().includes("crop") ||
        input.toLowerCase().includes("plant")
      ) {
        prompt = promptTemplates.cropPlanning({
          location: "the specified region",
          soilType: "the mentioned soil type",
          season: "the current season",
        });
      } else {
        prompt = promptTemplates.general(input);
      }

      const response = await getAIResponse(prompt);

      const aiMessage = {
        text: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "ai",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "What crops are suitable for sandy soil in summer?",
    "Recommend fertilizers for rice cultivation",
    "How to prevent tomato leaf diseases?",
    "Best practices for organic farming",
  ];

  return (
    <Box sx={{ height: "600px", display: "flex", flexDirection: "column" }}>
      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "grey.50",
          borderRadius: 1,
          mb: 2,
        }}
      >
        {/* Example prompts */}
        {messages.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              Try asking about:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {examplePrompts.map((prompt, index) => (
                <Chip
                  key={index}
                  label={prompt}
                  onClick={() => setInput(prompt)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: "80%",
                bgcolor: message.sender === "user" ? "primary.main" : "white",
                color: message.sender === "user" ? "white" : "text.primary",
                borderRadius: 2,
                ...(message.isError && {
                  bgcolor: "error.light",
                  color: "error.contrastText",
                }),
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask anything about farming..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
