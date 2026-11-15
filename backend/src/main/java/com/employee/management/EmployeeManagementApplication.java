package com.employee.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * EmployeeManagementApplication
 * ──────────────────────────────
 * Entry point for the Spring Boot application.
 *
 * @SpringBootApplication combines:
 *   • @Configuration      – marks this class as a bean source
 *   • @EnableAutoConfiguration – auto-configures Spring based on classpath
 *   • @ComponentScan      – scans sub-packages for Spring components
 *
 * @EnableJpaAuditing enables automatic population of
 *   @CreatedDate and @LastModifiedDate fields in entities.
 */
@SpringBootApplication
@EnableJpaAuditing
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);
        System.out.println("\n╔══════════════════════════════════════════════╗");
        System.out.println("║   Employee Management System – STARTED ✓    ║");
        System.out.println("║   Backend API running at http://localhost:8080 ║");
        System.out.println("╚══════════════════════════════════════════════╝\n");
    }
}

