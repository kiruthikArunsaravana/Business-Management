package com.example.coconut.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class TotalConsolidationService {

    private final CoconutBuyingService coconutBuyingService;
    private final CoconutSellingService coconutSellingService;
    private final HuskSellingService huskSellingService;
    private final ShellSellingService shellSellingService;

    public TotalConsolidationService(
            CoconutBuyingService coconutBuyingService,
            CoconutSellingService coconutSellingService,
            HuskSellingService huskSellingService,
            ShellSellingService shellSellingService
    ) {
        this.coconutBuyingService = coconutBuyingService;
        this.coconutSellingService = coconutSellingService;
        this.huskSellingService = huskSellingService;
        this.shellSellingService = shellSellingService;
    }

    public Map<String, Object> getTotalConsolidation(LocalDate start, LocalDate end) {
        Map<String, Object> result = new HashMap<>();

        double totalBuying = coconutBuyingService.getTotalAmountSpent(start, end);
        double totalCoconutSelling = coconutSellingService.getTotalAmount(start, end);
        double totalHuskSelling = huskSellingService.getTotalAmount(start, end);
        double totalShellSelling = shellSellingService.getTotalAmount(start, end);

        int totalCoconuts = coconutBuyingService.getTotalCoconutsBought(start, end);
        int totalHuskLoads = huskSellingService.getTotalLoads(start, end);
        int totalShellLoads = (int) shellSellingService.getTotalLoads(start, end);

        double totalSelling = totalCoconutSelling + totalHuskSelling + totalShellSelling;
        double profit = totalSelling - totalBuying;

        result.put("totalBuyingAmount", totalBuying);
        result.put("totalCoconutSellingAmount", totalCoconutSelling);
        result.put("totalHuskSellingAmount", totalHuskSelling);
        result.put("totalShellSellingAmount", totalShellSelling);
        result.put("totalSellingAmount", totalSelling);
        result.put("totalCoconutsBought", totalCoconuts);
        result.put("totalHuskLoads", totalHuskLoads);
        result.put("totalShellLoads", totalShellLoads);
        result.put("profit", profit);

        return result;
    }
}
