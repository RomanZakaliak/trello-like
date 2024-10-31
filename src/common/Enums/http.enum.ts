export enum HttpStatus {
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NO_CONTENT = 204,
  CREATED = 201,
  OK = 200,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HttpHeader {
  CONTENT_TYPE = 'Content-Type',
}

export enum HttpContentType {
  JSON = 'application/json',
}
