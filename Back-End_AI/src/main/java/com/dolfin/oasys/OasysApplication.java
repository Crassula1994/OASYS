package com.dolfin.oasys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class OasysApplication {

	public static void main(String[] args) {
		SpringApplication.run(OasysApplication.class, args);
	}

}
