"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/tools/redux/store";
import { Button } from "@mui/material";
import { UserMenu } from "@/components/layout/toolbar/UserMenu";
import { BurgerMenu } from "@/components/layout/toolbar/BurgerMenu";
import { navigationConstants } from "@/tools/constants/routing/navigation-constant";
import { muiSx } from "@/tools/constants/ui/mui-styles";

export function Toolbar() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="flex w-full items-center justify-between bg-white px-6 py-3 shadow-md">
            <section className="flex items-center gap-4">
                <BurgerMenu />
            </section>
            {user.userId ? (
                <UserMenu user={user} />
            ) : (
                <section className="flex items-center gap-4">
                    <Link href={navigationConstants.login}>
                        <Button variant="contained" color="primary" sx={muiSx.toolbarSignInButton}>
                            Sign in
                        </Button>
                    </Link>
                    <Link href={navigationConstants.register}>
                        <Button variant="outlined" color="primary" sx={muiSx.toolbarSignUpButton}>
                            Sign up
                        </Button>
                    </Link>
                </section>
            )}
        </div>
    );
}
