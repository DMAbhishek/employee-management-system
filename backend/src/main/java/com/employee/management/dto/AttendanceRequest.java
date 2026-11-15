package com.employee.management.dto;
import java.time.LocalDate;
public record AttendanceRequest(Long employeeId,LocalDate date,String remarks) {}
