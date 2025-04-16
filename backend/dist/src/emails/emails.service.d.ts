export declare class EmailsService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendResetPasswordEmail(email: string, token: string): Promise<void>;
    sendOrderStatusEmail(email: string, orderId: number, status: 'processing' | 'shipped' | 'delivered' | 'cancelled'): Promise<void>;
}
