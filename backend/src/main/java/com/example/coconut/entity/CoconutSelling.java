package com.example.coconut.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "coconut_selling")
public class CoconutSelling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private LocalDate date;
    private double kg;
    private double ratePerKg;
    private double wages;
    private double totalAmount;

    public CoconutSelling() {}

    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        this.totalAmount = (kg * ratePerKg) - wages;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public LocalDate getDate() {
        return date;
    }

    public double getKg() {
        return kg;
    }

    public double getRatePerKg() {
        return ratePerKg;
    }

    public double getWages() {
        return wages;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setKg(double kg) {
        this.kg = kg;
    }

    public void setRatePerKg(double ratePerKg) {
        this.ratePerKg = ratePerKg;
    }

    public void setWages(double wages) {
        this.wages = wages;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
