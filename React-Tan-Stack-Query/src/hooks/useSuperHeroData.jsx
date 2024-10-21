import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHero = async ({ queryKey }) => {
  const heroId = queryKey[1]; // queryKey is an array with the query key and the heroId
  // return axios.get(`http://localhost:4000/superheroes/${heroId}`);

  return request({
    url: `/superheroes/${heroId}`,
    method: "get",
  });
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
