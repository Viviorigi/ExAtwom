package com.train.democrud.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.train.democrud.Model.Category;
import com.train.democrud.Model.Product;
import com.train.democrud.Repository.CategoryRepository;
import com.train.democrud.Repository.ProductRepository;
import com.train.democrud.dtos.ProductDto;
import com.train.democrud.dtos.response.ProductResponse;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public List<Product> findAll() {
		 return productRepository.findAll();
	}

	@Override
	public Product save(ProductDto productdto) throws Exception {
		Category cate = categoryRepository.findById(productdto.getCategoryId()).get(); 
		Product product = Product.builder()
				.prodCode(productdto.getProdCode())
				.prodName(productdto.getProdName())
				.prodPrice(productdto.getProdPrice())
				.description(productdto.getDescription())
				.regtDt(LocalDateTime.now())
				.updDt(LocalDateTime.now())
				.category(cate)
				.build();
		return productRepository.save(product);
	}

	@Override
	public void deleteById(Long id) {
		 productRepository.deleteById(id);
	}

	@Override
	public Product findById(Long id) throws Exception {
		 return productRepository.findById(id).orElseThrow(()-> new Exception("id not found"));
	}
	
	@Override
    public Product update(Long id,ProductDto productDto) throws Exception{
		 Optional<Product> existingProductOpt = productRepository.findById(id);
	        if (existingProductOpt.isPresent()) {
	            Product existingProduct = existingProductOpt.get();
	            Category cate = categoryRepository.findById(productDto.getCategoryId())
	                    .orElseThrow(() -> new Exception("Category not found with id " + productDto.getCategoryId()));

	            existingProduct.setProdCode(productDto.getProdCode());
	            existingProduct.setProdName(productDto.getProdName());
	            existingProduct.setProdPrice(productDto.getProdPrice());
	            existingProduct.setDescription(productDto.getDescription());
	            existingProduct.setUpdDt(LocalDateTime.now());
	            existingProduct.setCategory(cate);
	            return productRepository.save(existingProduct);
	        } else {
	            throw new Exception("Product not found with id " + id);
	        }
    }
	
	@Override
	public Page<ProductResponse> getProductsByCategoryIdAndName(Long categoryId, String prodName, PageRequest pageRequest) {
		 Page<Product> products = productRepository.findByCategoryIdAndProdNameContaining(categoryId, prodName, pageRequest);
	        return products.map(product -> ProductResponse.builder()
	                .id(product.getId())
	                .prodCode(product.getProdCode())
	                .prodName(product.getProdName())
	                .prodPrice(product.getProdPrice())
	                .description(product.getDescription())
	                .regtDt(product.getRegtDt())
	                .updDt(product.getUpdDt())
	                .cate_id(product.getCategory().getId())
	                .cateName(product.getCategory().getName())
	                .build());
    }

	@Override
	public List<Product> findByCategoryIdAndProdName(Long categoryId, String prodName) {
		return productRepository.findByCategoryIdAndProdName(categoryId, prodName);
	}
}
