package com.example.coconut.repository;

import com.example.coconut.entity.CoconutBuying;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CoconutBuyingRepository extends JpaRepository<CoconutBuying, Long> {
    List<CoconutBuying> findByDateBetween(LocalDate start, LocalDate end);
}
