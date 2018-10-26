import { Message, MessageService } from 'primeng/components/common/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageUtil {

    public constructor(private messageService: MessageService) { }

    public addSuccessMessage(key: string, content: string): void {
        this.messageService.clear();
        this.messageService.add({ key: key, severity: 'success', summary: 'Success Message', detail: content });
    }

    public addErrorMessage(key: string, content: string): void {
        this.messageService.clear();
        this.messageService.add({ key: key, severity: 'error', summary: 'Error Message', detail: content });
    }
}
