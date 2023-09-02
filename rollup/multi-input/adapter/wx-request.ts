
class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
export class WxRequest {
  constructor() {
    //@ts-ignore
    if (!wx?.request) {
      throw new Error('当前不是小程序环境，请引用其他环境的Request');
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
      headers: any;
    }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      //@ts-ignore
      wx.request({
        url,
        method: 'POST',
        data,
        header: {
          ...options?.headers,
        },
        success: (res: any) => {
          if (res.data.code === 401) {
            throw new UnauthorizedError('ticket已过期');
          }
          resolve(res.data.data);
        },
        fail: reject,
      });
    });
  }


}
