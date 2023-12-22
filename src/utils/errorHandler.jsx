export const errorHandler = {
    authError: (error, AuthErrorCodes) => {
      const errorMessage = {};
      switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          errorMessage.firebaseError = 'Password incorrect. Please try again';
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          errorMessage.firebaseError =
            'Too many attempts. Please try again later.';
          break;
        case 'auth/user-not-found':
          errorMessage.firebaseError = 'User does not exist';
          break;
        case 'invalid-login-admin':
          errorMessage.firebaseError = 'Current version does not support admin access';
          break;
        default:
          errorMessage.firebaseError = 'Incorrect email or password';
          break;
      }
      return errorMessage;
    },
  };