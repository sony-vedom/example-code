import { useEffect } from "react";
import { ProductFilteringListKeys } from "entities/products/@x/constants";
import { productStore, useMy3dModelsStore } from "entities/products/@x/lib";
import { ProductCard } from "entities/products/@x/ui";
import { currentUserStore } from "shared/libs";
import { PaginationUpdateStrategy } from "shared/models";
import { Skeleton } from "shared/ui";
import { FileListWrapper } from "./FileListWrapper";
import { useProjectsFromProducts } from "../../project";

type MyModelsTabProps = {
    sceneId?: number;
    projectId?: number;
};

export const MyModelsTab = ({ projectId, sceneId }: MyModelsTabProps) => {
    const userState = currentUserStore((state) => state.userState);
    const { setProjectIdForCreateProjectFromProducts, selectSceneId } = useProjectsFromProducts();
    const { init, limitReached, isFetching, setPaginationUpdateStrategy, nextPage, products, refetch, setPage } =
        productStore();
    const isFetchingMy3dModel = useMy3dModelsStore((state) => state.isFetching);
    const fetchNew = useMy3dModelsStore((state) => state.fetchNew);
    const clearProductStore = productStore((s) => s.clear);
    const clearFilters = productStore((s) => s.clearFilter);
    const clearSearchText = productStore((s) => s.clearSearchText);

    useEffect(() => {
        if (userState.user.id) {
            clearProductStore();
            clearFilters();
            clearSearchText();
            setProjectIdForCreateProjectFromProducts(projectId);
            selectSceneId(sceneId);
            init({ userId: userState.user.id, filter: ProductFilteringListKeys.PURCHASED, catId: 4 });
            if (!isFetchingMy3dModel) {
                fetchNew(userState.user.id);
                clearProductStore();
            }
        }
        return () => {
            setProjectIdForCreateProjectFromProducts(null);
            selectSceneId(null);
            setPage(1);
        };
    }, []);

    const fetchNextPage = async () => {
        if (limitReached && isFetching) {
            return;
        }
        setPaginationUpdateStrategy(PaginationUpdateStrategy.APPEND);

        nextPage();

        refetch();
    };

    return (
        <FileListWrapper
            limitReached={limitReached}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            className={"gap-4"}
        >
            {isFetching
                ? Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                      <Skeleton
                          className="h-[372px] w-full rounded-xl py-2"
                          key={i}
                      />
                  ))
                : products.map((el) => (
                      <div key={el.productId}>
                          <ProductCard elem={el} />
                      </div>
                  ))}
        </FileListWrapper>
    );
};
