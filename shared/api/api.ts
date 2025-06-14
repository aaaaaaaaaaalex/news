'use client'

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
console.log(apiKey);

const baseUrl = '/api';

export const api = {
    getNews: (year: string, month: string) => {
        return fetch(`${baseUrl}/nyt?year=${year}&month=${month}`)
            .then(response => response.json())
    }
}