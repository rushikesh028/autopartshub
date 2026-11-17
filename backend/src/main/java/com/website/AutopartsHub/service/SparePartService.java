package com.website.AutopartsHub.service;

import com.website.AutopartsHub.dto.SparePartRequest;
import com.website.AutopartsHub.entity.SparePart;

import java.util.List;

public interface SparePartService {

    SparePart addSparePart(SparePartRequest request);
    List<SparePart> getAllParts();
    SparePart getPartById(Long id);

    SparePart updatePart(Long id, SparePartRequest request);

    void deletePart(Long id);

    List<SparePart> searchByKeyword(String keyword);

    List<SparePart> searchByBrand(String brand);
}