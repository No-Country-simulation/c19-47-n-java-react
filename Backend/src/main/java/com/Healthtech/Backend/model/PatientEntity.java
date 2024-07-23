package com.Healthtech.Backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "Pacient")
public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaciente;

    private String firstName;
    @Column(name = "lastName", length = 150)
    private String lastName;
    @Temporal(TemporalType.DATE)
    @Column(name = "BirthDate", length = 20)
    private LocalDate birthDate;
    @Column(name = "Documentation", length = 9)//,unique = true
    private String documentation;
    @Column(name = "Email", length = 50)
    private String email;
    @Column(name = "Gender", length = 20)
    private String gender;
    @Column(name = "Medical_Insurance", length = 50)
    private String medicalInsurance;
    //Estado del registro false == borrado - true == vigente
    @Column(nullable = false)
    private boolean state = true;


}