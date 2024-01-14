
import mongoose, {Schema} from "mongoose";

const quizSchema = new Schema(
    {
    user: { type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    
  questionNumber: {
     type: Number, 
     required: true },
  selectedAnswer: { 
    type: String, 
    required: true },
  responseTime: { 
    type: Number, 
    required: true },
});

export const Quiz = mongoose.model("Quiz", quizSchema);
 
