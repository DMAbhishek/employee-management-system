package com.employee.management.service;
import com.employee.management.dto.EmployeeRequest; import com.employee.management.entity.*; import com.employee.management.repository.*;
import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.util.*;
@Service public class EmployeeService {
 private final EmployeeRepository employees; private final DepartmentRepository departments; private final UserRepository users;
 public EmployeeService(EmployeeRepository e,DepartmentRepository d,UserRepository u){employees=e;departments=d;users=u;}
 public List<Employee> all(String search){return search==null||search.isBlank()?employees.findAll():employees.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(search,search);}
 public Employee get(Long id){return employees.findById(id).orElseThrow(()->new NoSuchElementException("Employee not found"));}
 @Transactional public Employee save(EmployeeRequest r,Long id){Employee e=id==null?new Employee():get(id); e.setEmployeeCode(r.employeeCode());e.setFirstName(r.firstName());e.setLastName(r.lastName());e.setEmail(r.email());e.setPhone(r.phone());e.setGender(r.gender());e.setDateOfBirth(r.dateOfBirth());e.setAddress(r.address());e.setDesignation(r.designation());e.setBasicSalary(r.basicSalary()==null?java.math.BigDecimal.ZERO:r.basicSalary());e.setJoiningDate(r.joiningDate());if(r.employmentStatus()!=null)e.setEmploymentStatus(Employee.EmploymentStatus.valueOf(r.employmentStatus()));if(r.departmentId()!=null)e.setDepartment(departments.findById(r.departmentId()).orElseThrow(()->new NoSuchElementException("Department not found")));if(r.userId()!=null)e.setUser(users.findById(r.userId()).orElseThrow(()->new NoSuchElementException("User not found")));return employees.save(e);}
 public void delete(Long id){employees.delete(get(id));}
}
