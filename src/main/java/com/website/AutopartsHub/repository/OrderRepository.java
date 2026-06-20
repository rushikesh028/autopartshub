package com.website.AutopartsHub.repository;

import com.website.AutopartsHub.entity.Order;
import com.website.AutopartsHub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}