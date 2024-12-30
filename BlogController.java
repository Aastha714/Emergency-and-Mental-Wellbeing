package com.example.backend.controller;

import com.example.backend.model.Blog;
import com.example.backend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Endpoint to create a new blog
    @PostMapping
    public ResponseEntity<String> createBlog(@RequestBody Blog blog) {
        try {
            // Set the default likes to 0 before saving the blog
            blog.setLikes(0);
            Blog createdBlog = blogService.createBlog(blog); // Call service to create the blog
            return ResponseEntity.ok("Blog created successfully with ID: " + createdBlog.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating blog: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    // Delete a blog by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok("Blog deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting blog: " + e.getMessage());
        }
    }
    @PutMapping("/{id}/like")
    public ResponseEntity<?> likeBlog(@PathVariable String id, @RequestParam String userEmail) {
        Optional<Blog> optionalBlog = blogService.getBlogById(id);
        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();
            if (!blog.getLikedBy().contains(userEmail)) {
                blog.setLikes(blog.getLikes() + 1);
                blog.getLikedBy().add(userEmail);
                blogService.updateBlog(blog);
                return ResponseEntity.ok("Blog liked successfully. Total likes: " + blog.getLikes());
            } else {
                return ResponseEntity.status(400).body("User has already liked this blog.");
            }
        } else {
            return ResponseEntity.status(404).body("Blog not found.");
        }
    }
    @GetMapping("/{id}")
    public Optional<Blog> getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id);
    }

}
