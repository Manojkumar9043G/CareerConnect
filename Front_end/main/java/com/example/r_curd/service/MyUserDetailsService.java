package com.example.r_curd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import java.util.Collections;


import com.example.r_curd.Model.Register;
import com.example.r_curd.repo.LoginRepo;


@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	private LoginRepo repo;
	
	@Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Register user = repo.findByemail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new User(user.getEmail(), user.getPassword(), Collections.emptyList());
    }

	
}
