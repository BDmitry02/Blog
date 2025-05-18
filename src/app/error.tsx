"use client";

import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";
import { VoidFunc } from "@/tools/types/funcs";
import { muiSx } from "@/tools/constants/ui/mui-styles";

interface ErrorProps {
    error: Error;
    reset: VoidFunc;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
            <ErrorOutlineIcon className="text-red-600" sx={muiSx.errorIcon} />
            <div className="text-xl font-semibold text-red-600">
                {error.message || "An error occurred while loading data."}
            </div>
            <Button variant="contained" color="primary" sx={muiSx.errorButton} onClick={() => reset()}>
                Reload page
            </Button>
        </div>
    );
}
