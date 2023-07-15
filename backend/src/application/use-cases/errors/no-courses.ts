export class NoCourses extends Error {
  constructor() {
    super('No courses found.');
  }
}