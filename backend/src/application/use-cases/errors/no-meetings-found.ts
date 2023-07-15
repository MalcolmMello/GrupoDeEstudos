export class NoMeetingsFound extends Error {
  constructor() {
    super("No meetings found.");
  }
}