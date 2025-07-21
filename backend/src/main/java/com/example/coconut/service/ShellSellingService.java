package com.example.coconut.service;

import com.example.coconut.entity.ShellSelling;
import com.example.coconut.repository.ShellSellingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShellSellingService {

    private final ShellSellingRepository repository;

    public ShellSellingService(ShellSellingRepository repository) {
        this.repository = repository;
    }

    public ShellSelling save(ShellSelling selling) {
        return repository.save(selling);
    }

    public List<ShellSelling> getAll() {
        return repository.findAll();
    }

    public List<ShellSelling> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public double getTotalAmount(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToDouble(ShellSelling::getTotalAmount)
                .sum();
    }

    public double getTotalLoads(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToDouble(ShellSelling::getKg)  // use double
                .sum();
    }

}
