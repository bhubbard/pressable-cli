import { PressableError } from './api.js';
import ora from 'ora';

export const handleAction = async (action: () => Promise<any>, loadingMessage?: string) => {
  let spinner;
  if (loadingMessage && process.stderr.isTTY) {
    spinner = ora({
      text: loadingMessage,
      stream: process.stderr
    }).start();
  }

  try {
    const result = await action();

    if (spinner) {
      spinner.stop();
    }

    if (result !== undefined && result !== null) {
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error: any) {
    if (spinner) {
      spinner.fail();
    }

    if (error instanceof PressableError) {
      console.error(
        JSON.stringify(
          {
            error: error.message,
            statusCode: error.statusCode,
            data: error.response
          },
          null,
          2
        )
      );
      process.exit(1);
    } else {
      console.error(
        JSON.stringify(
          {
            error: 'An unexpected error occurred',
            details: error.message
          },
          null,
          2
        )
      );
      process.exit(1);
    }
  }
};
