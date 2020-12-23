module.exports = (ctx, next) => {
  ctx.checkValidate = (nxt) => {
    if (ctx.errors) {
      ctx.status = 400;
      ctx.body = {
        meta: {
          status: 400,
          responseName: 'Bad Request',
        },
        error: {
          message: ctx.errors,
        },
      };
      return null;
    }
    return nxt();
  };
  return next();
};
