package com.jdsolutions.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;

    // This ensures Java looks for 'full_name' in your MySQL table
    @Column(name = "full_name")
    private String fullName;
}