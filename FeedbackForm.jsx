import React, { useState, useEffect } from "react";
import {
  BsEmojiGrin,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsEmojiFrown,
  BsEmojiAngry,
  BsEmojiGrinFill,
  BsEmojiLaughingFill,
  BsEmojiSmileFill,
  BsEmojiFrownFill,
  BsEmojiAngryFill,
} from "react-icons/bs";
import questionsData from "../assets/questions.json";
import Cookies from "js-cookie";
import API from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getRandomQuestions = (questions) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: "", color: "" });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [resources, setResources] = useState([]);
  const role = Cookies.get("role");

  useEffect(() => {
    setSelectedQuestions(getRandomQuestions(questionsData));

    const savedData = JSON.parse(localStorage.getItem("dailyResources")) || {};
    const today = new Date().toISOString().split("T")[0];

    if (savedData.date === today) {
      setResources(savedData.resources);
    } else {
      localStorage.removeItem("dailyResources");
    }
  }, []);

  const handleChange = (question, score) => {
    const updatedFormData = { ...formData, [question]: score };
    setFormData(updatedFormData);
    const updatedTotalScore = Object.values(updatedFormData).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalScore(updatedTotalScore);
  };

  const fetchResources = (mood) => {
    const resourceData = {
      angry: [
        {
          title: "The Essentials by Calm",
          url: "https://www.calm.com/blog/essentials",
        },
        {
          title: "Mind & Mood by Harvard Health",
          url: "https://www.health.harvard.edu/topics/mind-and-mood",
        },
        {
          title: "Managing Anger Effectively",
          url: "https://www.apa.org/topics/anger/control",
        },
        {
          title: "Anger and Mental Health",
          url: "https://www.nimh.nih.gov/health/topics/anger",
        },
        {
          title: "Tips for Anger Management",
          url: "https://www.mayoclinic.org/anger-management",
        },
      ],
      sad: [
        { title: "NAMI Blogs", url: "https://www.nami.org/blogs/" },
        {
          title: "31 Tips to Boost Your Mental Health",
          url: "https://mhanational.org/31-tips-boost-your-mental-health",
        },
        {
          title: "Coping with Sadness",
          url: "https://www.helpguide.org/articles/depression/dealing-with-depression.htm",
        },
        {
          title: "Understanding Depression",
          url: "https://www.verywellmind.com/understanding-depression-4157253",
        },
        {
          title: "Sadness and How to Manage It",
          url: "https://www.psychologytoday.com/us/blog/sadness-how-manage-it",
        },
      ],
      neutral: [
        { title: "Psych Central", url: "https://psychcentral.com/" },
        {
          title: "Mind & Mood by Harvard Health",
          url: "https://www.health.harvard.edu/topics/mind-and-mood",
        },
        {
          title: "Maintaining Emotional Balance",
          url: "https://www.mindful.org/emotional-balance/",
        },
        {
          title: "Neutral Mindset and Its Benefits",
          url: "https://www.psychologytoday.com/us/articles/neutral-mindset",
        },
        {
          title: "Everyday Mental Health Tips",
          url: "https://www.healthline.com/everyday-mental-health-tips",
        },
      ],
      excited: [
        {
          title: "The Essentials by Calm",
          url: "https://www.calm.com/blog/essentials",
        },
        {
          title: "31 Tips to Boost Your Mental Health",
          url: "https://mhanational.org/31-tips-boost-your-mental-health",
        },
        {
          title: "Channeling Excitement Positively",
          url: "https://www.psychologytoday.com/us/articles/channel-excitement",
        },
        {
          title: "Benefits of Being Excited",
          url: "https://www.verywellmind.com/benefits-excitement-5201234",
        },
        {
          title: "How to Embrace Positive Energy",
          url: "https://www.mindful.org/embracing-positive-energy/",
        },
      ],
      joyful: [
        { title: "NAMI Blogs", url: "https://www.nami.org/blogs/" },
        { title: "Psych Central", url: "https://psychcentral.com/" },
        {
          title: "Understanding Joy",
          url: "https://www.psychologytoday.com/us/articles/understanding-joy",
        },
        {
          title: "The Science of Happiness",
          url: "https://www.greatergood.berkeley.edu/science_happiness",
        },
        {
          title: "Joyful Living Tips",
          url: "https://www.verywellmind.com/joyful-living-5200347",
        },
      ],
    };

    const selectedResources = resourceData[mood] || [];
    setResources(selectedResources);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(
      "dailyResources",
      JSON.stringify({ date: today, resources: selectedResources })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "ADMIN") {
      setMessage({
        text: "Admins cannot submit feedback. Please log in as a user to proceed.",
        color: "text-red-600",
      });
      toast.info(
        "Admins cannot submit feedback. Please log in as a user to proceed.",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            fontSize: "14px",
          },
        }
      );
      return;
    }

    const email = Cookies.get("email");
    if (!email) {
      toast.info("You must be logged in to submit feedback.!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          fontSize: "14px",
        },
      });
      return;
    }

    const formattedDate = new Date().toISOString().split("T")[0];

    try {
      const feedback = { email, date: formattedDate, totalScore };

      let existingScores = {};
      try {
        const checkResponse = await API.get(`/user/feedback/${email}`);
        if (checkResponse.status === 200) {
          existingScores = checkResponse.data.scores || {};
        }
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          throw err;
        }
      }

      if (existingScores[formattedDate]) {
        setMessage({
          text: "Feedback for today already submitted. Please try again tomorrow.",
          color: "text-orange-500",
        });
        return;
      }

      const response = await API.post("/user/feedback", feedback);
      setFormData({});
      let mood = "neutral";
      if (totalScore <= 20) mood = "angry";
      else if (totalScore <= 40) mood = "sad";
      else if (totalScore <= 60) mood = "neutral";
      else if (totalScore <= 80) mood = "excited";
      else mood = "joyful";

      fetchResources(mood);
      toast.success("Assignment submitted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          fontSize: "14px",
        },
      });
    } catch (error) {
      toast.error("Error submitting the assignment. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#FF3131",
          color: "#fff",
          fontSize: "14px",
        },
      });
    }
  };

  const EmojiIcon = ({ score, question, isSelected }) => {
    const icons = {
      2: isSelected ? BsEmojiAngryFill : BsEmojiAngry,
      4: isSelected ? BsEmojiFrownFill : BsEmojiFrown,
      6: isSelected ? BsEmojiSmileFill : BsEmojiSmile,
      8: isSelected ? BsEmojiLaughingFill : BsEmojiLaughing,
      10: isSelected ? BsEmojiGrinFill : BsEmojiGrin,
    };

    const colorClasses = {
      2: "text-[#FF0000]",
      4: "text-[#FFA500]",
      6: "text-[#00BFFF]",
      8: "text-[#32CD32]",
      10: "text-[#FFD700]",
    };

    const Icon = icons[score];
    return (
      <label key={score} className="cursor-pointer text-4xl">
        <input
          type="radio"
          name={question}
          value={score}
          onChange={() => handleChange(question, score)}
          className="hidden"
        />
        <Icon
          size={40}
          className={`transition-all duration-500 ${
            isSelected ? "animate-bounce" : ""
          } ${isSelected ? colorClasses[score] : "text-gray-400"}`}
        />
      </label>
    );
  };

  return (
    <>
      <div className="container mx-auto p-6 w-full bg-white shadow-lg rounded-lg mt-11 mb-11">
        <h2 className="text-5xl text-[#001A35] font-bold drop-shadow text-center mb-[50px]">
          Daily Mood Assignment
        </h2>
        <form onSubmit={handleSubmit}>
          {selectedQuestions.map((question, index) => (
            <div key={index} className="mb-[50px] ml-[40px]">
              <label
                htmlFor={question}
                className="block text-gray-700 font-medium text-4xl mb-10"
              >
                {index + 1}. {question}
              </label>
              <div className="flex justify-evenly gap-11">
                {[2, 4, 6, 8, 10].map((score) => (
                  <EmojiIcon
                    key={score}
                    score={score}
                    question={question}
                    isSelected={formData[question] === score}
                  />
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full h-[50px] text-white font-medium py-2 px-4 text-xl rounded-md bg-[#1F1F1F] hover:bg-black transition"
          >
            Submit Feedback
          </button>
        </form>

        {message.text && (
          <div className={`mt-6 text-center text-lg ${message.color}`}>
            {message.text}
          </div>
        )}
      </div>
      {Cookies.get("email") && resources.length > 0 && (
        <div className="mt-10 ml-[120px]">
          <h3 className="text-5xl font-bold mb-10">Recommended Resources:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="relative bg-white w-[350px] h-[150px] m-auto flex flex-col justify-between rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 group mb-11"
              >
                <div className="w-[80%] h-[60px] mt-4 ml-[20px] text-left">
                  <h2 className="text-[18px] font-semibold">
                    {resource.title}
                  </h2>
                </div>
                <div className="w-[88%] ml-[20px] mb-6 flex items-center justify-between">
                  <button
                    className="h-[40px] w-[100px] rounded-full text-black text-[14px] font-semibold border-[#109948] border-2 hover:text-white hover:bg-[#008055]"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
