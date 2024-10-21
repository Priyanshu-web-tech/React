import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        {data.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id} - {color.label}
            </h2>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>

      {isFetching ? <span> Fetching...</span> : null}
    </div>
  );
};
