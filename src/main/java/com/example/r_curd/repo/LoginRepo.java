package com.example.r_curd.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.r_curd.Model.Register;

@Repository
public interface LoginRepo extends JpaRepository<Register, Integer>{
	
	Optional<Register> findByemail(String email);
}
