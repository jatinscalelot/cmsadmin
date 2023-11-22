import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { values } from "lodash";
import { async } from "q";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createUserServices, getAllUserServices } from "../auth/services/UserServics";
import { addCardServices, getCardServes, getSingleCardServices, updateCardServices, updatecardDueDateServices } from "../../redux/Services/cardServices";

const initialState = {
    cardList: [],
    singleCard: {},
    isError: false,
    isError: false
};

export const addCard = createAsyncThunk(
    "card/addcard",
    async (payload) => {
        return await addCardServices(payload);
    },
);
export const updateCard = createAsyncThunk(
    "card/addcard",
    async (payload) => {
        return await updateCardServices(payload);
    },
);
export const getCardList = createAsyncThunk(
    "card/getcardlis",
    async (payload) => {
        return await getCardServes(payload);
    },
);
export const updateCardDueDate = createAsyncThunk(
    "card/updateduedate",
    async (payload) => {
        return await updatecardDueDateServices(payload);
    },
);
export const getSingleCard = createAsyncThunk(
    "card/getsinglecard",
    async (payload) => {
        return await getSingleCardServices(payload);
    },
);
export const getSingleHolderCard = createAsyncThunk(
    "card/getsinglecard",
    async (payload) => {
        return await getSingleCardServices(payload);
    },
);


const cardSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCardList.fulfilled, (state, action) => {
            state.cardList = action?.payload?.data?.Data?.docs
        });
        builder.addCase(getSingleCard.fulfilled, (state, action) => {
            state.singleCard = action?.payload?.data?.Data
        });
        // builder.addCase(createUserProfile.fulfilled, (state, action) => {
        //     // let user = action?.payload?.data?.Data;
        //     // state.user = user ? user : {};
        // });
        // builder.addCase(getAllUser.fulfilled, (state, action) => {
        //     // let user = action?.payload?.data?.Data;
        //     state.allusers = action?.payload?.data?.Data
        //     // state.user = user ? user : {};
        // });
    },
});
export default cardSlice.reducer;


export const selectCards = (state) => state.card.cardList
export const selectSingleCard = (state) => state.card.singleCard


export const useCardList = () => {
    const allcardLst = useSelector(selectCards);
    return useMemo(() => allcardLst, [allcardLst]);
};
export const useSingleCard = () => {
    const singleCardDetail = useSelector(selectSingleCard);
    return useMemo(() => singleCardDetail, [singleCardDetail]);
};


// export const selectEvent = (state) => state.eventPersonalDetails.;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
