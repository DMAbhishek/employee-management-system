package com.employee.management.controller;
import com.employee.management.entity.*; import com.employee.management.repository.*; import org.springframework.web.bind.annotation.*; import java.time.LocalDate; import java.util.*;
@RestController @RequestMapping("/api/dashboard") public class DashboardController {
 private final EmployeeRepository employees; private final DepartmentRepository departments; private final LeaveRequestRepository leaves; private final AttendanceRepository attendance;
 public DashboardController(EmployeeRepository e,DepartmentRepository d,LeaveRequestRepository l,AttendanceRepository a){employees=e;departments=d;leaves=l;attendance=a;}
 @GetMapping("/statistics") public Map<String,Object> stats(){return Map.of("totalEmployees",employees.count(),"activeEmployees",employees.countByEmploymentStatus(Employee.EmploymentStatus.ACTIVE),"totalDepartments",departments.count(),"pendingLeaves",leaves.countByStatus(LeaveRequest.Status.PENDING),"presentToday",attendance.countByAttendanceDateAndStatus(LocalDate.now(),Attendance.Status.PRESENT));}
}
