import createStudentResponse from "./CreateStudentResponse";

const createMeetingResponse = {
  meeting: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        example: '8a8c946d-356e-41c0-b037-ecb9212e626c'
      },
      subject: {
        type: 'string',
        example: 'Matemática'
      },
      description: {
        type: 'string',
        example: "We're going to study math"
      },
      place: {
        type: 'string',
        example: 'Franco da Rocha Mall'
      },
      num_persons: {
        type: 'integer',
        example: 8
      },
      host: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: 'c2c68165-0437-4420-b76d-1b1e002ad5f9'
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'johndoe@gmail.com',
          },
          semester: {
            type: 'integer',
            example: 4,
          },
          course: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '55b3a778-5ca8-4ac6-a6c1-586b7c5ece25',
              },
              name: {
                type: 'string',
                example: 'Desenvolvimento de Sistemas'
              },
              unit: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: 'aa2c0709-df27-41cc-8a7c-9a3e01e7d620',
                  },
                  name: {
                    type: 'string',
                    example: 'Etec',
                  }
                }
              }
            }
          }
        }
      },
      _idHost: {
        type: 'string',
        example: 'c2c68165-0437-4420-b76d-1b1e002ad5f9'
      },
      students: {
        type: 'array',
        items: createStudentResponse.student
      }
    }
  }
}

export default createMeetingResponse;