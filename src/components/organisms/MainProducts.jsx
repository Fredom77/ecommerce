import React from 'react'; // Add this line
import useFetch from "../../hooks/useFetch";
import Loader from "../atoms/Loader";
import ProductCard from "../molecules/ProductCard";

const MainProducts = () => {
  const { data, loading, error } = useFetch("public/products");

  if (loading) return <Loader />;

  if (error) return <div>{error?.message}</div>;

  return (
    <div className="max-w-256 m-auto">
      <section className="py-10">
        <div className="grid grid-cols-4 gap-4">
          {data && data.length > 0 ? (
            data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainProducts;
