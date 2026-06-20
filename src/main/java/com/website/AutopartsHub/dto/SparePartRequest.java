package com.website.AutopartsHub.dto;

import lombok.Data;

@Data
public class SparePartRequest {

    private String partName;
    private String brand;
    private String vehicleModel;
    private Double price;
    private Integer stock;
    private String description;
    private String imageUrl;
    private Long categoryId;
}