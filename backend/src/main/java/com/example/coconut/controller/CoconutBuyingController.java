package com.example.coconut.controller;

import com.example.coconut.entity.CoconutBuying;
import com.example.coconut.service.CoconutBuyingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/coconut/buying")
@CrossOrigin(origins = "http://localhost:5173")
public class CoconutBuyingController {

    private final CoconutBuyingService service;

    public CoconutBuyingController(CoconutBuyingService service) {
        this.service = service;
    }

    @GetMapping
    public List<CoconutBuying> getAll() {
        return service.getAll();
    }

    @GetMapping("/filter")
    public List<CoconutBuying> getByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return service.getByDateRange(startDate, endDate);
    }

    @PostMapping
    public CoconutBuying save(@RequestBody CoconutBuying buying) {
        return service.save(buying);
    }
}
