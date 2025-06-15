import { NextRequest, NextResponse } from "next/server";

type Article = {
    pub_date: string;
    abstract: string;
    web_url: string;
    source: string;
    multimedia?: Multimedia[];
};

type Multimedia = {
    subtype: string;
    url: string;
};

export async function GET(request: NextRequest): Promise<NextResponse> {
    const API_KEY = process.env.NYT_API_KEY;

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 100;

    if (!year || !month) {
        return new NextResponse(JSON.stringify({ error: "Missing year or month" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const nytRes = await fetch(
            `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`
        );

        if (!nytRes.ok) {
            return new NextResponse(JSON.stringify({ error: "NYT API error", status: nytRes.status }), {
                status: nytRes.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await nytRes.json();

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        // nyt возвращает новости, начиная с 1 дня месяца
        // будем вырезать новости с конца
        const slicedDocs = data.response.docs.reverse().slice(start, end);

        const minimalData = slicedDocs.map((article: Article) => {
            const image = article.multimedia?.find(img => img.subtype === 'xlarge');
            return {
                pub_date: article.pub_date,
                abstract: article.abstract,
                web_url: article.web_url,
                source: article.source,
                img_url: image ? `https://www.nytimes.com/${image.url}` : null,
            }
        });

        return new NextResponse(JSON.stringify(minimalData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch {
        return new NextResponse(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
