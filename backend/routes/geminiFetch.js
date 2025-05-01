//import express
const express = require("express");

//get router from express
const router = express.Router();

/// google genai to use
const { GoogleGenAI } = require("@google/genai");

///route get suggestions based on email fetched using gmail
router.get("/gemini", async (req, res) => {
  const getMails = await fetch("https://intelli-do.vercel.app/auth/emails", {
    method: "GET",
    headers: { token: req.headers.token },
  });

  const finalData = await getMails.json();

  console.log("this is email:", finalData);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GeminiApi });
   
    //   model: "gemini-2.0-flash",
    //   contents: finalData[7].i,
    //   config: {
    //     responseMimeType: "application/json",
    //     responseSchema: {
    //       type: "array",
    //       items: {
    //         type: "object",
    //         properties: {
    //           TaskName: { type: "string" },
    //           Description: { type: "string" },
    //           Priority: { type: "string" },
    //           Subtasks: { type: "string" },
    //           Category: {
    //             type: "string",
    //             enum: ["Personal", "Health", "Work", "Learning"],
    //           },
    //         },
    //         required: [
    //           "TaskName",
    //           "Description",
    //           "Priority",
    //           "Subtasks",
    //           "Category",
    //         ],
    //       },
    //     },
    //   },
    // });
    let suggestedTasks = [];

    for (const currentMail of finalData) {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: currentMail.i,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                TaskName: { type: "string" },
                Description: { type: "string" },
                Priority: {
                  type: "string",
                  enum: ["High", "Medium", "Low"],
                },
                Subtasks: { type: "string" },
                Category: {
                  type: "string",
                  enum: ["Personal", "Health", "Work", "Learning"],
                },
              },
              required: [
                "TaskName",
                "Description",
                "Priority",
                "Subtasks",
                "Category",
              ],
            },
          },
        },
      });

      //   console.log(JSON.parse(response.candidates[0].content.parts[0].text));

      const parsedTaks = await JSON.parse(
        response.candidates[0].content.parts[0].text
      );

      console.log("this is single suggestion:", parsedTaks);

      suggestedTasks.push(...parsedTaks);

      console.log("this is suggestion:", suggestedTasks);
    }

    console.log(suggestedTasks);
    res.json(suggestedTasks);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
