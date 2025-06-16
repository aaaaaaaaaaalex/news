'use client'

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { api } from "@/shared/api/api";
import { getDateFormatted } from "@/shared/helpers/get-date-formatted";

import { useAppSelector } from "@/app/store/store";

import { selectSortedNews } from "../model/slice";
import { NewsCard } from "./news-card";

export function NewsList() {
    const dispatch = useDispatch();
    const news = useAppSelector(selectSortedNews);

    const { page, fetchNewsStatus, year, month } = useAppSelector(state => state.news);
    const loaderRef = useRef<HTMLDivElement>(null);

    const loadNews = useCallback((year: number, month: number, page: number) => {
        dispatch({ type: 'fetchNewsPending' });
        api.getNews(year, month, page)
            .then(data => {
                if (data.error) {
                    if (data.status === 429) {
                        // возможно КОСТЫЛЬ
                        setTimeout(() => {
                            loadNews(year, month, page);
                        }, 20000)
                    }
                } else {
                    dispatch({ type: 'fetchNewsSuccess', payload: { news: data, page, year, month } });
                }
            })
            .catch(err => {
                dispatch({ type: 'fetchNewsFailed' });
            });
    }, [dispatch]);

    useEffect(() => {
        loadNews(year, month, 1);
    }, [loadNews, year, month]);

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && fetchNewsStatus !== 'pending') {
                    loadNews(year, month, page + 1);
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [fetchNewsStatus, loadNews, page, year, month]);

    return (
        <>
            <div className="flex flex-col gap-4 mb-12">
                {Object.entries(news).map(([date, newsItems]) => {
                    const dateFormatted = getDateFormatted(date);
                    return (
                        <div key={date}>
                            <h2 className="font-bold text-lg leading-[1.44] mb-[11px]">News for {dateFormatted}</h2>
                            <div className="flex flex-col gap-4">
                                {newsItems.map((newsItem, index) => (
                                    <div key={newsItem.web_url}>
                                        {index > 0 && <div className="border-t border-[var(--grey-light)] mb-4" />}
                                        <NewsCard news={newsItem} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div ref={loaderRef} style={{ height: '1px' }} />

            {fetchNewsStatus === 'pending' &&
                <div className="flex justify-center">
                    <Image
                        src='/icons/loader.svg'
                        width={36}
                        height={36}
                        alt='загрузка'
                        className="animate-spin"
                    />
                </div>
            }
        </>
    )
}