type News = {
    pub_date: string,
    abstract: string,
    web_url: string,
    source: string,
    img_url: string | null,
}

type NewsState = {
    news: News[];
    fetchNewsStatus: 'idle' | 'pending' | 'success' | 'failed';
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
    };
}

type Action = FetchNewsSuccessAction | FetchNewsPendingAction | FetchNewsFailedAction;

const initialNewsState: NewsState = {
    news: [],
    fetchNewsStatus: 'idle'
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
            const { news } = action.payload;
            return {
                news,
                fetchNewsStatus: 'success'
            }
        }
        default:
            return state;
    }
}