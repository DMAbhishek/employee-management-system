package com.employee.management.repository;
import com.employee.management.entity.Employee; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
 Optional<Employee> findByEmail(String email); Optional<Employee> findByUser_Id(Long id); Optional<Employee> findByUser_Username(String username);
 List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String first,String last);
 long countByEmploymentStatus(Employee.EmploymentStatus status);
 long countByDepartmentId(Long departmentId);
}
