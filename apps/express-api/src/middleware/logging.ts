import Logger from 'morgan';
import { createStream, Options } from 'rotating-file-stream';

export function consoleLogs(format: string = 'dev') {
  return Logger(format);
}

export function fileLogs(logPath: string, options?: Options, format: string = 'common') {
  return Logger(format, {
    stream: createStream(logPath, {
      interval: '7d',
      compress: 'gzip',
      ...options
    })
  });
}
