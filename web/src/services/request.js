class MyFetch {
  constructor({ method, url, timeout, params }) {
    this.urlBase = '/api'
    this.timeout = timeout || 10000
    this.method = method.toLowerCase()
    this.url = this.urlBase + url
    this.params = params || {}

    let controller = new AbortController()
    setTimeout(() => controller.abort(), this.timeout)

    return fetch(
      this.method === 'post'
        ? this.url
        : this.url +
            '?' +
            Object.keys(this.params).reduce(
              (prev, cur) => `${prev !== '' ? prev + '&' : ''}${cur}=${this.params[cur]}`,
              ''
            ),
      {
        method: this.method,
        headers: {
          'Content-Type':
            this.method === 'get'
              ? 'application/x-www-form-urlencoded; charset=UTF-8'
              : 'application/json; charset=UTF-8',
        },
        body: this.method === 'get' ? undefined : JSON.stringify(this.params),
        signal: controller.signal,
      }
    )
  }
}

export default MyFetch
