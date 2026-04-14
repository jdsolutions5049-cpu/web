package com.jdsolutions.backend.config;

import com.jdsolutions.backend.model.Admin;
import com.jdsolutions.backend.repository.AdminRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdmin(
        AdminRepository adminRepository,
        @Value("${admin.username}") String adminUsername,
        @Value("${admin.password}") String adminPassword,
        @Value("${admin.full-name}") String adminFullName
    ) {
        return args -> {
            if (adminUsername == null || adminUsername.isBlank() || adminPassword == null || adminPassword.isBlank()) {
                return;
            }

            Optional<Admin> existingAdmin = adminRepository.findByUsername(adminUsername);
            if (existingAdmin.isPresent()) {
                return;
            }

            Admin admin = new Admin();
            admin.setUsername(adminUsername);
            admin.setPassword(adminPassword);
            admin.setFullName(adminFullName);
            adminRepository.save(admin);
        };
    }
}
