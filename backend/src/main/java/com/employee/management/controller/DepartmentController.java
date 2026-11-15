package com.employee.management.controller;
import com.employee.management.dto.DepartmentRequest; import com.employee.management.entity.Department; import com.employee.management.repository.DepartmentRepository; import com.employee.management.repository.EmployeeRepository; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/departments")
public class DepartmentController {
 private final DepartmentRepository repo; private final EmployeeRepository employees; public DepartmentController(DepartmentRepository r, EmployeeRepository e){repo=r;employees=e;}
 private Department withCount(Department department){department.setEmployeeCount(employees.countByDepartmentId(department.getId()));return department;}
 @GetMapping public List<Department> all(){return repo.findAll().stream().map(this::withCount).toList();}
 @GetMapping("/{id}") public Department get(@PathVariable Long id){return withCount(repo.findById(id).orElseThrow());}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Department create(@RequestBody DepartmentRequest r){Department d=new Department();d.setName(r.name());d.setDescription(r.description());return repo.save(d);}
 @PutMapping("/{id}") public Department update(@PathVariable Long id,@RequestBody DepartmentRequest r){Department d=get(id);d.setName(r.name());d.setDescription(r.description());return repo.save(d);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){repo.delete(get(id));}
}
