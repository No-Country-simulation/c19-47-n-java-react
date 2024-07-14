package com.Healthtech.Backend;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "user")
public class MedicoEntity implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id_doctor;
    @Column(name = "firstName", nullable = false, length = 150)
    private String firstName;
    @Column(name = "lastName", nullable = false, length = 150)
    private String lastName;
    @Temporal(TemporalType.DATE)
    @Column(name = "BirthDate", length = 20)
    private Date birthDate;
    @Column(name = "Documentation", nullable = false, length = 9)
    private String documentation;
    @Column(name = "Gender", length = 20)
    private String gender;
    @Column(name = "Especialidad", length = 50)
    private String especialidad;
    private String matricula;
    //Estado del registro true == borrado - false == vigente
    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;
}