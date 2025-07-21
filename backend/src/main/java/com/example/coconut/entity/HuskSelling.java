package com.example.coconut.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "husk_selling")
public class HuskSelling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private LocalDate date;
    private int loadCount;
    private double ratePerLoad;
    private double wages;
    private double totalAmount;

    public HuskSelling() {}

    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        this.totalAmount = (loadCount * ratePerLoad) - wages;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getLoadCount() { return loadCount; }
    public void setLoadCount(int loadCount) { this.loadCount = loadCount; }

    public double getRatePerLoad() { return ratePerLoad; }
    public void setRatePerLoad(double ratePerLoad) { this.ratePerLoad = ratePerLoad; }

    public double getWages() { return wages; }
    public void setWages(double wages) { this.wages = wages; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}
