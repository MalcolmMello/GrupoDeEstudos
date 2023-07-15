import coursesResponse from "./CoursesResponses";

const createStudentResponse = {
  student: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        example: '8a8c946d-356e-41c0-b037-ecb9212e626c'
      },
      name: {
        type: 'string',
        example: 'John Doe'
      },
      email: {
        type: 'string',
        example: 'johndoe@gmail.com'
      },
      semester: {
        type: 'integer',
        example: 5
      },
      course: coursesResponse,
      _idHost: {
        type: 'string',
        description: "Used when create a meeting, it's diferent of student id",
        example: '13ccbb28-aa0d-48d7-8a74-b7183ba916f0'
      }
    }
  }
}

export default createStudentResponse;