
declare global {
	namespace Express {
		interface Request {
			user?: any; 
		}
	}
}
export type SignUPBody = {
    name:string,
    email :string,
    username:string,
    password:string
}

export type JwtDecodedTokenType = {
    id:any,
    username:string,
    email:string
}