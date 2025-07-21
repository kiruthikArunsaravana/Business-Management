package com.example.coconut.repository;

import com.example.coconut.entity.HuskSelling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HuskSellingRepository extends JpaRepository<HuskSelling, Long> {
    List<HuskSelling> findByDateBetween(LocalDate start, LocalDate end);
}
