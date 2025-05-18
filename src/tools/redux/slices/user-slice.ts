import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { dbCollections } from "@/tools/constants/db/db-collections";

const initialState = {
    userId: "",
    displayName: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.userId = action.payload.uid;
                state.displayName = action.payload.displayName!;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.userId = action.payload.uid;
                state.displayName = action.payload.displayName!;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userId = "";
                state.displayName = "";
            });
    },
});

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: { email: string; password: string }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async ({ email, password, name }: { email: string; password: string; name: string }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });

        await user.reload();

        await setDoc(doc(db, dbCollections.users, user.uid), {
            name: user.displayName,
            email: user.email,
        });

        return auth.currentUser!;
    },
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    await signOut(auth);
});

export default userSlice.reducer;
