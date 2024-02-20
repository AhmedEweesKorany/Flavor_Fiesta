import { Hero, HomeCategories, Subscribe } from "../../components";

const Home = () => {

  return (
    <>
      <Hero />
      <HomeCategories
        title={"recipe"}
    
      />
      {true && (
        <Subscribe />
      )}
      <HomeCategories
        title={"blog"}
     
      />
    </>
  );
};

export default Home;
