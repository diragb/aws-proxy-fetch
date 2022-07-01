// Packages:
import { CheerioAPI } from 'cheerio'


// Exports:
export const convertAnchorHrefs = ({ $, baseURL }: { $: CheerioAPI, baseURL: string }) => {
  $('a').each((_i, anchorElement) => {
    const href = $(anchorElement).attr('href')
    if (!href) return
    if (href.substring(0, 2) === '//') return
    if ([ '/', '#' ].includes(href[0])) $(anchorElement).attr('href', baseURL + href)
  })
}
