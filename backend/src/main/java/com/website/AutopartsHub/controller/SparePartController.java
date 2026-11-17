package com.website.AutopartsHub.controller;

import com.website.AutopartsHub.dto.SparePartRequest;
import com.website.AutopartsHub.entity.SparePart;
import com.website.AutopartsHub.service.SparePartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
public class SparePartController {

    private final SparePartService sparePartService;

    @PostMapping
    public SparePart addPart(@RequestBody SparePartRequest request) {
        return sparePartService.addSparePart(request);
    }

    @GetMapping
    public List<SparePart> getAllParts() {
        return sparePartService.getAllParts();
    }

    @GetMapping("/{id}")
    public SparePart getPartById(@PathVariable Long id) {
        return sparePartService.getPartById(id);
    }

    @PutMapping("/{id}")
    public SparePart updatePart(@PathVariable Long id,
                                @RequestBody SparePartRequest request) {

        return sparePartService.updatePart(id, request);
    }

    @DeleteMapping("/{id}")
    public String deletePart(@PathVariable Long id) {

        sparePartService.deletePart(id);

        return "Part deleted successfully";
    }

    @GetMapping("/search")
    public List<SparePart> searchParts(
            @RequestParam String keyword) {

        return sparePartService.searchByKeyword(keyword);
    }

    @GetMapping("/brand/{brand}")
    public List<SparePart> getByBrand(
            @PathVariable String brand) {

        return sparePartService.searchByBrand(brand);
    }

}