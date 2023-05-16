class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: string;
  public path?: string;
  public value?: string;
  public code?: number;
  public response?: any;
  public errors?: Array<{ message: string }>;

  constructor(
    message: string,
    statusCode: number,
    isOperational = false,
    stack = ''
  ) {
    console.log('AppError =>'.yellow.bold, message);
    console.log('AppError =>'.yellow.bold, statusCode);
    console.log('AppError =>'.yellow.bold, isOperational);
    console.log('AppError =>'.yellow.bold, stack);

    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
