package com.website.AutopartsHub.controller;

import com.website.AutopartsHub.dto.AddToCartRequest;
import com.website.AutopartsHub.entity.Cart;
import com.website.AutopartsHub.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody AddToCartRequest request) {
        return cartService.addToCart(request);
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeFromCart(@PathVariable Long cartItemId) {

        cartService.removeFromCart(cartItemId);

        return "Item removed successfully";
    }
}