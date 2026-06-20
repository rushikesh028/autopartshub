package com.website.AutopartsHub.service.impl;

import com.website.AutopartsHub.dto.AddToCartRequest;
import com.website.AutopartsHub.entity.*;
import com.website.AutopartsHub.repository.*;
import com.website.AutopartsHub.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final SparePartRepository sparePartRepository;

    @Override
    public Cart addToCart(AddToCartRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SparePart part = sparePartRepository.findById(request.getSparePartId())
                .orElseThrow(() -> new RuntimeException("Part not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .cartItems(new ArrayList<>())
                            .build();
                    return cartRepository.save(newCart);
                });

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .sparePart(part)
                .quantity(request.getQuantity())
                .build();

        cartItemRepository.save(cartItem);

        cart.getCartItems().add(cartItem);

        return cartRepository.save(cart);
    }

    @Override
    public Cart getCart(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @Override
    public void removeFromCart(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);
    }
}