class ApiResponse {
	data: any;
	message: string;
	success: boolean;

	constructor(data: any, message: string) {
		this.data = data;
		this.message = message;
		this.success = true;
	}
}

export default ApiResponse;
