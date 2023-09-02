export class TestMessage {
  private readonly apiPath: string = 'xxx/send';
  private readonly request: any

  constructor(requestInstance: any) {
    this.request = requestInstance
  }

  async send(str: string): Promise<any> {
    const data= {
      content: str
    }
    return this.request(this.apiPath, data)
  }

}
