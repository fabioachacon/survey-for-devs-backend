export type HttpResponse = {
  statusCode: number;
  headers?: Record<string, any>;
  body: any;
};

export type HttpRequest = {
  body?: any;
  headers?: Record<string, any>;
};
