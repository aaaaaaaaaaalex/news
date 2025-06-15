import { createSelector } from "reselect";

import { AppState } from "@/app/store/store";

const now = new Date();

export type News = {
    pub_date: string,
    abstract: string,
    web_url: string,
    source: string,
    img_url: string | null,
}

type NewsState = {
    news: News[];
    fetchNewsStatus: 'idle' | 'pending' | 'success' | 'failed';
    page: number;
    year: number;
    month: number;
}

export type FetchNewsPendingAction = {
    type: 'fetchNewsPending';
}

export type FetchNewsFailedAction = {
    type: 'fetchNewsFailed';
}

export type FetchNewsSuccessAction = {
    type: 'fetchNewsSuccess';
    payload: {
        news: News[];
        page: number;
        year: number;
        month: number;
    };
}

type Action = FetchNewsSuccessAction | FetchNewsPendingAction | FetchNewsFailedAction;

const initialNewsState: NewsState = {
    news: [],
    fetchNewsStatus: 'idle',
    page: 1,
    year: now.getFullYear(),
    // статьи за текущий месяц не доступны для получения в api - получим 403
    // поэтому начинаем отсчет от предыдущего месяца
    month: now.getMonth(),
}

export function newsReducer(state = initialNewsState, action: Action) {
    switch (action.type) {
        case 'fetchNewsPending': {
            return {
                ...state,
                fetchNewsStatus: 'pending'
            }
        }
        case 'fetchNewsFailed': {
            return {
                ...state,
                fetchNewsStatus: 'failed'
            }
        }
        case 'fetchNewsSuccess': {
            const { news, page, year, month } = action.payload;

            let nextYear = year;
            let nextMonth = month;

            // проверим, кончились ли у нас статьи за текущий месяц
            if (!news.length) {
                // переключаем на предыдущий год
                if (month === 1) {
                    nextYear = year - 1;
                    nextMonth = 12;
                } else {
                    // переключаем на предыдущий месяц
                    nextMonth = month - 1;
                }
            }
            // TODO: сделать обработку "самого конца", когда статьи вообще кончились

            return {
                news: [...state.news, ...news],
                fetchNewsStatus: 'success',
                year: nextYear,
                month: nextMonth,
                page,
            };
        }
        default:
            return state;
    }
}

export const selectSortedNews = createSelector(
    (state: AppState) => state.news.news,
    (newsList: News[]): Record<string, News[]> => {
        return newsList.reduce((acc, newsItem) => {
            const date = newsItem.pub_date.slice(0, 10); // 'YYYY-MM-DD'
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(newsItem);
            return acc;
        }, {} as Record<string, News[]>);
    }
);