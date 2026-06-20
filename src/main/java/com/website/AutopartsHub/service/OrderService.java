package com.website.AutopartsHub.service;

import com.website.AutopartsHub.entity.Order;

import java.util.List;

public interface OrderService {

    Order checkout(Long userId);

    List<Order> getOrdersByUser(Long userId);
}