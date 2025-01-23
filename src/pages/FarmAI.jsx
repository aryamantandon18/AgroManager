// src/pages/FarmAI.jsx
import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Card, CardContent } from "@mui/material";
import {
  Chat as ChatIcon,
  BugReport as DiseaseIcon,
} from "@mui/icons-material";

// We'll create these components
import FarmAIChat from "../components/FarmAI/FarmAIChat";
// import DiseaseDetection from "../components/FarmAI/DiseaseDetection";

export default function FarmAI() {
  const [activeTab, setActiveTab] = useState("chat");

  const tabs = [
    {
      value: "chat",
      label: "FarmAI Chat",
      icon: ChatIcon,
      description:
        "Get AI assistance for crop planning, fertilizers, and farming advice",
    },
    {
      value: "disease",
      label: "Disease Detection",
      icon: DiseaseIcon,
      description:
        "Upload plant images to detect diseases and get treatment suggestions",
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        FarmAI Assistant
      </Typography>

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={<tab.icon />}
                iconPosition="start"
              />
            ))}
          </Tabs>

          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              {tabs.find((tab) => tab.value === activeTab)?.description}
            </Typography>

            {activeTab === "chat" && <FarmAIChat />}
            {activeTab === "disease" && (
              // <DiseaseDetection />
              <Typography>Disease Detection Coming Soon</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
