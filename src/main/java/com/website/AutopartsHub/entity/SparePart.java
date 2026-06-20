package com.website.AutopartsHub.entity;

import jakarta.persistence.*;
import lombok.*;
import com.website.AutopartsHub.entity.Category;

@Entity
@Table(name = "spare_parts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SparePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String partName;

    private String brand;

    private String vehicleModel;

    private Double price;

    private Integer stock;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}