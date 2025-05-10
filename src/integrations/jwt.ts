import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/contants'

export class JwtService {

    //Creating Access Token
    async createToken(user: Object | undefined, role: string): Promise<String | undefined>{
        try {
            const syncToken = await jwt.sign(
                { user, role },
                String(JWT_SECRET),
                { expiresIn: '2h' }
            )
            return syncToken
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //Creating Refresh Token
    async createRefreshToken(user: Object | undefined, role: string): Promise<String | undefined> {
        try {
            const syncToken = await jwt.sign(
                { user, role },
                String(JWT_SECRET),
                { expiresIn: '7d' }
            )
            return syncToken
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //Expiration verifyToken
    async isTokenExpired (token: string): Promise<Boolean | null> {
        try {
            const decodedToken: any = jwt.decode(token)
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp < currentTime
        } catch (error) {
            console.log("Error in access token expiry Check :", error);
            throw new Error("user not authorised");
        }
    }

}