package com.train.democrud.Model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prod_code", nullable = false, unique = true)
    private String prodCode;

    @Column(name = "prod_nm", nullable = false)
    private String prodName;

    @Column(name = "prod_price", nullable = false)
    private Float prodPrice;

    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @Column(name = "regt_dt", nullable = false, updatable = false)
    private LocalDateTime regtDt;

    @Column(name = "upd_dt")
    private LocalDateTime updDt;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_id")
    @JsonIgnore
    private Category category;

}
