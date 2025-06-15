import Image from "next/image";

import { getDateFormattedCard } from "@/shared/helpers/get-date-formatted-card";

import { News } from "../model/slice";

export function NewsCard({ news }: { news: News }) {
    const dateFormatted = getDateFormattedCard(news.pub_date);

    return (
        <a className="flex gap-3 min-h-20 md:min-h-56"
            href={news.web_url}
            target="_blank" rel="noopener noreferrer"
        >
            <div className="pt-[25px] flex-1">
                <div className="relative h-full">
                    {news.img_url &&
                        <Image
                            className={`
                            w-full h-full
                            object-cover
                            absolute
                            top-0 left-0
                        `}
                            src={news.img_url}
                            alt="превью"
                            width={600}
                            height={399}
                        />
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2 flex-2">
                <h6 className={`
                    text-sm leading-none text-[var(--blue)] font-extrabold
                `}>
                    {news.source}
                </h6>
                <p className={`
                    text-base leading-[1.375]
                `}>
                    {news.abstract}
                </p>
                <div className={`
                    text-sm leading-none text-[var(--grey)]
                `}>
                    {dateFormatted}
                </div>
            </div>
        </a>
    )
}