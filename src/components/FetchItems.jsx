import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());
    fetch(`${import.meta.env.VITE_API_URL || 'https://myntra-clone-una5.onrender.com'}/items`, { signal })
    .then((res) => res.json())
    .then(({ items }) => {
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(fetchStatusActions.markFetchingFinished());
      dispatch(itemsActions.addInitialItems(items)); // Fixed: removed [0]
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      dispatch(fetchStatusActions.markFetchingFinished());
    });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;