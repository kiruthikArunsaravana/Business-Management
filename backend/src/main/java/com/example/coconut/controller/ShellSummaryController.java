package com.example.coconut.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.coconut.service.ShellSellingService;

@RestController
@RequestMapping("/api/shell-summary")
@CrossOrigin(origins = "http://localhost:5173")
public class ShellSummaryController {

    private final ShellSellingService shellSellingService;

    public ShellSummaryController(ShellSellingService shellSellingService) {
        this.shellSellingService = shellSellingService;
    }

    @GetMapping
    public Map<String, Object> getSummary(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<String, Object> summary = new HashMap<>();
        double totalProfit = shellSellingService.getTotalAmount(startDate, endDate);
        int totalLoads = (int) shellSellingService.getTotalLoads(startDate, endDate);

        summary.put("totalProfit", totalProfit);
        summary.put("totalLoads", totalLoads);
        return summary;
    }
}
