'use client'

const baseUrl = '/api';

export const api = {
    getNews: (year: number, month: number, page: number = 1) => {
        return fetch(`${baseUrl}/nyt?year=${year}&month=${month}&page=${page}`)
            .then(response => response.json())
    },
    getNewsStub: (year: number, month: number, page: number = 1) => {
        return fetch(`${baseUrl}/stub?year=${year}&month=${month}&page=${page}`)
            .then(response => response.json())
    }
}