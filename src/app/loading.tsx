import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
            <CircularProgress size={48} color="primary" />
            <div className="mt-2 text-xl font-semibold text-gray-500">Loading data...</div>
        </div>
    );
}
