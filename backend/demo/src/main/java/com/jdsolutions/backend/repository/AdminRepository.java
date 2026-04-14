package com.jdsolutions.backend.repository;

import com.jdsolutions.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // We now only find by Username. BCrypt handles the password matching.
    Optional<Admin> findByUsername(String username);
}