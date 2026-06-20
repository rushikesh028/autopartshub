package com.website.AutopartsHub.repository;

import com.website.AutopartsHub.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {
}
