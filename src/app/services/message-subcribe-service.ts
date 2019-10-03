import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageSubcribeData } from '../models/message-subcribe-data';

@Injectable({ providedIn: 'root' })
export class MessageSubcribeService {
    private subject = new Subject<MessageSubcribeData>();

    sendMessage(messageData: MessageSubcribeData) {
        this.subject.next(messageData);
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<MessageSubcribeData> {
        return this.subject.asObservable();
    }
}
