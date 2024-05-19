class ApiResponse {
    data;
    message;
    success;
    constructor(data, message) {
        this.data = data;
        this.message = message;
        this.success = true;
    }
}
export default ApiResponse;
