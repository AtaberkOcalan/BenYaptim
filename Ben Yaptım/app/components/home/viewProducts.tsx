import React from "react";
import MainContainer from "../containers/MainContainer";
import Heading from "../general/Heading";
import ProductCard from "./ProductCard";
import { Product, User } from "@prisma/client";

interface ViewProductsProps {
  products: Product[];
  currentUser: User | null
}

const ViewProducts: React.FC<ViewProductsProps> = ({ products, currentUser }) => {
  return (
    <MainContainer>
      <Heading text="Tüm Ürünler"/>
        
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="w-1/6 mb-1">
              <ProductCard product={product} currentUser = {currentUser}/>
            </div>
          ))}
        </div>
    </MainContainer>
  );
};

export default ViewProducts;
