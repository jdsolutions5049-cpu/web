package com.jdsolutions.backend.repository;

import com.jdsolutions.backend.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
}
