import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchItems } from "../features/items/itemsSlice";
import Card from "../components/Card";

export default function Items() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const { list, loadingList, errorList } = useSelector(
        (state) => state.items
    );

    useEffect(() => {
        dispatch(fetchItems(query));
    }, [dispatch, query]);

    if (loadingList) return <p>Loading...</p>;
    if (errorList) return <p>Error: {errorList}</p>;

    return (
        <div>
            <h1>Anime List</h1>

            {list.length === 0 && <p>No items found</p>}

            <div className="cards">
                {list.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
