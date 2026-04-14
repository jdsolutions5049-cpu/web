package com.jdsolutions.backend.controller;

import com.jdsolutions.backend.model.*;
import com.jdsolutions.backend.repository.*;
import com.jdsolutions.backend.service.EmailService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional; 

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://jdsolutions5049-cpu.github.io"
})
public class MainController {

    @Autowired
    private ContactRepository contactRepo;

    @Autowired
    private EnquiryRepository enquiryRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private EmailService emailService; 

    @Autowired
    private PasswordEncoder passwordEncoder; 

    // --- PUBLIC ROUTES (FOR USERS) ---

    @PostMapping("/contact")
    public String saveContact(@RequestBody Contact contact) {
        if (contact == null) return "Error: Data is null";
        contactRepo.save(contact);
        
        emailService.sendEmail(
            "jdsolutions504@gmail.com", 
            "New Website Message: " + contact.getName(),
            "Message: " + contact.getMessage() + "\nFrom: " + contact.getEmail()
        );
        
        return "Message received and email sent!";
    }

    @PostMapping("/enquiry")
    public String saveEnquiry(@RequestBody Enquiry enquiry) {
        if (enquiry == null) return "Error: Data is null";
        enquiryRepo.save(enquiry);
        
        emailService.sendEmail(
            "jdsolutions504@gmail.com", 
            "New Internship Application: " + enquiry.getDomain(),
            "Name: " + enquiry.getFullName() + "\nPhone: " + enquiry.getPhone() + "\nEmail: " + enquiry.getEmail()
        );
        
        return "Enquiry submitted! Check your email.";
    }

    // --- ADMIN ROUTES (FIXED LOGIN) ---

    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody Admin loginData) {
        // Find the admin and unwrap the Optional safely
        Optional<Admin> adminOptional = adminRepo.findByUsername(loginData.getUsername());
        Admin admin = adminOptional.orElse(null);

        if (admin != null) {
            // Using passwordEncoder to match the NoOp plain-text configuration
            if (passwordEncoder.matches(loginData.getPassword(), admin.getPassword())) {
                return "Successful"; 
            }
        }
        
        return "Invalid Credentials";
    }

    // --- DASHBOARD DATA ROUTES ---

    @GetMapping("/admin/enquiries")
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepo.findAll();
    }

    @GetMapping("/admin/contacts")
    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }
}
