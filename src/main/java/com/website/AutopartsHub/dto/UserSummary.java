package com.website.AutopartsHub.dto;

import com.website.AutopartsHub.entity.Role;
import com.website.AutopartsHub.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSummary {

    private Long id;
    private String name;
    private String email;
    private Role role;

    public static UserSummary from(User user) {
        return new UserSummary(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
