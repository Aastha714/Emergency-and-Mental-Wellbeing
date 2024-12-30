package com.example.backend.service;

import com.example.backend.model.Blog;
import com.example.backend.repository.BlogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogsRepository blogsRepository;

    public Blog createBlog(Blog blog) {

        return blogsRepository.save(blog); // Save to MongoDB and return the saved object
    }


        public List<Blog> getAllBlogs() {
            return blogsRepository.findAll();
        }

        public void deleteBlog(String id) {
            blogsRepository.deleteById(id);
        }

    public Optional<Blog> getBlogById(String id) {
        return blogsRepository.findById(id);
    }
    public Blog updateBlog(Blog blog) {
        return blogsRepository.save(blog);
    }

    }


