package com.employee.management.service;
import com.employee.management.dto.AttendanceRequest; import com.employee.management.entity.*; import com.employee.management.repository.*; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal; import java.time.*; import java.util.*;
@Service public class AttendanceService {
 private final AttendanceRepository repo; private final EmployeeRepository employees;
 public AttendanceService(AttendanceRepository r,EmployeeRepository e){repo=r;employees=e;}
 private Employee emp(Long id){return employees.findById(id).orElseThrow(()->new NoSuchElementException("Employee not found"));}
 @Transactional public Attendance checkIn(AttendanceRequest r){LocalDate d=r.date()==null?LocalDate.now():r.date();Attendance a=repo.findByEmployee_IdAndAttendanceDate(r.employeeId(),d).orElseGet(()->{Attendance n=new Attendance();n.setEmployee(emp(r.employeeId()));n.setAttendanceDate(d);return n;});if(a.getCheckInTime()!=null)throw new IllegalStateException("Already checked in");a.setCheckInTime(LocalDateTime.now());a.setStatus(Attendance.Status.PRESENT);a.setRemarks(r.remarks());return repo.save(a);}
 @Transactional public Attendance checkOut(AttendanceRequest r){Attendance a=repo.findByEmployee_IdAndAttendanceDate(r.employeeId(),r.date()==null?LocalDate.now():r.date()).orElseThrow(()->new NoSuchElementException("Check-in not found"));a.setCheckOutTime(LocalDateTime.now());a.setWorkingHours(BigDecimal.valueOf(Duration.between(a.getCheckInTime(),a.getCheckOutTime()).toMinutes()/60.0));if(a.getWorkingHours().doubleValue()<4)a.setStatus(Attendance.Status.HALF_DAY);return repo.save(a);}
 public List<Attendance> all(Long employeeId){return employeeId==null?repo.findAllByOrderByAttendanceDateDesc():repo.findByEmployee_IdOrderByAttendanceDateDesc(employeeId);}
}
