package com.employee.management;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * Smoke test – verifies the Spring application context loads without errors.
 * Run with:  mvn test
 */
@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
class EmployeeManagementApplicationTests {

    @Test
    void contextLoads() {
        // If this test passes, the Spring context wired up correctly.
    }
}

