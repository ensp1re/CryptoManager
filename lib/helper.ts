class UnthorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = "UnauthorizedError";
        this.message = "Unauthorized";
    }
}


export { UnthorizedError };