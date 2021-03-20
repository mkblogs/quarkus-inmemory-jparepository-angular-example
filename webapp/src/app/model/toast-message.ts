/* tslint:disable */
export class Message {
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(content: any, style?: any) {
    this.content = content;
    this.style = style || 'info';
  }

}
