package com.login.auth.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping("/API/hello")
    public String helloWorld(@RequestParam(value="name", defaultValue="World") String name) {
        return "Hello "+name+"!!";
    }

    @RequestMapping("/API/test")
    public String testing(@RequestParam(value="name", defaultValue="World") String name) {
        return "Testing this "+name+"!!";
    }

}
