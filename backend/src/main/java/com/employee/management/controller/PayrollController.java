package com.employee.management.controller;
import com.employee.management.dto.PayrollRequest; import com.employee.management.entity.PayrollRecord; import com.employee.management.service.PayrollService; import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/payroll") public class PayrollController {
 private final PayrollService service; public PayrollController(PayrollService s){service=s;}
 @PostMapping("/generate") public PayrollRecord generate(@RequestBody PayrollRequest r,Authentication a){return service.generate(r,a.getName());}
 @GetMapping public List<PayrollRecord> all(@RequestParam(required=false) Long employeeId){return service.all(employeeId);}
 @GetMapping("/employee/{id}") public List<PayrollRecord> employee(@PathVariable Long id){return service.all(id);}
 @GetMapping("/{id}/payslip") public PayrollRecord payslip(@PathVariable Long id){return service.all(null).stream().filter(p->p.getId().equals(id)).findFirst().orElseThrow();}
}
