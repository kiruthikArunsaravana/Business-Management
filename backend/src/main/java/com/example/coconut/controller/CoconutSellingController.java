package com.example.coconut.controller;

import com.example.coconut.entity.CoconutSelling;
import com.example.coconut.service.CoconutSellingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coconut/selling")
@CrossOrigin(origins = "http://localhost:5173")
public class CoconutSellingController {

    @Autowired
    private CoconutSellingService service;

    @PostMapping
    public CoconutSelling save(@RequestBody CoconutSelling selling) {
        return service.save(selling);
    }

    @GetMapping
    public List<CoconutSelling> getAll() {
        return service.getAll();
    }
}
