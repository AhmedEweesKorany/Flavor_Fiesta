import { Hero, HomeCategories, Subscribe } from "../../components";

const Home = () => {
  return (
    <>
      <Hero />
      <HomeCategories title={"recipe"} />
      {true && <Subscribe />}
    </>
  );
};

export default Home;
