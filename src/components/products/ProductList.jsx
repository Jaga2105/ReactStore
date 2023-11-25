import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const sortOptions = [
  { name: "Newest First", sort: "id", order: "asc", current: false },
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price:Low to High", sort: "price", order: "asc", current: false },
  { name: "Price:High to Low", sort: "price", order: "desc", current: false },
];

const ProductList = () => {

  const [products, setProducts] = useState([]);
  // const [sortOption, setSortOption] = useState(sortOptions[0].name);
  const fetchAllProducts = async () => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    setProducts(data);
  };
  const fetchProductsByFilter = async (sort) => {
    let queryString = "";
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  const handleSort = (sort) => {
    fetchProductsByFilter(sort);
    // console.log(sort)
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    // <div>
    <div className="flex px-6 md:px-20 my-6">
      <ProductFilter />
      <div className="w-full lg:w-3/4">
        <ProductSort handleSort={handleSort} />
        {/* sortOptions={sortOptions} showSortOption={showSortOption} setShowSortOption={setShowSortOption} sortOption={sortOption} setSortOption={setSortOption}/> */}
        <div className="grid justify-items-center xsm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {/* // className="flex flex-wrap justify-evenly items-center" */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};

const ProductCard = ({ product }) => {
  const customizedTitle = (title) => {
    let customizedText = "";
    if (title.length < 16) customizedText = title;
    else customizedText = `${title.substr(0, 16)}...`;
    return customizedText;
  };
  const customizedDescription = (desc) => {
    let customizedText = "";
    if (desc.length < 40) customizedText = desc;
    else customizedText = `${desc.substr(0, 35)}...`;
    return customizedText;
  };
  const customizedRating = (rating) => {
    return rating.toFixed(1);
  };
  const getSellingPrice = (markedPrice, discountPercentage) => {
    return (markedPrice * ((100 - parseInt(discountPercentage)) / 100)).toFixed(
      0
    );
  };
  const getDiscountPercentage = (discount) => {
    return parseInt(discount);
  };
  const title = customizedTitle(product.title);
  const description = customizedDescription(product.description);
  const rating = customizedRating(product.rating);
  const sellingPrice = getSellingPrice(
    product.price,
    product.discountPercentage
  );
  const discountPercentage = getDiscountPercentage(product.discountPercentage);
  return (
    <div className="cursor-pointer h-[360px] xsm:h-[400px] sm:h-[360px] md:h-[400px] w-[230px] xsm:w-[200px] sm:w-[230px] md:w-[200px] xl:w-[220px] mb-6 p-3 rounded-sm shadow-sm hover:shadow-2xl ">
      <img src={product.thumbnail} alt="thumbnail" className="h-[45%] w-full" />
      <div className="my-4 text-blue-600 text-lg font-bold">{title}</div>
      <div className="mb-6">{description}</div>
      <div className="text-right">
        <span className="line-through text-gray-500 mr-1">
          {" "}
          &#8377; {product.price}
        </span>{" "}
        <span className="text-sm text-green-600 font-bold">
          {discountPercentage}% off
        </span>
      </div>
      <div className="flex justify-between">
        <div
          className={`${
            rating >= 4 ? "bg-green-600" : "bg-yellow-500"
          } flex h-6 items-center justify-center px-2 rounded-sm text-white w-12`}
        >
          <span className="text-sm">{rating}</span>{" "}
          <span className="text-lg ml-1">&#9733;</span>
        </div>
        <div className="font-semibold">&#8377;{sellingPrice}</div>
      </div>
    </div>
  );
};

const ProductSort = ({ handleSort }) => {
  // {sortOptions, sortOption, setSortOption, showSortOption, setShowSortOption}) => {

  // const sortOptions = [
  //   "Newest First",
  //   "Price Low to High",
  //   "Price High to Low",
  // ];
  const [showSortOption, setShowSortOption] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptions[0].name);

  // const handleSort = (option) => {
  //   if (option !== sortOption) {
  //     setSortOption(option);
  //   }
  //   setShowSortOption(false);
  // };
  const handleShowSortOption = () => {
    console.log("testing");
    setShowSortOption((prev) => !prev);
  };
  const handleSortOption = (option) => {
    setSortOption(option.name);
    const sort = { _sort: option.sort, _order: option.order };
    handleSort(sort);
  };
  // const handleSort = (option) => {
  //   setSortOption(option);p
  //   handleShowSortOption();
  // };

  // useEffect(() => {
  //   handleShowSortOption()
  // }, [sortOption]);
  console.log(showSortOption);

  return (
    <div className="flex justify-between items-center bg-white my-4 px-4 py-2 shadow-md md:mx-6 lg:mx-4 xl:mx-4 rounded-md">
      {showSortOption && (
        <div
          className="fixed h-[100vh] w-[100vw] top-0 left-0"
          onClick={handleShowSortOption}
        ></div>
      )}
      <div>Product Filter</div>
      <div className="flex justify-center items-center">
        <span>Sort by</span>
        <div className="ml-4" onClick={handleShowSortOption}>
          <div className="flex justify-between items-center cursor-pointer px-6 py-2 rounded-md border-2 w-[200px]">
            <span className="mr-2">{sortOption}</span>
            <FaChevronDown style={{ color: "gray" }} />
          </div>
          {showSortOption && (
            <ul className="absolute border-2 mt-1 px-2 py-2 rounded-md  shadow-lg bg-white w-[200px] z-100">
              {sortOptions.map((option) => (
                <li
                  key={option.name}
                  className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleSortOption(option)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductFilter = () => {
  const [filterContents, setFilterContents] = useState([]);
  const [openedAccordionIdx, setOpenedAccordionIdx] = useState(0);

  const getFilterContent = (newContent) => {
    let newFilterContentArr = filterContents;
    newFilterContentArr.push(newContent);
    setFilterContents(newFilterContentArr);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    getFilterContent({ title: "Categories", content: data });
  };
  const fetchBrands = async () => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    getFilterContent({ title: "Brands", content: data });
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);
  console.log(filterContents);
  return (
    <div className="hidden fixed w-1/4 lg:block my-4 mr-4 h-[calc(100vh-100px)] overflow-y-scroll">
      {filterContents.map((filterContent, index) => (
        <FilterAccordion
          key={filterContent.title}
          filterTitle={filterContent.title}
          filterContent={filterContent.content}
          index={index}
          openedAccordionIdx={openedAccordionIdx}
          setOpenedAccordionIdx={setOpenedAccordionIdx}
        />
      ))}
    </div>
  );
};

const FilterAccordion = ({
  filterTitle,
  filterContent,
  index,
  openedAccordionIdx,
  setOpenedAccordionIdx
}) => {
  // const [openAccordionIdx, setOpenAccordionIdx] = useState(0)
  console.log(filterContent)
  // const {filterTitle, Content} = filterContent;
  return (
    
    <>
      <div
        className={`flex justify-between items-center py-4 px-8 border-2 cursor-pointer ${
          openedAccordionIdx === index ? "rounded-t-md" : "rounded-md"
        }`}
        onClick={() => setOpenedAccordionIdx(index)}
      >
        <div className="text-xl ">{filterTitle}</div>
        {openedAccordionIdx === index ? (
          <FaChevronUp style={{ color: "gray" }} />
        ) : (
          <FaChevronDown style={{ color: "gray" }} />
        )}
      </div>
      {openedAccordionIdx === index && (
        <div className="bg-white px-8 rounded-b-md border-x-2 border-b-2 flex flex-col pt-2">
          {filterContent.map((content) => (
            <div
              key={content.label}
              className="flex items-center pb-2 xl:text-lg"
            >
              <input
                type="checkbox"
                name={content}
                className="mr-2 mt-1 cursor-pointer"
              />
              <label htmlFor="category">{content.label}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
