import { PaginationResponse, PaginationUpdateStrategy } from "../../models";

export const preparedListByPaginationStrategy = <Results extends object, Data extends object = null, Extra = object>(
    paginationStrategy: PaginationUpdateStrategy,
    prevState: PaginationResponse<Results, Data> & Extra,
    state: PaginationResponse<Results, Data> & Extra
): PaginationResponse<Results, Data> & Extra => {
    return paginationStrategy === PaginationUpdateStrategy.REPLACE
        ? state
        : {
              ...state,
              results: [...prevState?.results, ...state?.results],
          };
};
