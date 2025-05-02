// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(
//         requestHandler(req, res, next))
//         .catch((err) => next(err));
//   };
// };

// export {asyncHandler}

function asyncHandler(requestHandler) {
  //their is no express here but we use 'req,res,next'
  // becoz we know somewhere router inject express here
  return function (req, res, next) {
    // Promise have resolve and catch
    // resolve wants a fn
    // catch also want a fn
    Promise.resolve(requestHandler(req,res,next))
        .catch(function(err){
            next(err);
        });
  };
}

export { asyncHandler };
