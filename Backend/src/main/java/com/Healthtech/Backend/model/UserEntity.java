package com.Healthtech.Backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "user")
public class UserEntity implements Serializable{
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id_user;
    @Column(name = "Email", length = 50)
    private String email;
    @Column(name = "Password", length = 50)
    private String password;
    @Column(name = "Role")
    private String role;
    //Estado del registro true == borrado - false == vigente
    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;
}
