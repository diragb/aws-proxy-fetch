// Packages:
import { CheerioAPI } from 'cheerio'


// Exports:
export const convertImageSrcs = ({ $, baseURL }: { $: CheerioAPI, baseURL: string }) => {
  $('img').each((_i, imageElement) => {
    const src = $(imageElement).attr('src')
    if (!src) return
    if (src.substring(0, 2) === '//') return
    if (src[0] === '/') $(imageElement).attr('src', baseURL + src)
  })
}
