package com.example.coconut.service;

import org.springframework.stereotype.Service;
import com.example.coconut.entity.CoconutSelling;
import com.example.coconut.repository.CoconutSellingRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class CoconutSellingService {

    private final CoconutSellingRepository repository;

    public CoconutSellingService(CoconutSellingRepository repository) {
        this.repository = repository;
    }

    public CoconutSelling save(CoconutSelling selling) {
        return repository.save(selling);
    }

    public List<CoconutSelling> getAll() {
        return repository.findAll();
    }

    public List<CoconutSelling> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public double getTotalAmount(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToDouble(CoconutSelling::getTotalAmount)
                .sum();
    }

    // Optional: Semantic alias
    public double getTotalSellingAmount(LocalDate start, LocalDate end) {
        return getTotalAmount(start, end);
    }
}
