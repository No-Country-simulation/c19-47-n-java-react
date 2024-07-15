package com.Healthtech.Backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Doctor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DoctorEntity implements Serializable{
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id_doctor;
    @Column(name = "firstName", length = 150)
    private String firstName;
    @Column(name = "lastName", length = 150)
    private String lastName;
    @Temporal(TemporalType.DATE)
    @Column(name = "BirthDate", length = 20)
    private Date birthDate;
    @Column(name = "Documentation", length = 9)
    private String documentation;
    @Column(name = "Gender", length = 20)
    private String gender;
    @Column(name = "Specialty", length = 50)
    private String specialty;
    @Column(name = "License", length = 20)
    private String license;
}