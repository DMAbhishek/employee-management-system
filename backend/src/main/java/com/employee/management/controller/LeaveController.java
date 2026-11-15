package com.employee.management.controller;
import com.employee.management.dto.LeaveRequestDto; import com.employee.management.entity.LeaveRequest; import com.employee.management.service.LeaveService; import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import java.util.*;
@RestController @RequestMapping("/api/leaves") public class LeaveController {
 private final LeaveService service; public LeaveController(LeaveService s){service=s;}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public LeaveRequest create(@RequestBody LeaveRequestDto d,Authentication a){return a.getAuthorities().stream().anyMatch(x->x.getAuthority().equals("ROLE_EMPLOYEE"))?service.createForUser(d,a.getName()):service.create(d);}
 @GetMapping public List<LeaveRequest> all(@RequestParam(required=false) Long employeeId){return service.all(employeeId);}
 @GetMapping("/my") public List<LeaveRequest> mine(Authentication a){return service.allForUser(a.getName());}
 @GetMapping("/{id}") public LeaveRequest get(@PathVariable Long id){return service.all(null).stream().filter(x->x.getId().equals(id)).findFirst().orElseThrow();}
 private void requireReviewer(Authentication a){if(a.getAuthorities().stream().noneMatch(x->x.getAuthority().equals("ROLE_ADMIN")||x.getAuthority().equals("ROLE_HR")))throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Only Admin or HR can review leave requests");}
 @PutMapping("/{id}/approve") public LeaveRequest approve(@PathVariable Long id,@RequestBody(required=false) LeaveRequestDto d,Authentication a){requireReviewer(a);return service.review(id,true,d==null?null:d.reviewRemarks(),a.getName());}
 @PutMapping("/{id}/reject") public LeaveRequest reject(@PathVariable Long id,@RequestBody(required=false) LeaveRequestDto d,Authentication a){requireReviewer(a);return service.review(id,false,d==null?null:d.reviewRemarks(),a.getName());}
 @GetMapping("/balance/{id}") public Map<String,Integer> balance(@PathVariable Long id){return Map.of("casual",12,"sick",10,"earned",15);}
}
