import { addShortLink, getLinkByShortLink } from "@/services/shortService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    let short = "";
    for (var i = 0; i < 10; i++) {
        short = makeShort();
        const oldShort = await getLinkByShortLink(short);
        if (oldShort == null) break;
    }

    if (i < 10) {
        addShortLink(short, body.url);
        return NextResponse.json({
            shortlink: process.env.BASE_URL + "/" + short,
            link: body.url,
        }, { status: 200 });
    } else {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}

function makeShort() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    const length: number = Number(process.env.LENGTH_SHORTURL || 0);
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}