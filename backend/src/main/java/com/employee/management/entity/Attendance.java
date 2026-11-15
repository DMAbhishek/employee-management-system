package com.employee.management.entity;

import jakarta.persistence.*; import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.math.BigDecimal; import java.time.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
@Entity @Table(name="attendance", uniqueConstraints=@UniqueConstraint(columnNames={"employee_id","attendance_date"}))
@Getter @Setter @NoArgsConstructor
public class Attendance {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @JsonIgnore @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="employee_id",nullable=false) private Employee employee;
 @Column(name="attendance_date",nullable=false) private LocalDate attendanceDate;
 @Column(name="check_in_time") private LocalDateTime checkInTime; @Column(name="check_out_time") private LocalDateTime checkOutTime;
 @Column(name="working_hours") private BigDecimal workingHours;
 @Enumerated(EnumType.STRING) private Status status=Status.PRESENT; private String remarks;
 public enum Status { PRESENT, ABSENT, HALF_DAY, ON_LEAVE }
 @JsonProperty("employeeId") public Long getEmployeeId(){return employee==null?null:employee.getId();}
}
