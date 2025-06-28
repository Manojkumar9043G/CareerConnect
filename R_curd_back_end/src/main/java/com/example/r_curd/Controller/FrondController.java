package com.example.r_curd.Controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.r_curd.DTO.LoginDTO;
import com.example.r_curd.DTO.RegisterDTO;
import com.example.r_curd.Model.UserDetails;
import com.example.r_curd.service.Curd_Service;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class FrondController {
	@Autowired
	private Curd_Service service;
	

	@PostMapping("register")
	public ResponseEntity<String> registerDetails(@RequestBody RegisterDTO register ) {
		return service.registerDetails(register);
	}
	
	@PostMapping("login")
	public ResponseEntity<String> userLogin(@RequestBody LoginDTO Login) {
		return service.loginDetails(Login);
	}
	
	@PostMapping("/usersDetails")
	public ResponseEntity<String> saveUserDetails(
	    @RequestParam("name") String name,
	    @RequestParam("college") String college,
	    @RequestParam("course") String course,
	    @RequestParam("resume") String resume,
	    @RequestParam("score") String score,
	    @RequestParam("gender") String gender,
	    @RequestParam("image") MultipartFile image
	) throws IOException {
		
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	     String email = auth.getName();
	     
	    return service.saveUserDetails(name,college,course,resume,score,gender,image,email);
	}

	
	@GetMapping("userPosts")
	public List<UserDetails> getUserPosts() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return service.getUserPosts(auth);
	}
	
	@DeleteMapping("/deletePost")
	public ResponseEntity<String> deletePost(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return service.deleteThePost(auth);
	}
}
