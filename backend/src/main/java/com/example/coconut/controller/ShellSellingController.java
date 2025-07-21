package com.example.coconut.controller;

import com.example.coconut.entity.ShellSelling;
import com.example.coconut.service.ShellSellingService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shell/selling")
@CrossOrigin(origins = "http://localhost:5173")  // adjust as needed
public class ShellSellingController {

    private final ShellSellingService shellSellingService;

    public ShellSellingController(ShellSellingService shellSellingService) {
        this.shellSellingService = shellSellingService;
    }

    @PostMapping
    public ShellSelling save(@RequestBody ShellSelling shellSelling) {
        return shellSellingService.save(shellSelling);
    }

    @GetMapping
    public List<ShellSelling> getAll() {
        return shellSellingService.getAll();
    }

    @GetMapping("/report")
    public List<ShellSelling> getByDate(@RequestParam LocalDate start, @RequestParam LocalDate end) {
        return shellSellingService.getByDateRange(start, end);
    }
}
