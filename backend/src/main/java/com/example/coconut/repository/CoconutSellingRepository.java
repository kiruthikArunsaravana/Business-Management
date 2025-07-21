package com.example.coconut.repository;

import com.example.coconut.entity.CoconutSelling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CoconutSellingRepository extends JpaRepository<CoconutSelling, Long> {
    List<CoconutSelling> findByDateBetween(LocalDate start, LocalDate end);
}
