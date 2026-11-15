package com.employee.management.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity @Table(name = "departments") @Getter @Setter @NoArgsConstructor
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "dept_name", nullable = false, unique = true) private String name;
    private String description;
    @Column(name = "created_at") private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at") private LocalDateTime updatedAt = LocalDateTime.now();
    @Transient private long employeeCount;
    @JsonProperty("deptName") public String getDeptName() { return name; }
}
