package com.piagent.service;

import com.piagent.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service for managing users in an in-memory store
 * Thread-safe implementation using ConcurrentHashMap
 */
@Service
public class UserService {
    
    // Shared in-memory users list accessible by all endpoints
    private final Map<Long, User> users = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    /**
     * Add a new user to the in-memory list
     * @param user the user to add (ID will be generated if null)
     * @return the created user with ID assigned
     */
    public User create(User user) {
        if (user.getId() == null) {
            user.setId(idGenerator.getAndIncrement());
        }
        users.put(user.getId(), user);
        return user;
    }

    /**
     * Delete a user by ID
     * @param id the user ID to delete
     * @return true if the user existed and was removed, false if not found
     */
    public boolean delete(Long id) {
        if (id == null) {
            return false;
        }
        User removed = users.remove(id);
        return removed != null;
    }

    /**
     * Find a user by ID
     * @param id the user ID
     * @return Optional containing the user if found, empty otherwise
     */
    public Optional<User> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(users.get(id));
    }

    /**
     * Get all users
     * @return all users in the in-memory list
     */
    public Iterable<User> findAll() {
        return users.values();
    }

    /**
     * Clear all users (useful for testing)
     */
    public void clear() {
        users.clear();
        idGenerator.set(1);
    }
}
