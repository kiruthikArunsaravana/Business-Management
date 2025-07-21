package com.example.coconut.controller;

import com.example.coconut.entity.HuskSelling;
import com.example.coconut.service.HuskSellingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/husk/selling")
@CrossOrigin(origins = "http://localhost:5173")
public class HuskSellingController {

    private final HuskSellingService huskSellingService;

    public HuskSellingController(HuskSellingService huskSellingService) {
        this.huskSellingService = huskSellingService;
    }

    @GetMapping
    public List<HuskSelling> getByDateRange(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        if (startDate != null && endDate != null) {
            return huskSellingService.getByDateRange(startDate, endDate);
        } else {
            return huskSellingService.getAll();
        }
    }

    @PostMapping
    public HuskSelling save(@RequestBody HuskSelling huskSelling) {
        return huskSellingService.save(huskSelling);
    }
}
