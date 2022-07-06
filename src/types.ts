// Typescript:
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

export type PuppeteerLaunchOptions = any

export interface PuppeteerOptions {
  baseURL: string
  waitFor?: number
  transformExternalLinks?: boolean
  launchOptions?: Partial<PuppeteerLaunchOptions>,
  launchArguments?: string[],
}
