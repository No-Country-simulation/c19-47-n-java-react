package com.Healthtech.Backend.model;
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
public class PacientEntity implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id_paciente;
    @Column(name = "Name", length = 150)
    private String firstName;
    @Column(name = "lastName", length = 150)
    private String lastName;
    @Temporal(TemporalType.DATE)
    @Column(name = "BirthDate", length = 20)
    private Date birthDate;
    @Column(name = "Documentation", length = 9)
    private String documentation;
    @Column(name = "Email", length = 50)
    private String email;
    @Column(name = "Gender", length = 20)
    private String gender;
    @Column(name = "Medical_Insurance", length = 50)
    private String medicalInsurance;
    //Estado del registro false == borrado - true == vigente
    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;
}
