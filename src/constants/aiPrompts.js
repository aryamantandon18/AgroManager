// src/constants/aiPrompts.js
export const promptTemplates = {
  cropPlanning: (details) => `
    As a farming expert, please provide detailed advice for crop planning with the following details:
    - Location/Region: ${details.location}
    - Soil Type: ${details.soilType}
    - Season: ${details.season}
    Please include:
    1. Recommended crops
    2. Planting schedule
    3. Basic care instructions
  `,

  fertilizer: (crop) => `
    As a farming expert, please provide fertilizer recommendations for ${crop} including:
    1. Types of fertilizers
    2. Application schedule
    3. Dosage guidelines
    4. Organic alternatives
  `,

  general: (question) => `
    As a farming expert, please provide detailed advice about: ${question}
    Include practical tips and best practices.
  `,
};
