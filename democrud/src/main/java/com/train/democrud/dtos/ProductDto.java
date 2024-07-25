package com.train.democrud.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
	@JsonProperty("prod_code")
    private String prodCode;

	@JsonProperty("prod_nm")
    private String prodName;

	@JsonProperty("prod_price")
    private Float prodPrice;

    private String description;
    
    @JsonProperty("cate_id")
    private Long categoryId;

}
