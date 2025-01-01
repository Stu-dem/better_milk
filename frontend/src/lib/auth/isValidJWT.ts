import * as jwt from "jsonwebtoken";

export default function isValidJWT(token: string) {
  const JWT_SECRET = process.env.BACKEND_SECRET;

  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET as jwt.Secret, function (err: jwt.VerifyErrors | null) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
