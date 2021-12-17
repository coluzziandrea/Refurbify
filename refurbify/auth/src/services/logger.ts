export class Logger {
  static debug(value: string) {
    console.log(value);
  }

  static error(value: string) {
    console.error(value);
  }

  static info(value: string) {
    console.info(value);
  }
}
