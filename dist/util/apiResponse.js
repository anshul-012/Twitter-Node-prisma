"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = ApiResponse;
