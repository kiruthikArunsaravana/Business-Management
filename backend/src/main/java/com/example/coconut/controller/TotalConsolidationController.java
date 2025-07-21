package com.example.coconut.controller;

import com.example.coconut.service.TotalConsolidationService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/total-consolidation")
@CrossOrigin(origins = "*")
public class TotalConsolidationController {

    private final TotalConsolidationService service;

    public TotalConsolidationController(TotalConsolidationService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Object> getTotalConsolidation(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return service.getTotalConsolidation(start, end);
    }
}
