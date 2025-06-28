package com.example.r_curd.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.r_curd.DTO.LoginDTO;
import com.example.r_curd.DTO.RegisterDTO;
import com.example.r_curd.Model.Register;
import com.example.r_curd.Model.UserDetails;
import com.example.r_curd.confic.JwtUtil;
import com.example.r_curd.confic.SecurityConfig;
import com.example.r_curd.repo.LoginRepo;
import com.example.r_curd.repo.UserInfo;

@Service
public class Curd_Service {

    @Autowired 
    private LoginRepo repo;
    
    @Autowired
    private UserInfo userRepo;

    @Autowired
    private SecurityConfig Encoder;
    
    @Autowired
    private JwtUtil jwt;

    public ResponseEntity<String> registerDetails(RegisterDTO register) {
        String name = register.getUsername();
        String email = register.getEmail();
        
        Optional<Register> existingUser = repo.findByemail(email);
        
        if(existingUser.isPresent()) {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email is already Exit Try other Mail");
        }

        String password = Encoder.passwordEncoder().encode(register.getPassword());

        Register rigister = new Register(name, email, password);

        Register savedUser = repo.save(rigister);
        if(savedUser != null) {
            return ResponseEntity.ok("Register Details or Stored in the Data base");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
    }
    
    
    
    

    public ResponseEntity<String> loginDetails(LoginDTO login) {
    	
    	Optional<Register> loginDetails = repo.findByemail(login.getEmail());
    	
        if (loginDetails.isPresent()) {
            String originalPass = loginDetails.get().getPassword();
            
            boolean isRight = Encoder.passwordEncoder().matches(login.getPassword(), originalPass);

            if (isRight) {
            	String token  = jwt.generateToken(login.getEmail());
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is incorrect.");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This Email ID does not exist.");
    }





	public ResponseEntity<String> saveUserDetails(String name, String college, String course, String resume,
			String score, String gender, MultipartFile image, String email) throws IOException {
		
		Optional<Register> user = repo.findByemail(email);
		
		if(user.isPresent()) {
			UserDetails info = new UserDetails(name, college, course, resume, score, gender, user.get().getId(), image.getBytes());
			userRepo.save(info);
			
			return ResponseEntity.ok("Value added in DB");
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your Email is Not Valid");
	}





	public List<UserDetails> getUserPosts(Authentication auth) {
		
		String userEmail = auth.getName();
		Optional<Register> user = repo.findByemail(userEmail);
		
		if(user.isPresent()) {
			List<UserDetails> userDetails = userRepo.getAllValues(user.get().getId());
			
			System.out.println(userDetails.get(0).getCourse());
			
			return userDetails;
		}
		return new ArrayList<UserDetails>();
	}





	public ResponseEntity<String> deleteThePost(Authentication auth) {
		String userEmail = auth.getName();
		
		Optional<Register> user = repo.findByemail(userEmail);
		if(user.isPresent()) {
			int userId = user.get().getId();
			int userName = user.get().getName();
			
			
		}
		return null;
	}
    

}

