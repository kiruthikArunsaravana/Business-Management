package com.example.coconut.controller;

import com.example.coconut.entity.Customer;
import com.example.coconut.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return service.save(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getCustomerById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        service.delete(id);
    }
}
