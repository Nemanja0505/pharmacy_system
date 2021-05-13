package com.isa.pharmacies_system.converter;

import com.isa.pharmacies_system.DTO.PharmacistAppointmentDTO;
import com.isa.pharmacies_system.domain.schedule.PharmacistAppointment;

import java.util.ArrayList;
import java.util.List;

public class PharmacistAppointmentConverter {

    private UserConverter userConverter;
    private PharmacyConverter pharmacyConverter;

    public PharmacistAppointmentConverter() {
        this.userConverter = new UserConverter();
        this.pharmacyConverter = new PharmacyConverter();
    }

    public PharmacistAppointmentDTO convertPharmacistAppointmentToDTO(PharmacistAppointment pharmacistAppointment){
        PharmacistAppointmentDTO pharmacistAppointmentDTO = new PharmacistAppointmentDTO();
        pharmacistAppointmentDTO.setId(pharmacistAppointment.getId());
        pharmacistAppointmentDTO.setAppointmentPrice(pharmacistAppointment.getAppointmentPrice());
        pharmacistAppointmentDTO.setPharmacistAppointmentStartTime(pharmacistAppointment.getPharmacistAppointmentStartTime());
        pharmacistAppointmentDTO.setPharmacistAppointmentDuration(pharmacistAppointment.getPharmacistAppointmentDuration());
        pharmacistAppointmentDTO.setPharmacistForAppointment(userConverter.convertPharmacistPersonalInfoToDTO(pharmacistAppointment.getPharmacistForAppointment()));
        pharmacistAppointmentDTO.setPharmacyForDermatologistAppointment(pharmacyConverter.convertPharmacyToPharmacyDTO(pharmacistAppointment.getPharmacistForAppointment().getPharmacyForPharmacist()));

        pharmacistAppointmentDTO.setPharmacistAppointmentEndTime(pharmacistAppointment.getPharmacistAppointmentStartTime().plusMinutes(pharmacistAppointment.getPharmacistAppointmentDuration()));

        if(pharmacistAppointment.getPatientWithPharmacistAppointment() != null) {
            pharmacistAppointmentDTO.setPatientId(pharmacistAppointment.getPatientWithPharmacistAppointment().getId());
            pharmacistAppointmentDTO.setPatientFirstName(pharmacistAppointment.getPatientWithPharmacistAppointment().getFirstName());
            pharmacistAppointmentDTO.setPatientLastName(pharmacistAppointment.getPatientWithPharmacistAppointment().getLastName());
            pharmacistAppointmentDTO.setPatientEmail(pharmacistAppointment.getPatientWithPharmacistAppointment().getEmail());
            pharmacistAppointmentDTO.setPatientPhoneNumber(pharmacistAppointment.getPatientWithPharmacistAppointment().getPhoneNumber());
        }

        return pharmacistAppointmentDTO;

    }

    public List<PharmacistAppointmentDTO> convertPharmacistAppointmentsListToDTOS(List<PharmacistAppointment> pharmacistAppointments){
        List<PharmacistAppointmentDTO> pharmacistAppointmentDTOS = new ArrayList<>();
        for (PharmacistAppointment pharmacistAppointment: pharmacistAppointments) {
            pharmacistAppointmentDTOS.add(convertPharmacistAppointmentToDTO(pharmacistAppointment));
        }
        return pharmacistAppointmentDTOS;
    }
}
