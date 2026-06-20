package com.website.AutopartsHub.repository;

import com.website.AutopartsHub.entity.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SparePartRepository extends JpaRepository<SparePart, Long> {

    boolean existsByPartNameAndBrand(String partName, String brand);

    Optional<SparePart> findByPartNameAndBrand(String partName, String brand);

    List<SparePart> findByBrand(String brand);

    List<SparePart> findByVehicleModel(String vehicleModel);

    List<SparePart> findByPartNameContainingIgnoreCase(String keyword);
}
