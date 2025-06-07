import React from "react";
import Brand from "../../components/brand";
import HotProducts from "../../components/hot-products";
import HomeBanner from "../../components/home-banner";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Brand />
      <HotProducts />
    </div>
  );
};

export default Home;
