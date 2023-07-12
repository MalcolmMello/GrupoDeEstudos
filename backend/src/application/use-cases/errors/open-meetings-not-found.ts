export class OpenMeetingsNotFound extends Error {
  constructor() {
    super('No open meetings found.');
  }
}