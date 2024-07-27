package com.train.democrud.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.train.democrud.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	Page<Category> findByNameContaining(@Param("keySearch") String keySearch, Pageable pageable);
	
	List<Category> findAllByNameContaining(@Param("keySearch") String keySearch);
}	
