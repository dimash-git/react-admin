"use client";

import { useState } from "react";
import BoughtProductCard from "./bought-product-card";
import Pagination from "@/components/pagination-client";

const postsPerPage = 4;

const BoughtProducts = ({ products }: { products: UserBought[] }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px]">
        {products.length > 0 &&
          products
            .slice((page - 1) * postsPerPage, page * postsPerPage)
            .map((product, idx) => (
              <BoughtProductCard key={idx} product={product} />
            ))}
      </div>
      {products.length > postsPerPage && (
        <Pagination
          postsCount={products.length}
          postsPerPage={postsPerPage}
          active={page}
          setActive={setPage}
        />
      )}
    </>
  );
};

export default BoughtProducts;
