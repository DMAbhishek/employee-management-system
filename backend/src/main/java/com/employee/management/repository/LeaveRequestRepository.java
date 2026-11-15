package com.employee.management.repository;
import com.employee.management.entity.LeaveRequest; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest,Long> {
 List<LeaveRequest> findByEmployee_IdOrderByAppliedAtDesc(Long employeeId); List<LeaveRequest> findAllByOrderByAppliedAtDesc();
 long countByStatus(LeaveRequest.Status status);
}
