import React, { useEffect, useState } from "react";
import API from "../api/api";
import Cookies from "js-cookie";

const FeedbackAnalysis = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const therapistEmail = Cookies.get("email");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        console.log("Fetching appointments for therapist:", therapistEmail);

        // Fetch accepted appointments for the therapist
        const response = await API.get(
          `/appointments/accepted?therapistEmail=${therapistEmail}`
        );
        console.log("Raw appointments data:", response.data);

        const appointments = response.data.filter(
          (appointment) => appointment.status === "Accepted"
        );
        console.log("Filtered accepted appointments:", appointments);

        // Fetch feedback for each appointment
        const feedbackPromises = appointments.map((appointment) =>
          API.get(
            `/user/feedback/therapist?therapistEmail=${appointment.email}`
          )
        );

        const feedbackResponses = await Promise.all(feedbackPromises);
        console.log("Feedback responses:", feedbackResponses);

        const feedbackData = feedbackResponses.map((res, index) => {
          const scores = res.data.scores
            ? Object.values(res.data.scores) // Ensure scores exist and convert to array
            : [];
          return {
            name: appointments[index].name,
            email: appointments[index].email,
            scores: scores,
          };
        });
        console.log("Mapped feedback data:", feedbackData);

        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [therapistEmail]);

  const getColor = (score) => {
    if (score >= 75) return "border-green-500 text-green-500";
    if (score >= 50) return "border-yellow-500 text-yellow-500";
    return "border-red-500 text-red-500";
  };

  return (
    <div className="w-[90%] h-[600px] bg-white m-auto drop-shadow-md">
      <h2 className="m-10 text-4xl font-semibold text-left text-gray-400">
        Feedback Overview
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {feedbacks.map((feedback, index) => {
          const avgScore =
            feedback.scores.length > 0
              ? feedback.scores.reduce((sum, score) => sum + score, 0) /
                feedback.scores.length
              : 0;

          const color = getColor(avgScore);

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-40"
            >
              <div
                className={`w-24 h-24 border-8 rounded-full flex items-center justify-center ${color}`}
              >
                <span className="text-xl font-bold">
                  {Math.round(avgScore)}%
                </span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  {feedback.name}
                </h3>
                <p className="text-sm text-gray-500">{feedback.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackAnalysis;
