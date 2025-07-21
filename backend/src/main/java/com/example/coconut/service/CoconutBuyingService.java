package com.example.coconut.service;

import com.example.coconut.entity.CoconutBuying;
import com.example.coconut.repository.CoconutBuyingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CoconutBuyingService {

    private final CoconutBuyingRepository repository;

    public CoconutBuyingService(CoconutBuyingRepository repository) {
        this.repository = repository;
    }

    public CoconutBuying save(CoconutBuying buying) {
        return repository.save(buying);
    }

    public List<CoconutBuying> getAll() {
        return repository.findAll();
    }

    public List<CoconutBuying> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public double getTotalAmountSpent(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToDouble(CoconutBuying::getTotalAmount)
                .sum();
    }

    public int getTotalCoconutsBought(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end)
                .stream()
                .mapToInt(CoconutBuying::getCoconutCount)
                .sum();
    }
}
