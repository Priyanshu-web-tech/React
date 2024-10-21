import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = async () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { isLoading: isLoadingHeroes, data: superHeroes } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );

  const { isLoading: isLoadingFriends, data: friends } = useQuery(
    "friends",
    fetchFriends
  );

  return <div>Parallel</div>;
};
