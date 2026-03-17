package com.accommodationfinder.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String city;
    private String address;
    private BigDecimal price;
    private Integer sizeSqm;
    private Boolean available = true;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;

    private Double latitude;
    private Double longitude;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum RoomType { STUDIO, SHARED, APARTMENT, HOUSE }

    // Getters and Setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    public RoomType getRoomType() { return roomType; }
    public void setRoomType(RoomType roomType) { this.roomType = roomType; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Integer getSizeSqm() { return sizeSqm; }
    public void setSizeSqm(Integer sizeSqm) { this.sizeSqm = sizeSqm; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getLandlord() { return landlord; }
    public void setLandlord(User landlord) { this.landlord = landlord; }
}
