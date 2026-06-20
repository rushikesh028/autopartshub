package com.website.AutopartsHub.repository;

import com.website.AutopartsHub.entity.Cart;
import com.website.AutopartsHub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);

}
