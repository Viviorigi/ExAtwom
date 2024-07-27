package com.train.democrud.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
public class ProductResponse {
    private Long id;
    @JsonProperty("prod_code")
    private String prodCode;
    @JsonProperty("prod_nm")
    private String prodName;
    @JsonProperty("prod_price")
    private double prodPrice;
    private String description;
    private LocalDateTime regtDt;
    private LocalDateTime updDt;
    private Long cate_id;
    private String cateName;
}

