package com.example.coconut.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "shell_selling")
public class ShellSelling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private LocalDate date;
    private double kg;
    private double ratePerKg;
    private double totalAmount;

    public ShellSelling() {}

    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        this.totalAmount = this.kg * this.ratePerKg;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getKg() { return kg; }
    public void setKg(double kg) { this.kg = kg; }

    public double getRatePerKg() { return ratePerKg; }
    public void setRatePerKg(double ratePerKg) { this.ratePerKg = ratePerKg; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}
