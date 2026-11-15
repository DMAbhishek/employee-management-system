package com.employee.management.entity;
import jakarta.persistence.*; import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.math.BigDecimal; import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
@Entity @Table(name="payroll_records", uniqueConstraints=@UniqueConstraint(columnNames={"employee_id","payroll_month","payroll_year"}))
@Getter @Setter @NoArgsConstructor
public class PayrollRecord {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="employee_id",nullable=false) private Employee employee;
 @Column(name="payroll_month") private Integer payrollMonth; @Column(name="payroll_year") private Integer payrollYear;
 private BigDecimal basicSalary=BigDecimal.ZERO,totalAllowances=BigDecimal.ZERO,totalDeductions=BigDecimal.ZERO,netSalary=BigDecimal.ZERO;
 private Integer workingDays=0,presentDays=0,absentDays=0,leaveDays=0;
 @Enumerated(EnumType.STRING) @Column(name="payroll_status") private Status status=Status.DRAFT;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="generated_by") private User generatedBy;
 private LocalDateTime generatedAt=LocalDateTime.now();
 public enum Status { DRAFT, PROCESSED, PAID }
 @JsonProperty("employeeId") public Long getEmployeeId(){return employee==null?null:employee.getId();}
 @JsonProperty("month") public String getMonth(){return payrollYear+"-"+String.format("%02d",payrollMonth);}
 @JsonProperty("allowances") public BigDecimal getAllowances(){return totalAllowances;}
 @JsonProperty("deductions") public BigDecimal getDeductions(){return totalDeductions;}
}
