import jwt from 'jsonwebtoken';

export type JwtPayload = { id: string, email: string, role: string };

export class Jwt{

    static createJwt(user: JwtPayload): string {
        let jwtSecretKey = process.env.JWT_SECRET;
 
        if(!jwtSecretKey){
         throw new Error('JWT_SECRET is not defined');
        }
 
         let data: JwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role
         };
 
         const token = jwt.sign(data, jwtSecretKey, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
         }as jwt.SignOptions);
 
         return token;
 
     }

    static verifyJwt(token: string): JwtPayload {
        const jwtSecretKey = process.env.JWT_SECRET as string;
        
        if (!jwtSecretKey) {
            throw new Error('JWT_SECRET is not defined');
        }
        
        try {
            const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

}