class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * Status code: 401
 *
 * notes_api - 11 line
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {}

// Dodaj wiecej klas jesli chcesz wiecej obsłużyć
