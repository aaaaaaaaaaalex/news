'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchNewsFailedAction, FetchNewsPendingAction, FetchNewsSuccessAction, News } from "../model/slice";
import { api } from "@/shared/api/api";
import { useAppSelector } from "@/app/store/store";
import Image from "next/image";

export function NewsList() {
    const dispatch = useDispatch();
    const news = useAppSelector(state => state.news.news);

    useEffect(() => {
        dispatch({ type: 'fetchNewsPending' } satisfies FetchNewsPendingAction)
        api.getNews('2023', '5')
            .then(data => {
                dispatch({ type: 'fetchNewsSuccess', payload: { news: data } } satisfies FetchNewsSuccessAction)
            })
            .catch(() => {
                dispatch({ type: 'fetchNewsFailed' } satisfies FetchNewsFailedAction)
            })
    }, [dispatch]);

    return (
        <div>
            {news.map(news =>
                <div key={news.web_url}>
                    <a href={news.web_url} target="_blank" rel="noopener noreferrer">
                        <div>{news.source}</div>
                        <div>{news.pub_date}</div>
                        <div>{news.abstract}</div>
                        {news.img_url &&
                            <Image
                                src={news.img_url}
                                alt="превью"
                                width={600}
                                height={399}
                            />
                        }
                    </a>
                </div>
            )}
        </div>
    )
}