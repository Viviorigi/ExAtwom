package com.train.democrud.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.train.democrud.Model.Category;
import com.train.democrud.Repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category findById(Long id) throws Exception {
		return categoryRepository.findById(id).orElseThrow(() -> new Exception("id not found"));
	}

	@Override
	public Category save(Category category) {
		if (category.getId() == null) {
			category.setRegtDt(LocalDateTime.now());
		} else {
			Category cate = categoryRepository.findById(category.getId()).orElse(null);
			category.setRegtDt(cate.getRegtDt());
		}
		category.setUpdDt(LocalDateTime.now());
		return categoryRepository.save(category);
	}

	@Override
	public void deleteById(Long id) {
		categoryRepository.deleteById(id);
	}

	@Override
	public Page<Category> getAllCategories(String keySearch, PageRequest pageRequest) {
		return categoryRepository.findByNameContaining(keySearch, pageRequest);
	}

	public List<Category> findAllByNameContaining(String keySearch) {
		return categoryRepository.findAllByNameContaining(keySearch);
	}

}
