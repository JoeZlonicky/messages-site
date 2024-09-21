class NoAuthError extends Error {
  constructor() {
    super('No Authentication');
    this.name = 'NoAuthError';
  }
}

export { NoAuthError };
