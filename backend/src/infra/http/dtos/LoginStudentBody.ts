const loginStudentBody = {
  username: {
    type: 'string',
    example: "jhondoe@gmail.com",
    description: "Username is attribute default name, however you must send student email"
  },
  password: {
      type: 'string',
      example: '20wB&U4p',
      description: 'Password of a given student'
  }
};

export default loginStudentBody;