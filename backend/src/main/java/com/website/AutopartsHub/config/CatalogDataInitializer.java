package com.website.AutopartsHub.config;

import com.website.AutopartsHub.entity.Category;
import com.website.AutopartsHub.entity.SparePart;
import com.website.AutopartsHub.repository.CategoryRepository;
import com.website.AutopartsHub.repository.SparePartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CatalogDataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final SparePartRepository sparePartRepository;

    @Override
    public void run(String... args) {
        Map<String, Category> categories = new HashMap<>();
        for (Category category : categoryRepository.findAll()) {
            categories.put(category.getName(), category);
        }

        repairPartImage(
                categories,
                "Brakes",
                "Premium Brake Pad",
                "Bosch",
                "Hyundai Creta",
                2999.99,
                75,
                "Premium ceramic brake pad set with balanced wear and low brake dust.",
                "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80"
        );

        addPart(
                categories,
                "Brakes",
                "Ventilated Brake Disc",
                "TORQLINE",
                "Compact sedan",
                2450.0,
                18,
                "High-heat ventilated rotor tuned for city braking and repeated highway stops.",
                "https://images.unsplash.com/photo-1611633235555-45e252fe48c8?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Electrical",
                "Alternator Assembly",
                "IRONHUB",
                "Mid-size SUV",
                6900.0,
                7,
                "Replacement alternator assembly built for reliable charging under daily load.",
                "https://images.unsplash.com/photo-1595787142842-7404bc60470d?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Drivetrain",
                "Clutch Plate Kit",
                "STEELWORKS AUTO",
                "Hatchback",
                3150.0,
                24,
                "Balanced clutch kit with pressure plate and release bearing for clean engagement.",
                "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Suspension",
                "Front Suspension Coil",
                "REDLINE",
                "Pickup",
                1980.0,
                11,
                "Load-tuned front suspension coil that restores ride height and steering response.",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Engine",
                "Engine Oil Filter",
                "VANFLEET MOTORS",
                "All sedans",
                420.0,
                56,
                "High-flow oil filter designed for daily service intervals and clean pressure retention.",
                "https://images.unsplash.com/photo-1522598140461-ec9911e01c53?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Lighting",
                "Halogen Headlight Assembly",
                "NORTHBELT FLEET",
                "Compact SUV",
                4250.0,
                9,
                "Factory-style headlight assembly with clear beam pattern and sealed housing.",
                "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Engine",
                "Timing Belt Kit",
                "STEELWORKS AUTO",
                "Hatchback",
                2780.0,
                14,
                "Complete timing belt kit for scheduled replacement before wear becomes failure.",
                "https://images.unsplash.com/photo-1663642775693-6628f65358be?auto=format&fit=crop&w=800&q=80"
        );
        addPart(
                categories,
                "Electrical",
                "Car Battery 12V 65Ah",
                "TORQLINE",
                "All sedans",
                5600.0,
                3,
                "Maintenance-free battery with strong cold-start current and roadside warranty support.",
                "https://images.unsplash.com/photo-1676337167629-d896b3ed5724?auto=format&fit=crop&w=800&q=80"
        );
    }

    private void addPart(
            Map<String, Category> categories,
            String categoryName,
            String partName,
            String brand,
            String vehicleModel,
            Double price,
            Integer stock,
            String description,
            String imageUrl
    ) {
        if (sparePartRepository.existsByPartNameAndBrand(partName, brand)) {
            return;
        }

        Category category = categories.computeIfAbsent(categoryName, name ->
                categoryRepository.save(Category.builder().name(name).build()));

        sparePartRepository.save(SparePart.builder()
                .partName(partName)
                .brand(brand)
                .vehicleModel(vehicleModel)
                .price(price)
                .stock(stock)
                .description(description)
                .imageUrl(imageUrl)
                .category(category)
                .build());
    }

    private void repairPartImage(
            Map<String, Category> categories,
            String categoryName,
            String partName,
            String brand,
            String vehicleModel,
            Double price,
            Integer stock,
            String description,
            String imageUrl
    ) {
        SparePart part = sparePartRepository.findByPartNameAndBrand(partName, brand)
                .orElseGet(() -> createSeedPart(
                        categories,
                        categoryName,
                        partName,
                        brand,
                        vehicleModel,
                        price,
                        stock,
                        description,
                        imageUrl
                ));

        boolean updated = false;

        if (part.getImageUrl() == null || part.getImageUrl().isBlank() || !isSupportedImageUrl(part.getImageUrl())) {
            part.setImageUrl(imageUrl);
            updated = true;
        }
        if (part.getDescription() == null || part.getDescription().isBlank()) {
            part.setDescription(description);
            updated = true;
        }
        if (part.getVehicleModel() == null || part.getVehicleModel().isBlank()) {
            part.setVehicleModel(vehicleModel);
            updated = true;
        }
        if (part.getCategory() == null) {
            part.setCategory(categories.computeIfAbsent(categoryName, name ->
                    categoryRepository.save(Category.builder().name(name).build())));
            updated = true;
        }

        if (updated) {
            sparePartRepository.save(part);
        }
    }

    private SparePart createSeedPart(
            Map<String, Category> categories,
            String categoryName,
            String partName,
            String brand,
            String vehicleModel,
            Double price,
            Integer stock,
            String description,
            String imageUrl
    ) {
        Category category = categories.computeIfAbsent(categoryName, name ->
                categoryRepository.save(Category.builder().name(name).build()));

        return sparePartRepository.save(SparePart.builder()
                .partName(partName)
                .brand(brand)
                .vehicleModel(vehicleModel)
                .price(price)
                .stock(stock)
                .description(description)
                .imageUrl(imageUrl)
                .category(category)
                .build());
    }

    private boolean isSupportedImageUrl(String imageUrl) {
        return imageUrl.startsWith("http://")
                || imageUrl.startsWith("https://")
                || imageUrl.startsWith("/");
    }
}
