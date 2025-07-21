package com.example.coconut.service;

import com.example.coconut.entity.Customer;
import com.example.coconut.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer save(Customer customer) {
        return repository.save(customer);
    }

    public List<Customer> getAll() {
        return repository.findAll();
    }

    public Optional<Customer> getById(Long id) {
        return repository.findById(id);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
