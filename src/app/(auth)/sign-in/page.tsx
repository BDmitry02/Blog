import { redirect } from "next/navigation";
import { navigationConstants } from "@/tools/constants/routing/navigation-constant";

export default function LoginPage() {
    redirect(navigationConstants.homePage);
}
