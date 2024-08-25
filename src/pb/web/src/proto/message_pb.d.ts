import * as jspb from 'google-protobuf'



export class GetMessageRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): GetMessageRequest;

  getOffset(): number;
  setOffset(value: number): GetMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageRequest): GetMessageRequest.AsObject;
  static serializeBinaryToWriter(message: GetMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageRequest;
  static deserializeBinaryFromReader(message: GetMessageRequest, reader: jspb.BinaryReader): GetMessageRequest;
}

export namespace GetMessageRequest {
  export type AsObject = {
    uuid: string,
    offset: number,
  }
}

export class GetMessagesResponse extends jspb.Message {
  getMessagesList(): Array<MessageInfo>;
  setMessagesList(value: Array<MessageInfo>): GetMessagesResponse;
  clearMessagesList(): GetMessagesResponse;
  addMessages(value?: MessageInfo, index?: number): MessageInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessagesResponse): GetMessagesResponse.AsObject;
  static serializeBinaryToWriter(message: GetMessagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessagesResponse;
  static deserializeBinaryFromReader(message: GetMessagesResponse, reader: jspb.BinaryReader): GetMessagesResponse;
}

export namespace GetMessagesResponse {
  export type AsObject = {
    messagesList: Array<MessageInfo.AsObject>,
  }
}

export class ConnectRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): ConnectRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectRequest): ConnectRequest.AsObject;
  static serializeBinaryToWriter(message: ConnectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectRequest;
  static deserializeBinaryFromReader(message: ConnectRequest, reader: jspb.BinaryReader): ConnectRequest;
}

export namespace ConnectRequest {
  export type AsObject = {
    uuid: string,
  }
}

export class MessageResponse extends jspb.Message {
  getType(): string;
  setType(value: string): MessageResponse;

  getMessageInfo(): MessageInfo | undefined;
  setMessageInfo(value?: MessageInfo): MessageResponse;
  hasMessageInfo(): boolean;
  clearMessageInfo(): MessageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MessageResponse): MessageResponse.AsObject;
  static serializeBinaryToWriter(message: MessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageResponse;
  static deserializeBinaryFromReader(message: MessageResponse, reader: jspb.BinaryReader): MessageResponse;
}

export namespace MessageResponse {
  export type AsObject = {
    type: string,
    messageInfo?: MessageInfo.AsObject,
  }
}

export class MessageInfo extends jspb.Message {
  getId(): number;
  setId(value: number): MessageInfo;

  getUuid(): string;
  setUuid(value: string): MessageInfo;

  getContent(): string;
  setContent(value: string): MessageInfo;

  getTimestamp(): string;
  setTimestamp(value: string): MessageInfo;

  getUser(): UserInfo | undefined;
  setUser(value?: UserInfo): MessageInfo;
  hasUser(): boolean;
  clearUser(): MessageInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MessageInfo): MessageInfo.AsObject;
  static serializeBinaryToWriter(message: MessageInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageInfo;
  static deserializeBinaryFromReader(message: MessageInfo, reader: jspb.BinaryReader): MessageInfo;
}

export namespace MessageInfo {
  export type AsObject = {
    id: number,
    uuid: string,
    content: string,
    timestamp: string,
    user?: UserInfo.AsObject,
  }
}

export class UserInfo extends jspb.Message {
  getName(): string;
  setName(value: string): UserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInfo;
  static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
  export type AsObject = {
    name: string,
  }
}

