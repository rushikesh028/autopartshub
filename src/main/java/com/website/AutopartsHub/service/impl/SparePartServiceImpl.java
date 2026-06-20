package com.website.AutopartsHub.service.impl;

import com.website.AutopartsHub.dto.SparePartRequest;
import com.website.AutopartsHub.entity.Category;
import com.website.AutopartsHub.entity.SparePart;
import com.website.AutopartsHub.repository.CategoryRepository;
import com.website.AutopartsHub.repository.SparePartRepository;
import com.website.AutopartsHub.service.SparePartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SparePartServiceImpl implements SparePartService {

    private final SparePartRepository sparePartRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<SparePart> getAllParts() {
        return sparePartRepository.findAll();
    }

    @Override
    public SparePart getPartById(Long id) {
        return sparePartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found"));
    }

    @Override
    public SparePart addSparePart(SparePartRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        SparePart sparePart = SparePart.builder()
                .partName(request.getPartName())
                .brand(request.getBrand())
                .vehicleModel(request.getVehicleModel())
                .price(request.getPrice())
                .stock(request.getStock())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        return sparePartRepository.save(sparePart);
    }



    @Override
    public SparePart updatePart(Long id, SparePartRequest request) {

        SparePart part = sparePartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        part.setPartName(request.getPartName());
        part.setBrand(request.getBrand());
        part.setVehicleModel(request.getVehicleModel());
        part.setPrice(request.getPrice());
        part.setStock(request.getStock());
        part.setDescription(request.getDescription());
        part.setImageUrl(request.getImageUrl());
        part.setCategory(category);

        return sparePartRepository.save(part);
    }


    @Override
    public void deletePart(Long id) {

        SparePart part = sparePartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found"));

        sparePartRepository.delete(part);
    }

    @Override
    public List<SparePart> searchByKeyword(String keyword) {
        return sparePartRepository
                .findByPartNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<SparePart> searchByBrand(String brand) {
        return sparePartRepository.findByBrand(brand);
    }
}