class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

/**
 * WEB环境下的请求
 */
export class WebRequest{
  constructor() {
    if (!fetch) {
      throw new Error('当前环境不支持fetch，请手动实现调用');
    }
  }

  /**
   * 请求
   * @param url
   * @param data
   * @param options
   */
  public async request(
    url: string,
    data: any,
    options?: {
      headers?: any;
    }
  ): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      body: data ? JSON.stringify(data): null,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
    });
    const info = await response.json();
    if (info.code === 401) {
      throw new UnauthorizedError('登陆已过期')
    }
    return info.data;
  }
}
