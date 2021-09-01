package com.isa.pharmacies_system.domain.medicine;



import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.isa.pharmacies_system.domain.rating.MedicineRating;

import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
@Table(name="medicine")
public class Medicine extends MedicineInfo {

	@JsonManagedReference
	@OneToMany(mappedBy = "medicineWithPrices", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<MedicinePrice> medicinePrices = new HashSet<MedicinePrice>();

	@JsonManagedReference
	@OneToMany(mappedBy = "medicineItem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Item> items = new HashSet<Item>();

	@JsonManagedReference
	@OneToMany(mappedBy = "reservedMedicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<MedicineReservation> medicineReservations= new HashSet<>();
	
	@Column(name="medicineAverageRating", unique=false, nullable=false)
	private double medicineAverageRating;
	
	@Column(name="medicinePoints", unique=false, nullable=false)
	private long medicinePoints;

	@JsonManagedReference
	@OneToMany(mappedBy = "medicineForRating", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<MedicineRating> medicineRatings = new HashSet<MedicineRating>();
	
	
	public Medicine()
	{
		
	}

	public Medicine(Set<MedicinePrice> medicinePrices, Set<Item> items, Set<MedicineReservation> medicineReservations,
			double medicineAverageRating, Set<MedicineRating> medicineRatings, long medicinePoints) {
		super();
		this.medicinePrices = medicinePrices;
		this.items = items;
		this.medicineReservations = medicineReservations;
		this.medicineAverageRating = medicineAverageRating;
		this.medicineRatings = medicineRatings;
		this.medicinePoints = medicinePoints;
	}

	public Set<MedicinePrice> getMedicinePrices() {
		return medicinePrices;
	}

	public void setMedicinePrices(Set<MedicinePrice> medicinePrices) {
		this.medicinePrices = medicinePrices;
	}

	public Set<Item> getItems() {
		return items;
	}

	public void setItems(Set<Item> items) {
		this.items = items;
	}

	public Set<MedicineReservation> getMedicineReservations() {
		return medicineReservations;
	}

	public void setMedicineReservations(Set<MedicineReservation> medicineReservations) {
		this.medicineReservations = medicineReservations;
	}

	public double getMedicineAverageRating() {
		return medicineAverageRating;
	}

	public void setMedicineAverageRating(double medicineAverageRating) {
		this.medicineAverageRating = medicineAverageRating;
	}

	public Set<MedicineRating> getMedicineRatings() {
		return medicineRatings;
	}

	public void setMedicineRatings(Set<MedicineRating> medicineRatings) {
		this.medicineRatings = medicineRatings;
	}

	public long getMedicinePoints() {
		return medicinePoints;
	}

	public void setMedicinePoints(long medicinePoints) {
		this.medicinePoints = medicinePoints;
	}
	
}
