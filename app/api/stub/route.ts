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

function generateData() {
    const fakeData = [];
    for (let index = 10; index < 60; index++) {
        fakeData.push({
            pub_date: `2023-05-01T02:${index}:04+0000`,
            abstract: 'title' + index,
            web_url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' + index,
            source: 'nyt',
            multimedia: [
                {
                    subtype: 'xlarge',
                    url: 'images/2023/04/30/arts/30succession/30succession-articleLarge.jpg'
                }
            ],
        })
    }
    return fakeData;
}

export async function GET(request: NextRequest): Promise<NextResponse> {

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 20;

    if (!year || !month) {
        return new NextResponse(JSON.stringify({ error: "Missing year or month" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const data = await new Promise(resolve => {
            const data = generateData();
            setTimeout(() => {
                resolve(data);
            }, 2000)
        })

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const slicedDocs = data.slice(start, end);

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

    } catch (err: unknown) {
        return new NextResponse(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
