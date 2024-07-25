package com.train.democrud.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.train.democrud.Model.Category;

public interface CategoryService {
	List<Category> findAll();
    Category findById(Long id) throws Exception;
    Category save(Category category);
    void deleteById(Long id);
    Page<Category> getAllCategories(String keySearch, PageRequest pageRequest);
}
