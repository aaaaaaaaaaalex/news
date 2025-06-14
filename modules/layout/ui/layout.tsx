import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { Header } from "./header";

export function Layout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="p-[11px_20px_20px]">
                {children}
            </div>
            <footer className={`
                    pb-5 pt-10
                    flex flex-col items-center justify-center gap-6
                `}>
                <nav className={`
                    flex items-center justify-center gap-5
                `}>
                    <Link className="text-xs leading-none" href='/'>Log In</Link>
                    <Link className="text-xs leading-none" href='/'>About Us</Link>
                    <Link className="text-xs leading-none" href='/'>Publishers</Link>
                    <Link className="text-xs leading-none" href='/'>Sitemap</Link>
                </nav>
                <div className={`
                    flex flex-col items-center justify-center gap-2
                    text-xs leading-none
                `}>
                    Powered by
                    <Image
                        src="/icons/api.svg"
                        width={84}
                        height={24.48}
                        alt="меню"
                    />
                </div>
                <div className="text-xs leading-none">
                    © 2023 Besider. Inspired by Insider
                </div>
            </footer>
        </>
    )
}