/* eslint-disable react/jsx-key */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProduct, fetchProduct } from "../redux/slices/productSlice";
import { RootState } from "../redux/reducers";

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const ProductAddToCart = (id: any) => {
    dispatch(addProduct(id));
  };

  return (
    <div className="container py-3 mx-auto flex justify-center">
      <div className="w-full px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
          {products &&
            products.map((item: any, index: number) => (
              <Card
                key={index}
                className="bg-slate-100"
                sx={{ maxWidth: 280, padding: 1 }}
              >
                <span className="text-sm">{item.title}</span>
                <br />
                <span className="text-sm">{item.category}</span>
                <CardMedia
                  component="img"
                  image={item.images[0]}
                  alt={item.title}
                  className="w-[300px] h-[260px] object-cover"
                />
                <CardContent>
                  Price: ${item.price} <br />
                </CardContent>
                <div className="flex py-2">
                  <button
                    onClick={() => ProductAddToCart(item.id)}
                    className="flex text-sm bg-slate-600 text-white px-5 mx-auto py-2 rounded-lg justify-center align-middle text-center self-center"
                  >
                    Add to Cart
                  </button>
                  <button className="flex bg-slate-600 text-white px-5 mx-auto py-2 rounded-lg justify-center align-middle text-center self-center">
                    Buy
                  </button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
