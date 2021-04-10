package com.isa.pharmacies_system.controller;

import com.isa.pharmacies_system.DTO.UserPasswordDTO;
import com.isa.pharmacies_system.DTO.UserPersonalInfoDTO;
import com.isa.pharmacies_system.converter.UserConverter;
import com.isa.pharmacies_system.domain.user.Patient;
import com.isa.pharmacies_system.service.iService.IPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/patient", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {


    private IPatientService patientService;
    private UserConverter userConverter;

    @Autowired
    public PatientController(IPatientService patientService) {
        this.patientService = patientService;
        this.userConverter = new UserConverter();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id){
        Patient patient = patientService.findOne(id);
        if(patient == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    public ResponseEntity<List<Patient>> getAllPatient(){
        return new ResponseEntity<>(patientService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}/profileInfo")
    public ResponseEntity<UserPersonalInfoDTO> getPatientProfileInfo(@PathVariable Long id){
        try{
            Patient patient = patientService.findOne(id);
            return new ResponseEntity<>(userConverter.convertPatientPersonalInfoToDTO(patient),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value ="/update", consumes = "application/json")
    public ResponseEntity<Boolean> updatePatientProfileInfo(@RequestBody UserPersonalInfoDTO userPersonalInfoDTO){
        try{
            Patient patient = patientService.findOne(userPersonalInfoDTO.getId());
            patientService.savePatient(userConverter.convertDTOToPatientPersonalInfo(userPersonalInfoDTO,patient));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/changePassword",consumes = "application/json")
    public ResponseEntity<Boolean> changePassword(@RequestBody UserPasswordDTO userPasswordDTO){

        try {
            if(patientService.changePassword(userPasswordDTO)){
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



}
