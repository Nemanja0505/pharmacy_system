package com.isa.pharmacies_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.isa.pharmacies_system.domain.user.Supplier;

public interface ISupplierRepository extends JpaRepository<Supplier, Long> {

}
