export default [
  {
    type: 'post',
    url : '/api/login',
    response: () => {
      return {
        code: 200,
        msg : "ok",
        obj: [
          ''
        ]
      }
    }
  }
]