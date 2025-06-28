package com.example.r_curd.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.r_curd.Model.UserDetails;

public interface UserInfo extends JpaRepository<UserDetails, Long>{
	
	
	@Query(value = "SELECT * FROM USER_DETAILS WHERE USER_ID = :id", nativeQuery = true)
	List<UserDetails> getAllValues(@Param("id") int id);

	
}
