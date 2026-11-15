package com.employee.management.controller;
import com.employee.management.dto.AttendanceRequest; import com.employee.management.entity.Attendance; import com.employee.management.service.AttendanceService; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/attendance") public class AttendanceController {
 private final AttendanceService service; public AttendanceController(AttendanceService s){service=s;}
 @PostMapping("/check-in") public Attendance in(@RequestBody AttendanceRequest r){return service.checkIn(r);}
 @PostMapping("/check-out") public Attendance out(@RequestBody AttendanceRequest r){return service.checkOut(r);}
 @GetMapping public List<Attendance> all(@RequestParam(required=false) Long employeeId){return service.all(employeeId);}
 @GetMapping("/employee/{id}") public List<Attendance> employee(@PathVariable Long id){return service.all(id);}
}
