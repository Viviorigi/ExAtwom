package com.train.democrud.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.train.democrud.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Page<Category> findByNameContaining(String name, Pageable pageable);
}
