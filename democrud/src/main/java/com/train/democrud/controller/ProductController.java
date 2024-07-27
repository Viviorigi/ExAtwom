package com.train.democrud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.train.democrud.Model.Product;
import com.train.democrud.dtos.ProductDto;
import com.train.democrud.dtos.response.ProductListResponse;
import com.train.democrud.dtos.response.ProductResponse;
import com.train.democrud.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping
	public List<Product> getAllProducts() {
		return productService.findAll();
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) throws Exception {
		return productService.findById(id);
	}

	@PostMapping
	public Product createProduct(@RequestBody ProductDto product) throws Exception {
		return productService.save(product);
	}

	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody ProductDto product) throws Exception {
		return productService.update(id, product);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteById(id);
	}

	@GetMapping("/lstProd")
	public ResponseEntity<ProductListResponse> getProductsByCategory(
			@RequestParam(name = "cate_id", required = false) Long categoryId,
            @RequestParam(defaultValue = "") String keySearch,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
		PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("updDt").descending());
        Page<ProductResponse> productPage = productService.getProductsByCategoryIdAndName(categoryId, keySearch, pageRequest);
        int totalPages = productPage.getTotalPages();
        List<ProductResponse> products = productPage.getContent();
        List<Product> pros = productService.findByCategoryIdAndProdName(categoryId,keySearch);
        int totalProduct = pros.size();
        ProductListResponse response = ProductListResponse.builder()
                .products(products)
                .totalPages(totalPages)
                .totalProducts(totalProduct)
                .build();
        return ResponseEntity.ok(response);
	}
}
