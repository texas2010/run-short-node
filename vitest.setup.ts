if (process.env.IS_DOCKER !== 'true') {
  throw new Error('🚫 DO NOT run these tests outside Docker!');
}
