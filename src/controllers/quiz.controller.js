import Quiz from "../models/quiz.model";
import { User } from "../models/user.models"

export const submitResponse = async (req, res) => {
  try {
    const { userId, questionNumber, selectedAnswer, responseTime } = req.body;

    // Check if the user has already answered this question
    const existingResponse = await Quiz.findOne({ user: userId, questionNumber });

    if (existingResponse) {
      return res.status(400).json({ error: "User has already answered this question." });
    }

    // Save the response to the database
    const quizResponse = new Quiz({ user: userId, questionNumber, selectedAnswer, responseTime });
    await quizResponse.save();

    res.status(201).json({ message: "Response submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const generateReport = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user responses from the database
    const userResponses = await Quiz.find({ user: userId });

    // Calculate average solving time for each question
    const averageTimes = Array.from({ length: 10 }, (_, questionNumber) => {
      const questionResponses = userResponses.filter((response) => response.questionNumber === questionNumber + 1);
      const totalResponseTime = questionResponses.reduce((acc, response) => acc + response.responseTime, 0);
      const averageTime = totalResponseTime / questionResponses.length;
      return { questionNumber: questionNumber + 1, averageTime };
    });

    res.status(200).json({ userId, averageTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};