
declare global {
	namespace Express {
		interface Request {
			user?: any; 
			rawBody?:any
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

export type PaymentPayloadBodyType = {
	price: number;
	image: string;
	name: string;
	userId: string;
};
