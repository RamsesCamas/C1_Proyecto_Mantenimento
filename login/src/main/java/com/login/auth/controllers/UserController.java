package com.login.auth.controllers;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.login.auth.Model.Duenio;
import com.login.auth.Model.User;
import com.login.auth.repositorio.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.login.auth.dto.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestTemplate restTemplate;

    @PostMapping(value = "/user/owner/signup")
    public Boolean duenioSignup(@RequestBody Duenio userRequest) {
        User userExist = userRepository.findByEmail(userRequest.getEmail());
        if (userExist == null) {
            User user = new User();
            user.setEmail(userRequest.getEmail());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setRol("duenio");
            userRepository.save(user);
            restTemplate.postForEntity("http://localhost:18080/duenio/add", userRequest, String.class);
            return true;
        }
        return false;
    }

    @PostMapping(value = "/user/login")
    public UserDTO login(@RequestBody User userRequest) {
        User userExist = userRepository.findByEmail(userRequest.getEmail());
        boolean pass = passwordEncoder.matches(userRequest.getPassword(), userExist.getPassword());
        if (userExist != null && pass){
            String token = getJWTToken(userRequest.getEmail());
            UserDTO user = new UserDTO();
            user.setUser(userRequest.getEmail());
            user.setToken(token);
            return user;
        }
        return null;
    }

    private String getJWTToken(String username) {
        String secretKey = "secreto";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        String token = Jwts
                .builder()
                .setId("petJWT")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 6000000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bearer " + token;
    }
}
