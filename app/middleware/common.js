module.exports = (app) => {
  return async function common(ctx, next) {
    console.log(ctx);
    await next();
  };
};
