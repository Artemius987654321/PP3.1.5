package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    User getUserById(long id);

    void updateUser(User user, long id);

    void removeUserById(long id);

    List<User> getAllUsers();

    User saveUser (User user);
    User findByUsername(String username);
}