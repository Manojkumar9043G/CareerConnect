package com.example.r_curd.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class UserDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	private String name;
	private String college;
	private String course;
	private String resume;
	private String score;
	private String gender;
	
	private int user_id; 
	
	@Lob
	@Column(name="image", columnDefinition = "LONGBLOB")
	private byte[] image;	
	
	
	public UserDetails() {
		
	}
	
	
	

	public UserDetails(String name, String college, String course, String resume, String score, String gender,
			int user_id, byte[] image) {
		super();
		this.name = name;
		this.college = college;
		this.course = course;
		this.resume = resume;
		this.score = score;
		this.gender = gender;
		this.user_id = user_id;
		this.image = image;
	}




	public UserDetails(Long id, String name, String college, String course, String resume, String score, String gender,int user_id,
			byte[] image) {
		super();
		Id = id;
		this.name = name;
		this.college = college;
		this.course = course;
		this.resume = resume;
		this.score = score;
		this.gender = gender;
		this.user_id = user_id;
		this.image = image;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCollege() {
		return college;
	}

	public void setCollege(String college) {
		this.college = college;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	

	public int getUser_id() {
		return user_id;
	}



	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}



	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}


}
