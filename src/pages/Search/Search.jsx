
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { http } from "../../services/api";
import { getProductApi } from "../../redux/productSlice";
import ProductCard from "../../components/ProductCard";

export default function Search() {
  const dispatch = useDispatch();

  const { arrProduct, loading, error } = useSelector(
  (state) => state.productReducer
);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    if (arrProduct.length === 0) {
      dispatch(getProductApi());
    }
  }, [dispatch, arrProduct.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("/Product");
        const products = response.data?.content || [];

        const categoryMap = new Map();

        products.forEach((product) => {
          (product.categories || []).forEach((category) => {
            if (category.id != null) {
              categoryMap.set(String(category.id), category);
            }
          });
        });

        setCategories(Array.from(categoryMap.values()));
      } catch (err) {
        console.error("Loi lay Category:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (value) => {
    setCategoryId(value);
    setCategoryError("");

    if (value === "all") {
      return;
    }

    try {
      setCategoryLoading(true);

      const response = await http.get(
        "/Product/getProductByCategory",
        {
          params: { categoryId: value },
        }
      );

      const data = response.data?.content;

      if (!Array.isArray(data)) {
        throw new Error("API khong tra ve danh sach san pham hop le.");
      }

      setCategoryProducts(data);
    } catch (err) {
      console.error("Loi loc Category:", err);
      setCategoryError("Khong the loc san pham theo danh muc.");
      setCategoryProducts(null);
    } finally {
      setCategoryLoading(false);
    }
  };

  const [categoryProducts, setCategoryProducts] = useState(null);

  const sourceProducts = categoryProducts ?? arrProduct;

  const filteredProducts = useMemo(() => {
    const result = sourceProducts.filter((product) =>
      (product.name || "")
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
    );

    return _.orderBy(
      result,
      [(product) => Number(product.price) || 0],
      [sortOrder]
    );
  }, [sourceProducts, keyword, sortOrder]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Tìm kiếm sản phẩm</h2>

      {/* Tim kiem theo ten */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên giày cần tìm..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      {/* Category va sap xep gia */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Danh mục sản phẩm</label>

          <select
            className="form-select"
            value={categoryId}
            onChange={(event) => handleCategoryChange(event.target.value)}
          >
            <option value="all">Tất cả danh mục</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category || category.title || category.id}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Sắp xếp theo giá</label>

          <select
            className="form-select"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      {/* Trang thai tai du lieu */}
      {(loading || categoryLoading) && (
        <p>Đang tải sản phẩm...</p>
      )}

      {!categoryLoading && error && arrProduct.length === 0 && (
        <p className="text-danger">{String(error)}</p>
      )}

      {categoryError && (
        <p className="text-danger">{categoryError}</p>
      )}

      {/* Danh sach san pham */}
      {!loading &&
        !categoryLoading &&
        !categoryError &&
        filteredProducts.length === 0 && (
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        )}

      {!loading && !categoryLoading && !categoryError &&
        filteredProducts.length > 0 && (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
