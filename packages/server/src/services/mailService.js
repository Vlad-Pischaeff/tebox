'use strict';

const config = require('#s/config/config');
const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: false,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS
            }
        });
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: config.SMTP_USER,
            to,
            subject: 'Reset password',
            test: '',
            html: `
                <div style="height: 100%; padding: 1rem; background: aliceblue; border-radius: 12px">
                    <div>
                        <h4 style="margin: 0; padding: .5rem 0">chat application</h4>
                        </hr>
                        <a href="${link}">Click for reset password, link valid ${config.LIFETIME}</a>
                    </div>
                </div>
            `
        });
    }
}

module.exports = new MailService();
