// Typescript:
import type {
  LaunchOptions,
  BrowserLaunchArgumentOptions,
  BrowserConnectOptions,
  Product
} from 'puppeteer-core'
import type {
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'


// Exports:
export type FetchType = 'DOCUMENT' | 'BLOB'

export interface AxiosOptions {
  config?: AxiosRequestConfig<any>
  headers?: AxiosRequestHeaders
}

export type PuppeteerLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
  product?: Product
  extraPrefsFirefox: Record<string, unknown>
}

export interface PuppeteerOptions {
  baseURL: string
  waitFor?: number
  transformExternalLinks?: boolean
  launchOptions?: Partial<PuppeteerLaunchOptions>,
  launchArguments?: string[],
}
