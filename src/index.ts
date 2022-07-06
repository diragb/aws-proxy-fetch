// Packages:
import axios from 'axios'
import cheerio from 'cheerio'
import { convertAnchorHrefs } from './utils/convertAnchorHrefs'
import { convertImageSrcs } from './utils/convertImageSrcs'
import randomUseragent from 'random-useragent'


// Typescript:
import {
  FetchType,
  AxiosOptions,
  PuppeteerOptions
} from './types'


// Functions:
const fetch = async (Chromium: any, {
  targetURL,
  type,
  axiosOptions,
  puppeteerOptions
}: {
  targetURL: string
  type: FetchType
  axiosOptions?: AxiosOptions
  puppeteerOptions?: PuppeteerOptions
}) => {
  try {
    if (type === 'BLOB') {
      const response = await axios.get(targetURL, {
        headers: {
          'User-Agent': randomUseragent.getRandom(),
          ...axiosOptions?.headers
        },
        ...axiosOptions?.config
      })
      return response
    } else if (type === 'DOCUMENT') {
      let data = undefined
      if (!puppeteerOptions) return
      if (puppeteerOptions.waitFor === undefined) puppeteerOptions.waitFor = 5000
      if (puppeteerOptions.transformExternalLinks === undefined) puppeteerOptions.transformExternalLinks = true
      const browser = await Chromium.puppeteer.launch({
        args: [
          ...Chromium.args,
          ...puppeteerOptions.launchOptions?.args ?? []
        ],
        defaultViewport: Chromium.defaultViewport,
        executablePath: await Chromium.executablePath,
        headless: Chromium.headless,
        ...puppeteerOptions.launchOptions
      })
      const page = await browser.newPage()
      await page.setUserAgent(randomUseragent.getRandom())
      await page.goto(targetURL)
      await page.waitForTimeout(puppeteerOptions.waitFor)
      data = await page.content()
      if (puppeteerOptions.transformExternalLinks) {
        const $ = cheerio.load(data)
        convertAnchorHrefs({ $, baseURL: puppeteerOptions.baseURL })
        convertImageSrcs({ $, baseURL: puppeteerOptions.baseURL })
        data = $.html()
      }
      await browser.close()
      return data
    }
  } catch(e) {
    console.error('aws-proxy-fetch encountered an error')
    throw new Error(e as any)
  }
}


// Exports:
export default fetch
