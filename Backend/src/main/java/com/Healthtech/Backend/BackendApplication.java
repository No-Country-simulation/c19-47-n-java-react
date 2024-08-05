package com.Healthtech.Backend;

import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.UserEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	CommandLineRunner init(UserEntityRepository userEntityRepository){
		return args -> {

			UserEntity userEntity = UserEntity.builder()
					.email("admin@gmail.com")
					.password("reactjava1947")
					.role("ADMIN")
					.build();

			userEntityRepository.save(userEntity);


		};
	}
}
