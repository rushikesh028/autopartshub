package com.website.AutopartsHub.controller;

import com.website.AutopartsHub.entity.Order;
import com.website.AutopartsHub.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout/{userId}")
    public Order checkout(@PathVariable Long userId) {
        return orderService.checkout(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }
}