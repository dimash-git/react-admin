"use client";

import { useState } from "react";
import BoughtProductCard from "./bought-product-card";
import Pagination from "@/components/pagination-client";

const pageSize = 4;

const BoughtProducts = ({ products }: { products: UserBought[] }) => {
  const [page, setPage] = useState<number>(1);
  console.log(products);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px]">
        {products.length > 0 &&
          products
            .slice((page - 1) * pageSize, page * pageSize)
            .map((product, idx) => (
              <BoughtProductCard key={idx} product={product} />
            ))}
      </div>
      {products.length > pageSize && (
        <Pagination
          count={products.length}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default BoughtProducts;
