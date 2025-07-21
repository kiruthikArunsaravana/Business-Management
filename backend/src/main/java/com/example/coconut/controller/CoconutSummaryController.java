package com.example.coconut.controller;

import com.example.coconut.service.CoconutBuyingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/coconut-summary")
@CrossOrigin(origins = "http://localhost:5173")
public class CoconutSummaryController {

    private final CoconutBuyingService coconutBuyingService;

    public CoconutSummaryController(CoconutBuyingService coconutBuyingService) {
        this.coconutBuyingService = coconutBuyingService;
    }

    @GetMapping
    public Map<String, Object> getSummary(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<String, Object> summary = new HashMap<>();
        double totalProfit = coconutBuyingService.getTotalAmountSpent(startDate, endDate);  // adjust if needed
        int totalCoconuts = coconutBuyingService.getTotalCoconutsBought(startDate, endDate);

        summary.put("totalProfit", totalProfit);
        summary.put("totalCoconuts", totalCoconuts);
        return summary;
    }
}
