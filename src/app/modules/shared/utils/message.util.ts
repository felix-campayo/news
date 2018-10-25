import { Message } from 'primeng/components/common/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageUtil {

    public getSuccessMessage(content: string): Message[] {
        return [{ severity: 'success', summary: 'Success Message', detail: content }];
    }

    public getErrorMessage(content: string): Message[] {
        return [{ severity: 'error', summary: 'Error Message', detail: content }];
    }
}
