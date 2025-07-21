package com.example.coconut.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "coconut_buying")
public class CoconutBuying {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private LocalDate date;
    private int coconutCount;
    private double ratePerCoconut;
    private double wages;
    private double loadingWages;
    private double totalAmount;

    public CoconutBuying() {}

    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        this.totalAmount = (coconutCount * ratePerCoconut) - (wages + loadingWages);
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getCoconutCount() { return coconutCount; }
    public void setCoconutCount(int coconutCount) { this.coconutCount = coconutCount; }

    public double getRatePerCoconut() { return ratePerCoconut; }
    public void setRatePerCoconut(double ratePerCoconut) { this.ratePerCoconut = ratePerCoconut; }

    public double getWages() { return wages; }
    public void setWages(double wages) { this.wages = wages; }

    public double getLoadingWages() { return loadingWages; }
    public void setLoadingWages(double loadingWages) { this.loadingWages = loadingWages; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}
