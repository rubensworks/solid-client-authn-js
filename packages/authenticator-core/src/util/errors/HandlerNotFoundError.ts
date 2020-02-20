/**
 * Error to be triggered if there is no handler that can handle certain parameters
 */
export default class HandlerNotFoundError extends Error {
  public params: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(handlerName: string, params: any[]) {
    super(
      `${handlerName} cannot find a suitable handler for: ${params
        .map(e => e.toString())
        .join(", ")}`
    );
    this.params = params;
  }
}
