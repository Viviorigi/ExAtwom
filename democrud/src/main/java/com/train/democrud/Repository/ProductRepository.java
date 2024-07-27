package com.train.democrud.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.train.democrud.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	  @Query("SELECT p FROM Product p WHERE "
		         + "(:categoryId IS NULL OR p.category.id = :categoryId) AND "
		         + "(:prodName IS NULL OR p.prodName LIKE %:prodName%)")
	Page<Product> findByCategoryIdAndProdNameContaining(Long categoryId, String prodName, Pageable pageable);
	  @Query("SELECT p FROM Product p WHERE "
		         + "(:categoryId IS NULL OR p.category.id = :categoryId) AND "
		         + "(:prodName IS NULL OR p.prodName LIKE %:prodName%)")
	List<Product> findByCategoryIdAndProdName(Long categoryId, String prodName);
}
