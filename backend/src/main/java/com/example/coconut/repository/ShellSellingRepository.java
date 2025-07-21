package com.example.coconut.repository;

import com.example.coconut.entity.ShellSelling;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ShellSellingRepository extends JpaRepository<ShellSelling, Long> {
    List<ShellSelling> findByDateBetween(LocalDate start, LocalDate end);
}

