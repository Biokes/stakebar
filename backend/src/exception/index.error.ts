
class YeildFiException extends Error {
    private readonly errorMessage: string;
    private readonly description: string;
    constructor(errorMessage: string, description: string) {
        super(errorMessage)
        this.description = description;
        this.errorMessage = errorMessage;
    }
    public getErrorMessage(): string {
        return this.errorMessage;
    }
    public getErrorDescription(): string { 
        return this.description;
    }
}

export { YeildFiException }