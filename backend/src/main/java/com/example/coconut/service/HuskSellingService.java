package com.example.coconut.service;

import com.example.coconut.entity.HuskSelling;
import com.example.coconut.repository.HuskSellingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HuskSellingService {

    private final HuskSellingRepository repository;

    public HuskSellingService(HuskSellingRepository repository) {
        this.repository = repository;
    }

    public HuskSelling save(HuskSelling selling) {
        return repository.save(selling);
    }

    public List<HuskSelling> getAll() {
        return repository.findAll();
    }

    public List<HuskSelling> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public double getTotalAmount(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToDouble(HuskSelling::getTotalAmount)
                .sum();
    }

    public int getTotalLoads(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToInt(HuskSelling::getLoadCount)
                .sum();
    }
}
