import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = async (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queries = heroIds.map((heroId) => {
    return {
      queryKey: ["super-hero", heroId],
      queryFn: () => fetchSuperHero(heroId),
    };
  });

  const queryResults = useQueries(queries);

  console.log({ queryResults });
  return <div>Dynamic Parallel Page</div>;
};
