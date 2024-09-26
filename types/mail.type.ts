export interface MailOption {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: [{}];
    filename?: string;
    path?: string;
}

export interface MailTransporter {
    host: string;
    port: number;
    secure: boolean;
    service?: string;
    auth: {
        user?: string;
        pass?: string;
    }
}