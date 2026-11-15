package com.employee.management.dto;
import java.time.LocalDate;
public record LeaveRequestDto(Long employeeId,String leaveType,LocalDate startDate,LocalDate endDate,String reason,String reviewRemarks) {}
