package com.website.AutopartsHub.service;

import com.website.AutopartsHub.dto.AddToCartRequest;
import com.website.AutopartsHub.entity.Cart;

public interface CartService {

    Cart addToCart(AddToCartRequest request);

    Cart getCart(Long userId);

    void removeFromCart(Long cartItemId);
}