import { createContext, useContext } from "react";
//hooks
import ActivityStore from "./activityStore";

interface Store
{
    activityStore: ActivityStore;
}

export const store: Store =
{
    activityStore: new ActivityStore()
};

export const StoreContext = createContext( store );

export const useStore = () =>
{
    return useContext( StoreContext );
};