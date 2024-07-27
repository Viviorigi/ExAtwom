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

import com.train.democrud.Model.Category;
import com.train.democrud.dtos.response.CategoryListResponse;
import com.train.democrud.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;

	@GetMapping
    public ResponseEntity<CategoryListResponse> getAllCategories(
            @RequestParam(defaultValue = "") String keySearch,
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("updDt").descending());
        Page<Category> categoryPage = categoryService.getAllCategories(keySearch, pageRequest);
        int totalPages = categoryPage.getTotalPages();
        List<Category> categories = categoryPage.getContent();
        List<Category> allMatchingCategories = categoryService.findAllByNameContaining(keySearch);
        int totalCategories = allMatchingCategories.size();
        CategoryListResponse response = CategoryListResponse.builder()
                .categories(categories)
                .totalPages(totalPages)
                .totalCategories(totalCategories)
                .build();
        return ResponseEntity.ok(response);
    }
	@GetMapping("/{id}")
	public Category findById(@PathVariable Long id) throws Exception {
		return categoryService.findById(id);
	}

	@PostMapping
	public Category create(@RequestBody Category category) {
		return categoryService.save(category);
	}

	@PutMapping("/{id}")
	public Category update(@PathVariable Long id, @RequestBody Category category) {
		category.setId(id);
		return categoryService.save(category);
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		categoryService.deleteById(id);
	}
	
}
