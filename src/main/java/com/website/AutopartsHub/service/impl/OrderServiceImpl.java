package com.website.AutopartsHub.service.impl;

import com.website.AutopartsHub.entity.*;
import com.website.AutopartsHub.repository.*;
import com.website.AutopartsHub.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final SparePartRepository sparePartRepository;

    @Override
    public Order checkout(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<OrderItem> orderItems = new ArrayList<>();

        double totalAmount = 0;

        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .status("PLACED")
                .build();

        order = orderRepository.save(order);

        for (CartItem cartItem : cart.getCartItems()) {

            SparePart part = cartItem.getSparePart();

            if (part.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        part.getPartName() + " is out of stock"
                );
            }

            part.setStock(
                    part.getStock() - cartItem.getQuantity()
            );

            sparePartRepository.save(part);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .sparePart(part)
                    .quantity(cartItem.getQuantity())
                    .price(part.getPrice())
                    .build();

            totalAmount +=
                    cartItem.getQuantity() * part.getPrice();

            orderItems.add(orderItem);
        }

        orderItemRepository.saveAll(orderItems);

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        cartItemRepository.deleteAll(cart.getCartItems());

        return savedOrder;
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user);
    }
}