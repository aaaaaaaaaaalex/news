'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className={`
                sticky top-0 right-0 left-0
                z-10
                pt-2 pb-2
                flex items-center justify-between
                bg-white
                border border-solid border-[var(--grey-light)]
            `}>
                <button className={`
                    p-5
                    flex items-center justify-between
                    cursor-pointer
                `}
                    onClick={() => setIsOpen(true)}
                >
                    <Image
                        src="/icons/hamburger.svg"
                        width={20}
                        height={15.75}
                        alt="меню"
                    />
                </button>
                <div className={`
                    text-2xl font-bold tracking-[0.1em] leading-none
                `}>
                    BESIDER
                </div>
                <div className="w-[60px]"></div>
            </header >
            <div className={`
                ${isOpen ? 'block' : 'hidden'}
                fixed
                top-0 right-0 left-0 bottom-0
                z-10
                p-5
                flex items-center
                bg-white
            `}>
                <button className={`
                    absolute
                    top-5 right-5
                    flex items-center justify-between
                    cursor-pointer
                `}
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src="/icons/cross.svg"
                        width={20}
                        height={15.75}
                        alt="меню"
                    />
                </button>
                <nav className={`
                    flex flex-col gap-7
                `}>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>SCIENCE</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>GENERAL</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>ENTERTAINMENT</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>TECHNOLOGY</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>BUSINESS</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>HEALTH</Link>
                    <Link className="text-[22px] font-bold tracking-[0.1em] leading-none" href='/'>SPORTS</Link>
                </nav>
            </div>
        </>
    )
}