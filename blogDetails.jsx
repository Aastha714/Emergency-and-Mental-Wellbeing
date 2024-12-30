import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const BlogDetails = () => {
  const { blogId } = useParams(); // Get blog ID from the route
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/user/blogs/${blogId}`)
      .then((response) => setBlog(response.data))
      .catch((error) => console.error("Error fetching blog details:", error));
  }, [blogId]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center pt-10 pb-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] ">
        <h1 className="text-5xl font-extrabold  text-black leading-tight mb-4">
          {blog.title}
        </h1>
        {blog.image && (
          <img
            src={blog.image}
            alt="Blog Visual"
            className="w-full h-[500px] md:h-[600px] object-cover rounded-lg mb-6 shadow-md"
          />
        )}
        <div
          className="text-gray-800 text-[20px] leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetails;
