package com.employee.management.dto;
import java.math.BigDecimal; import java.time.LocalDate;
public record EmployeeRequest(String employeeCode,String firstName,String lastName,String email,String phone,String gender,LocalDate dateOfBirth,String address,String designation,BigDecimal basicSalary,LocalDate joiningDate,String employmentStatus,Long departmentId,Long userId) {}
