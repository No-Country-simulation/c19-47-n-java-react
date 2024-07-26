package com.Healthtech.Backend;

import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.UserEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	CommandLineRunner init(UserEntityRepository userEntityRepository){
		return args -> {

			UserEntity userEntity = UserEntity.builder()
					.email("cami@gmail.com")
					.password("1234")
					.role("ADMIN")
					.build();

			userEntityRepository.save(userEntity);


		};
	}
}
