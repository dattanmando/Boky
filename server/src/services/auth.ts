import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

// Front-end function to authenticate a token
export const authenticateToken = ({ req }: any) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    return req;
  }

  // Try to verify the token
  try {
    console.log('Token found:', token); // Log the token for debugging
    console.log('Secret Ket', process.env.JWT_SECRET_KEY); // Log the secret key for debugging
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    console.log('Here is data:', data); // Log the decoded data for debugging
    // If the token is valid, attach the user data to the request object
    req.user = data as JwtPayload;
  } catch (err) {
    // If the token is invalid, log an error message
    console.log('Error verifying token:', err);
    console.log('Invalid token');
  }

  // Return the request object
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({data:payload}, secretKey, { expiresIn: '1h' });
};
