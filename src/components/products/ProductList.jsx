import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const sortOptions = [
  { name: "Newest First", sort: "id", order: "asc", current: false },
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price:Low to High", sort: "price", order: "asc", current: false },
  { name: "Price:High to Low", sort: "price", order: "desc", current: false },
];

const ProductList = () => {

  const [sort, setSort] = useState({})
  const [filter, setFilter] = useState({})
  const [products, setProducts] = useState([]);
  // const [filterSections, setFilterSections] = useState("")
  // const [sortOption, setSortOption] = useState(sortOptions[0].name);
  const fetchAllProducts = async () => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    setProducts(data);
  };
  // const fetchProductsByFilter = async (sort) => {
  //   let queryString = "";
  //   for (let key in sort) {
  //     queryString += `${key}=${sort[key]}&`;
  //   }
  //   const response = await fetch(
  //     "http://localhost:8080/products?" + queryString
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   setProducts(data);
  // };

  const fetchProductsByFilter = async (sort, filter) => {
    let queryString = "";
    // let queryString = {...filterSections}
    // For sorting
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    // for filter by filter sections
    for(let key in filter){
      const filterArr = filter[key]
      let filterText="";
      if(filterArr.length){
        const lastFilterText = filterArr[filterArr.length-1]
        // filterText+=`${lastFilterText},`
        queryString +=`${key}=${lastFilterText}&`
      }
      // queryString +=`${key}=${filterText}&`
    }
    console.log(queryString)
    // setFilterSections(queryString)
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };
  const handleSort = (sort) => {
    // fetchProductsByFilter(sort);
    // console.log(sort)
    setSort(sort)
  };
  const handleFilter = (e, filterSection, value) =>{
    let newFilter = {...filter}
    if(e.target.checked){
      if(filterSection in newFilter){
        newFilter[filterSection].push(value)
      }else{
        newFilter[filterSection] = [value]
      }
    }else{
      const idx = newFilter[filterSection].indexOf(value);
      newFilter[filterSection].splice(idx, 1)
    }
    setFilter(newFilter)
    
    
    // console.log(newFilter)
  }
  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(()=>{
    fetchProductsByFilter(sort,filter)
  },[sort,filter])
  console.log(filter)

  return (
    // <div>
    <div className="flex px-6 md:px-20 my-2">
      <ProductFilter handleFilter={handleFilter}/>
      <div className="w-full lg:w-3/4 xl:w-4/5 lg:ml-[280px] xl:ml-[320px]">
        <ProductSort handleSort={handleSort} />
        {/* sortOptions={sortOptions} showSortOption={showSortOption} setShowSortOption={setShowSortOption} sortOption={sortOption} setSortOption={setSortOption}/> */}
        <div className="grid justify-items-center xsm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {/* // className="flex flex-wrap justify-evenly items-center" */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination/>
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
    <div className="flex justify-between items-center bg-white my-4 px-4 py-2 shadow-md md:mx-6 lg:mx-4 xl:mx-[10px] rounded-md">
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

const ProductFilter = ({handleFilter}) => {
  const [filterContents, setFilterContents] = useState([]);
  const [openedAccordionIdx, setOpenedAccordionIdx] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([])
  const [filters, setFilters] = useState([]);

  const handleOpenedAccordionIdx = ( index ) =>{
    if(index === openedAccordionIdx){
      setOpenedAccordionIdx(-1)
    }else{
      setOpenedAccordionIdx(index)
    }
  }

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    setCategories(data)
  };
  const fetchBrands = async () => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    setBrands(data)
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);
  // console.log(filterContents);
  // const filters = [
  //   {
  //     name: "Category",
  //     option: categories
  //   },
  //   {
  //     name: "Brands",
  //     option: categories
  //   }
  // ]
  useEffect(()=>{
    setFilters(
      [
        {
          name: "Categories",
          section: "category",
          option: categories
        },
        {
          name: "Brands",
          section: "brand",
          option: brands
        }
      ]
    )
  }, [categories,brands])
  console.log(filters)
  return (
    <div className="hidden fixed w-1/4 xl:w-1/5 lg:block my-4 mr-4 h-[calc(100vh-124px)] rounded-t-md hover:overflow-y-scroll">
      {filters.map((filter, index) => (
        <FilterAccordion
          key={filter.name}
          filterContent={filter}
          // filterTitle={filter.name}
          // filterContent={filter.option}
          index={index}
          openedAccordionIdx={openedAccordionIdx}
          handleOpenedAccordionIdx={handleOpenedAccordionIdx}
          handleFilter={handleFilter}
        />
      ))}
    </div>
  );
};

const FilterAccordion = ({
  // filterTitle,
  // filterContent,
  filterContent,
  index,
  openedAccordionIdx,
  handleOpenedAccordionIdx,
  handleFilter
}) => {
  const {name, section, option} = filterContent
  
  return (
    
    <>
      <div
        className={`flex justify-between items-center py-4 px-8 border-2 cursor-pointer ${
          openedAccordionIdx === index ? "rounded-t-md" : "rounded-md"
        }`}
        onClick={() => handleOpenedAccordionIdx(index)}
      >
        <div className="text-xl ">{name}</div>
        {openedAccordionIdx === index ? (
          <FaChevronUp style={{ color: "gray" }} />
        ) : (
          <FaChevronDown style={{ color: "gray" }} />
        )}
      </div>
      {openedAccordionIdx === index && (
        <div className="bg-white px-8 rounded-b-md border-x-2 border-b-2 flex flex-col pt-2">
          {option.map((content) => (
            <div
              key={content.label}
              className="flex items-start pb-2 xl:text-lg"
            >
              <input
                type="checkbox"
                name={content}
                className="mr-2 mt-2 cursor-pointer"
                onChange={(e)=>handleFilter(e, section, content.value)}
              />
              <label htmlFor="category">{content.label}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Pagination = () =>{
  const pages = [1,2,3,4,5]
  return (
    <div className="flex justify-end my-4 px-4 py-2 md:mx-6 lg:mx-4 xl:mx-[10px]">
      <div className="flex justify-center items-center px-2 py-1 bg-white mr-2 rounded-sm text-black cursor-pointer h-8 w-8 shadow-md hover:bg-gray-200">
      <IoIosArrowBack />
      </div>
      <div className="flex">
      {Array.from({length: 5}).map((page,index)=>(
        <div className="flex justify-center px-2 py-1 bg-white mr-2 rounded-sm cursor-pointer h-8 w-8 shadow-md hover:bg-gray-200">{index+1}</div>
      ))}
      </div>
      <div className="flex justify-center items-center px-2 py-1 bg-white mr-2 rounded-sm text-black cursor-pointer h-8 w-8 shadow-md hover:bg-gray-200">
      <IoIosArrowForward />
      </div>
    </div>
  );
}

export default ProductList;


