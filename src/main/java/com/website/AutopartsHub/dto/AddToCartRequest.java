package com.website.AutopartsHub.dto;

import lombok.Data;

@Data
public class AddToCartRequest {

    private Long userId;
    private Long sparePartId;
    private Integer quantity;
}