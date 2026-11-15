package com.employee.management.controller;
import com.employee.management.dto.EmployeeRequest; import com.employee.management.entity.Employee; import com.employee.management.service.EmployeeService; import com.employee.management.repository.EmployeeRepository; import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/employees")
public class EmployeeController {
 private final EmployeeService service; private final EmployeeRepository employees; public EmployeeController(EmployeeService s,EmployeeRepository e){service=s;employees=e;}
 @GetMapping public List<Employee> all(@RequestParam(required=false) String search){return service.all(search);}
 @GetMapping("/{id}") public Employee get(@PathVariable Long id){return service.get(id);}
 @GetMapping("/me") public Employee me(Authentication authentication){return employees.findByUser_Username(authentication.getName()).orElseThrow();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Employee create(@RequestBody EmployeeRequest r){return service.save(r,null);}
 @PutMapping("/{id}") public Employee update(@PathVariable Long id,@RequestBody EmployeeRequest r){return service.save(r,id);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
