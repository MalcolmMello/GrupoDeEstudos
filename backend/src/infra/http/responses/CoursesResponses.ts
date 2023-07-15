const coursesResponse = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'course id',
      example: '2f7d0375-a89e-4213-b9b5-c650130ffd03'
    },
    name: {
      type: 'string',
      description: 'course name',
      example: 'Humanas'
    },
    unit: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'unit id',
          example: 'aa2c0709-df27-41cc-8a7c-9a3e01e7d620'
        },
        name: {
          type: 'string',
          description: 'unit name',
          example: 'Etec'
        }
      }
    }
  }
}

export default coursesResponse;