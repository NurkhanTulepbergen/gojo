import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItemById } from "../features/items/itemsSlice";

export default function ItemDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedItem, loadingItem, errorItem } = useSelector(
        (state) => state.items
    );

    useEffect(() => {
        dispatch(fetchItemById(id));
    }, [dispatch, id]);

    if (loadingItem) return <p>Loading...</p>;
    if (errorItem) return <p>Error: {errorItem}</p>;
    if (!selectedItem) return <p>Not found</p>;

    return (
        <div>
            <h1>{selectedItem.title}</h1>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <p>{selectedItem.description}</p>
        </div>
    );
}
