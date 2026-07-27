package com.piagent.controller;

import com.piagent.dto.UserDTO;
import com.piagent.model.User;
import com.piagent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for User management
 * Provides CRUD operations for users stored in-memory
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Create a new user
     * @param userDTO the user data
     * @return the created user with HTTP 201
     */
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        
        User createdUser = userService.create(user);
        
        UserDTO responseDTO = new UserDTO(
            createdUser.getId(),
            createdUser.getName(),
            createdUser.getEmail()
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    /**
     * Delete a user by ID
     * @param id the user ID to delete
     * @return HTTP 204 No Content if successful, HTTP 404 Not Found if user doesn't exist
     */
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        try {
            boolean deleted = userService.delete(id);
            
            if (deleted) {
                // HTTP 204 No Content - successful deletion with empty body
                return ResponseEntity.noContent().build();
            } else {
                // HTTP 404 Not Found - user ID not found
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                errorResponse.put("message", "User with ID " + id + " does not exist");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorResponse);
            }
        } catch (NumberFormatException e) {
            // Handle invalid ID format gracefully
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid ID format");
            errorResponse.put("message", "The provided ID is not valid");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(errorResponse);
        } catch (Exception e) {
            // Handle any other errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal server error");
            errorResponse.put("message", "An error occurred while processing the request");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(errorResponse);
        }
    }

    /**
     * Get a user by ID
     * @param id the user ID
     * @return the user if found, HTTP 404 if not found
     */
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long id) {
        return userService.findById(id)
            .map(user -> {
                UserDTO dto = new UserDTO(user.getId(), user.getName(), user.getEmail());
                return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(dto);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Get all users
     * @return all users in the system
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userService.findAll());
    }
}
