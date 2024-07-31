/* eslint-disable react/jsx-key */
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchProduct } from "../redux/slices/productSlice";
import { RootState } from "../redux/reducers";

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.product.product.products
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="container py-3 mx-auto flex justify-center">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {products &&
            products.map((item: any, index: number) => (
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {item.title.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.title}
                  subheader={item.category}
                />
                <CardMedia
                  component="img"
                  image={item.images[0]}
                  alt={item.title}
                  className="w-[360px] h-[320px] object-cover"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {item.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {item.stock}
                  </Typography>
                </CardContent>
                <div className="flex">
                  <button className="flex bg-slate-600 text-white px-5 mx-auto py-2 rounded-lg justify-center align-middle text-center self-center">
                    Add to Cart
                  </button>
                  <button className="flex bg-slate-600 text-white px-5 mx-auto py-2 rounded-lg justify-center align-middle text-center self-center">
                    Buy
                  </button>
                </div>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
