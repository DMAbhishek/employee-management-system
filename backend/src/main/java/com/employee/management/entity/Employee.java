package com.employee.management.entity;

import jakarta.persistence.*;
import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.math.BigDecimal; import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity @Table(name = "employees") @Getter @Setter @NoArgsConstructor
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name="employee_code", nullable=false, unique=true) private String employeeCode;
    @Column(name="first_name", nullable=false) private String firstName;
    @Column(name="last_name", nullable=false) private String lastName;
    @Column(nullable=false, unique=true) private String email;
    private String phone; private String gender; private LocalDate dateOfBirth; private String address;
    private String designation;
    @Column(name="basic_salary") private BigDecimal basicSalary = BigDecimal.ZERO;
    @Column(name="joining_date", nullable=false) private LocalDate joiningDate;
    @Enumerated(EnumType.STRING) @Column(name="employment_status") private EmploymentStatus employmentStatus = EmploymentStatus.ACTIVE;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="department_id") private Department department;
    @JsonIgnore @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id") private User user;
    public enum EmploymentStatus { ACTIVE, INACTIVE, ON_LEAVE, TERMINATED }
}
