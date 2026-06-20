package com.website.AutopartsHub.repository;

import com.website.AutopartsHub.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}