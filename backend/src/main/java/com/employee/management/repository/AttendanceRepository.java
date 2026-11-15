package com.employee.management.repository;
import com.employee.management.entity.Attendance; import org.springframework.data.jpa.repository.JpaRepository; import java.time.LocalDate; import java.util.*;
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
 Optional<Attendance> findByEmployee_IdAndAttendanceDate(Long employeeId,LocalDate date);
 List<Attendance> findByEmployee_IdOrderByAttendanceDateDesc(Long employeeId);
 List<Attendance> findAllByOrderByAttendanceDateDesc();
 long countByAttendanceDateAndStatus(LocalDate date, Attendance.Status status);
}
