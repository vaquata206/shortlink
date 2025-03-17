import { prisma } from "@/lib/prisma";

export async function getLinkByShortLink(shortLink: string) {
    var d = await prisma.link.findUnique({ where : {shortLink}});
    return d;
}

export async function addShortLink(shortLink: string, link: string) {
    return prisma.link.create({
        data: {shortLink, link, createAt: new Date()}
    });
}