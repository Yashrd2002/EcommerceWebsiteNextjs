import { Slider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryFilters = ({
  id,
  cate,
  setCate,
  setPriceRange,
  priceRange,
  brandValues,
  setBrandValues,
  colorValues,
  setColorValues,
  gender,
  setGender,
  category,
  setcategory
}) => {

  const [cat, setCat] = useState([]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCat(res.data);
    });
    cat.map((c)=>{
      if(c.parentcategory===id){
        setcategory(prev=>[...prev,c._id])
      }
    })
  }, []);

  const handleChange = (e) => {
    if (cate.includes(e.target.value)) {
      const index = cate.indexOf(e.target.value);
      if (index > -1) {
        const updatedSkills = cate
          .slice(0, index)
          .concat(cate.slice(index + 1));
        setCate(updatedSkills);
      }
    } else {
      setCate((prev) => [...prev, e.target.value]);
    }
  };

  const uniqueBrandValues = new Set();
  const uniqueColorValues = new Set();

  cat.forEach((product) => {
    const brandProperty = product.properties.find(
      (property) => property.name === "Brand"
    );
    const Colorproperty = product.properties.find(
      (property) => property.name === "Color"
    );
    if (brandProperty) {
      brandProperty.values.forEach((value) => {
        if (!uniqueBrandValues.has(value)) {
          uniqueBrandValues.add(value);
        }
      });
    }
    if (Colorproperty) {
      Colorproperty.values.forEach((value) => {
        if (!uniqueColorValues.has(value)) {
          uniqueColorValues.add(value);
        }
      });
    }
  });

  const handleBrand = (e) => {
    if (brandValues.includes(e.target.value)) {
      const index = brandValues.indexOf(e.target.value);
      if (index > -1) {
        const updatedBrands = brandValues
          .slice(0, index)
          .concat(brandValues.slice(index + 1));
        setBrandValues(updatedBrands);
      }
    } else {
      setBrandValues((prev) => [...prev, e.target.value]);
    }
  };
  const handleColor = (e) => {
    if (colorValues.includes(e.target.value)) {
      const index = colorValues.indexOf(e.target.value);
      if (index > -1) {
        const updatedColors = colorValues
          .slice(0, index)
          .concat(colorValues.slice(index + 1));
        setColorValues(updatedColors);
      }
    } else {
      setColorValues((prev) => [...prev, e.target.value]);
    }
  };
  const GenderChange=(e)=>{
    if (gender.includes(e.target.value)) {
      const index = gender.indexOf(e.target.value);
      if (index > -1) {
        const updatedgender = gender
          .slice(0, index)
          .concat(gender.slice(index + 1));
          setGender(updatedgender);
      }
    } else {
      setGender((prev) => [...prev, e.target.value]);
    }
  }

  return (
    <div className="w-2/12 flex flex-col">
      <div className="flex flex-col  mx-4">
        <h1 className="text-xl font-semibold mb-2">Gender</h1>
        <div className="flex gap-2">
          <input type="checkbox" value="Men" onChange={GenderChange}/>
          Men
        </div>
        <div className="flex gap-2">
          <input type="checkbox" value="Women" onChange={GenderChange}/>
          Women
        </div>
      </div>
      <div className="flex flex-col gap-1 mx-4">
        <h1 className="text-xl font-semibold mb-2">Category</h1>
        {cat.length > 0 &&
          cat.map((c) => (
            <div>
              {c.parentcategory===id && (
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    value={c._id}
                    onChange={handleChange}
                  />
                  {c.name}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="w-10/12 mx-4 mt-4">
        <h1 className="text-xl font-semibold mb-2">Price Range</h1>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          aria-labelledby="price-range-slider"
        />
      </div>
      <div className="flex flex-col gap-1 mx-4">
        <h1 className="text-xl font-semibold mb-2">Brand</h1>
        {[...uniqueBrandValues].map((value, index) => (
          <div key={index}>
            <input type="checkbox" value={value} onChange={handleBrand} />{" "}
            {value}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 mx-4 mt-6">
        <h1 className="text-xl font-semibold mb-2">Color</h1>
        {[...uniqueColorValues].map((value, index) => (
          <div key={index}>
            <input type="checkbox" value={value} onChange={handleColor} />{" "}
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
