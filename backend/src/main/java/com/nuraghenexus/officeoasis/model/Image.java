package com.nuraghenexus.officeoasis.model;

import lombok.*;
import jakarta.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String filePath;

    @OneToOne
    private Anagraphic anagraphic;

    @ManyToOne
    private Product product;
}
