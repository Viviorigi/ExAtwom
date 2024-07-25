package com.train.democrud.dtos.response;
import lombok.Builder;
import lombok.Data;

import java.util.List;

import com.train.democrud.Model.Product;

@Data
@Builder
public class ProductListResponse {
    private List<ProductResponse> products;
    private int totalPages;
    private int totalProducts;
}
