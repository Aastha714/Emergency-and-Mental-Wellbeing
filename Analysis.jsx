import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Cookies from "js-cookie";

const Analysis = () => {
  const [weeklyPoints, setWeeklyPoints] = useState([0, 0, 0, 0, 0, 0, 0]); // Mon to Sun
  const [totalPoints, setTotalPoints] = useState(0);
  const [status, setStatus] = useState("Consult Therapist");
  const [statusColor, setStatusColor] = useState("red");
  const navigate = useNavigate();

  const getStatus = (avgPoints) => {
    if (avgPoints > 75) return "Good";
    if (avgPoints > 50) return "Needs Improvement";
    return "Consult Therapist";
  };

  const getColor = (status) => {
    if (status === "Good") return "green";
    if (status === "Needs Improvement") return "orange";
    return "red";
  };
  useEffect(() => {
    const fetchData = async () => {
      const email = Cookies.get("email");
      try {
        const response = await API.get(`/user/feedback/${email}`);
        console.log("Response Data:", response.data);

        if (response.status === 200) {
          const feedbackData = response.data;

          let points = [0, 0, 0, 0, 0, 0, 0]; // Monday to Sunday

          // Get current week range (Monday to Sunday)
          const today = new Date();
          const currentWeekStart = new Date(today);
          currentWeekStart.setDate(today.getDate() - today.getDay() + 1); // Start of the week (Monday)
          currentWeekStart.setHours(0, 0, 0, 0); // Start at midnight

          const currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of the week (Sunday)
          currentWeekEnd.setHours(23, 59, 59, 999); // End at the last second of Sunday

          const formatDate = (date) => date.toISOString().split("T")[0]; // Format as 'yyyy-mm-dd'

          const currentWeekStartFormatted = formatDate(currentWeekStart);
          const currentWeekEndFormatted = formatDate(currentWeekEnd);

          console.log(
            "Current Week Start (Formatted):",
            currentWeekStartFormatted
          );
          console.log("Current Week End (Formatted):", currentWeekEndFormatted);

          const scores = feedbackData.scores;

          Object.entries(scores).forEach(([date, score]) => {
            console.log(`Processing Date: ${date}, Score: ${score}`);

            if (
              date >= currentWeekStartFormatted &&
              date <= currentWeekEndFormatted
            ) {
              const feedbackDate = new Date(date);
              // Adjusting Sunday (getDay() === 0) to index 6 (last day of the week)
              const dayIndex =
                feedbackDate.getDay() === 0 ? 6 : feedbackDate.getDay() - 1;
              points[dayIndex] = score; // Assign score to the correct day index
            }
          });

          console.log("Updated Weekly Points:", points);

          setWeeklyPoints(points);

          const total = points.reduce((sum, point) => sum + point, 0);
          const avgPoints = total / 7;

          setTotalPoints(total);
          const currentStatus = getStatus(avgPoints);
          setStatus(currentStatus);
          setStatusColor(getColor(currentStatus));
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-5 w-full h-[450px] flex items-center justify-center mb-[100px]">
      <div className="w-[88%] h-[95%] bg-white  drop-shadow-md">
        <h2 className="m-10 text-4xl font-semibold text-left text-gray-400">
          8. Weekly Process
        </h2>
        <div className="flex w-full h-full bg-white">
          <div className="w-[70%] flex justify-around items-end p-5">
            {weeklyPoints.map((points, index) => (
              <div key={index}>
                <div
                  className="w-[60px] bg-[#DE3163] rounded-md"
                  style={{ height: `${points * 3}px` }}
                ></div>
                <p className="text-center text-[16px] text-gray-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </p>
              </div>
            ))}
          </div>

          <div className="w-[30%] flex flex-col items-center justify-center bg-purple-100 mb-[20px] mr-[15px] rounded-[20px] drop-shadow-md">
            <div
              className={`w-40 h-40 rounded-full border-8 flex items-center justify-center mb-[20px]`}
              style={{
                borderColor: statusColor,
              }}
            >
              <p className="text-2xl font-semibold">{totalPoints} pts</p>
            </div>
            <h2
              className={`text-5xl font-semibold text-${statusColor}-500 mb-4`}
            >
              {status}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analysis;
