import { Toolbar } from "@/components/layout/toolbar/Toolbar";

export default function PostLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="w-full">
                <Toolbar />
            </header>
            <main className="flex-1 overflow-auto">{children}</main>
        </>
    );
}
