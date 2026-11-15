package com.employee.management.repository;
import com.employee.management.entity.PayrollRecord; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface PayrollRecordRepository extends JpaRepository<PayrollRecord,Long> {
 List<PayrollRecord> findByEmployee_IdOrderByPayrollYearDescPayrollMonthDesc(Long employeeId);
 Optional<PayrollRecord> findByEmployee_IdAndPayrollMonthAndPayrollYear(Long employeeId,Integer month,Integer year);
}
