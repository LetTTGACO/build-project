import { parseMultiJson } from "./utils/url";
import { TestMessage } from "./manager/message";

export class TestCore {
  private readonly id: string
  private readonly message: any
  constructor(id: string, request: any) {
    this.id = id
    this.message = new TestMessage(request)
  }

  getId() {
    return this.id
  }

  getJsonList(str: string) {
    return parseMultiJson(str)
  }

  getMessageInstance() {
    return this.message
  }


}
