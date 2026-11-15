package com.employee.management.entity;
import jakarta.persistence.*; import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.time.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
@Entity @Table(name="leave_requests") @Getter @Setter @NoArgsConstructor
public class LeaveRequest {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @JsonIgnore @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="employee_id",nullable=false) private Employee employee;
 @Enumerated(EnumType.STRING) @Column(name="leave_type") private LeaveType leaveType;
 private LocalDate startDate; private LocalDate endDate; private Integer totalDays; private String reason;
 @Enumerated(EnumType.STRING) private Status status=Status.PENDING;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="reviewed_by") private User reviewedBy;
 private String reviewRemarks; private LocalDateTime reviewedAt; private LocalDateTime appliedAt=LocalDateTime.now();
 public enum LeaveType { CASUAL, SICK, EARNED } public enum Status { PENDING, APPROVED, REJECTED, CANCELLED }
 @JsonProperty("employeeId") public Long getEmployeeId(){return employee==null?null:employee.getId();}
}
