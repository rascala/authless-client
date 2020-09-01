import * as VError from 'verror'
import axios, { AxiosStatic } from 'axios'
import Debug from './debug'

const debug = Debug.extend('client')

interface Config {
  uri: any
  retries: any
}

interface UrlParams {
  url: string
  referer?: string
  responseFormat?: string
}

interface SearchParams {
  q: string
  responseFormat?: string
}

type ResponseData = object

class Client {

  uri: string
  retries: number
  axios: AxiosStatic

  static isValidClient (x: any): x is Client {
    if(!(x instanceof Object) || x === null) throw new Error('config must be a javascript object')
    if(typeof x.uri !== 'string') throw new Error('config.uri must be a string')
    if(typeof x.retries !== 'number') throw new Error('config.retries must be a number')
    return true
  }

  /**
   *
   * @param config.retries - how many times it should be retried
   * @param config.uri: authless server uri
   *
 */
  constructor (config: Config) {
    try {
      if(Client.isValidClient(config)) {
        this.uri = config.uri
        this.retries = config.retries
        this.axios = axios
      }
      Object.assign(this, config)
    } catch (e) {
      throw new VError(e, 'failed to initialize ClientLowLevel')
    }
  }

  async url (params: UrlParams, retryCounter = 0): Promise<any> {
    debug.extend('url')(params.url)
    params.responseFormat = params.responseFormat ?? 'json'

    try {
      const data = await this.axios.get(`${this.uri}/url`, {params})
        .then(response => response.data)
      return data
    } catch (e) {
      if (retryCounter < this.retries) {
        debug.extend('url').extend('error')(`retry/${retryCounter + 1}: ${e.message as string}`)
        return this.url(params, retryCounter + 1)
      }
      debug.extend('url').extend('error')(`retried ${this.retries} times; its not working`)
      throw e
    }
  }

  async search (params: SearchParams): Promise<ResponseData> {
    debug.extend('search')(params.q)
    params.responseFormat = params.responseFormat ?? 'json'

    return await this.axios.get(`${this.uri}/search`, {params})
      .then(response => response.data)
  }
}

export { Client }
