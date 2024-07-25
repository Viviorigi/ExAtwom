package com.train.democrud.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.train.democrud.Model.Product;
import com.train.democrud.dtos.ProductDto;
import com.train.democrud.dtos.response.ProductResponse;

public interface ProductService {
	List<Product> findAll();
    Product save(ProductDto product) throws Exception;
    void deleteById(Long id);
    Product findById(Long id) throws Exception;
    Product update(Long id, ProductDto product) throws Exception;
    Page<ProductResponse> getProductsByCategoryIdAndName(Long categoryId, String prodName, PageRequest pageRequest);
}
