# aws-proxy-fetch

[![npm](https://img.shields.io/badge/npm-aws--proxy--fetch-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/aws-proxy-fetch)
[![npm version](https://img.shields.io/npm/v/aws-proxy-fetch.svg?style=flat-square)](https://www.npmjs.com/package/aws-proxy-fetch)
[![npm downloads](https://img.shields.io/npm/dm/aws-proxy-fetch.svg?style=flat-square)](https://www.npmjs.com/package/aws-proxy-fetch)
[![sponsors](https://img.shields.io/github/sponsors/diragb)](https://github.com/sponsors/diragb)

Fetch web content behind a firewall with an AWS proxy.

# Inspiration
Fetching web content from other websites from client-side usually either results in a CORS or a `403 Forbidden` error. A typical workaround for this is to fetch it via a proxy server, but this is also usually blocked due to *"Are you a human?"* checks.

**aws-proxy-fetch** uses Puppeteer to get the actual page content, grabs the generated HTML, transforms and serves it.

Check out [**node-proxy-fetch**](https://www.npmjs.com/package/node-proxy-fetch) for a platform agnostic approach.

# Usage
In your AWS Lambda code:
```ts
// Packages:
const fetch = require('aws-proxy-fetch');


// Exports:
exports.handler = async (event, _context, _callback) => {
  const fetchOptions = JSON.parse(event['fetchOptions'])
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  if (fetchOptions.type === 'DOCUMENT') {
    const webpage = await fetch({
      targetURL: fetchOptions.targetURL,
      type: fetchOptions.type,
      puppeteerOptions: {
        baseURL: fetchOptions.puppeteerOptions.baseURL,
        ...fetchOptions.puppeteerOptions
      },
      ...fetchOptions
    })
    response.body = webpage
  } else if (fetchOptions.type === 'BLOB') {
    const image = (await fetch({
      targetURL: fetchOptions.targetURL,
      type: fetchOptions.type,
      ...fetchOptions
    })).fetchOptions
    response.body = image
  } else {
    response.body = 'Invalid type!'
    response.statusCode = 400
  }
  return response
}
```

# API

## targetURL
`string`

The target URL that you want to fetch.

## type
`FetchType = 'DOCUMENT' | 'BLOB'`

The type of content you are fetching.

## axiosOptions
`AxiosOptions` - **OPTIONAL**

Options for Axios, only used when `type` is `BLOB`.

### config
`AxiosRequestConfig<any>` - **OPTIONAL**

### headers
`AxiosRequestHeaders` - **OPTIONAL**

## puppeteerOptions
`PuppeteerOptions` - **OPTIONAL**

### baseURL
`string`

The base URL with the pattern `protocol://domain.tld`. All relative paths in the fetched HTML is replaced with this.

### waitFor
`number` - **OPTIONAL**

The number of milliseconds to wait for before scraping the HTML. This gives time for the Javascript to run on the page. Defaults to `5000`.

### transformExternalLinks
`boolean` - **OPTIONAL**

Whether to transform relative paths with the `baseURL` or not. Defaults to `true`.

### launchOptions
`Partial<PuppeteerOptions>` - **OPTIONAL**

Launch options for Puppeteer.

### launchArguments
`string[]` - **OPTIONAL**

Launch arguments for Puppeteer.

# License
MIT
