package com.train.democrud.dtos.response;

import java.util.List;

import com.train.democrud.Model.Category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryListResponse {
	 private List<Category> categories;
	 private int totalPages;
	 private int totalCategories;
}
