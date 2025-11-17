export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    errorCode: string;
    statusCode: number;
  };
  timestamp: string;

  private constructor(
    success: boolean,
    data?: T,
    error?: { message: string; errorCode: string; statusCode: number }
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data);
  }

  static error(
    message: string,
    errorCode: string,
    statusCode: number
  ): ApiResponse<never> {
    return new ApiResponse<never>(false, undefined, {
      message,
      errorCode,
      statusCode,
    });
  }
}
