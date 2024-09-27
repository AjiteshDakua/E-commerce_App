import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/Productitem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, SetFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    SetFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case `low-high`:
        SetFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case `high-low`:
        SetFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 "
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} `}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="md-3 text-sm font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Men"}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Women"}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Kids"}
              />
              kids
            </p>
          </div>
        </div>
        {/* Sub category */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="md-3 text-sm font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Topwear"}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"WinterWear"}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl md-4 ">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2  "
          >
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to High </option>
            <option value="high-low">Sort by:High to low </option>
          </select>
        </div>
        {/* Map productes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;