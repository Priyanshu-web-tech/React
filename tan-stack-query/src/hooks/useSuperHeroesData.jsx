import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = async () => {
  // return axios.get("http://localhost:4000/superheroes");

  return request({
    url: "/superheroes",
    method: "get",
  });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);

  return request({
    url: "/superheroes",
    method: "post",
    data: hero,
  });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime : 5 * 60 * 1000
    // staleTime: 0,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,

    // enabled: false,
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");

    // queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data],
    //   };
    // });
    // },

    //! Optimistic Update

    //! Optimistic Update

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");

      const previousHeroData = queryClient.getQueryData("super-heroes");

      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data.length + 1,
              ...newHero,
            },
          ],
        };
      });

      return { previousHeroData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
