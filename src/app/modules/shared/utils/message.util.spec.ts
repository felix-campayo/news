import { MessageUtil } from './message.util';
import { Message } from 'primeng/components/common/api';
import { TestBed } from '@angular/core/testing';

describe('MessageUtil', () => {
    let messageUtil: MessageUtil;
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [MessageUtil] });
      messageUtil = TestBed.get(MessageUtil);
    });

  it('should return success message', () => {
    const successContent = 'Success content';
    const msg: Message[] = messageUtil.getSuccessMessage(successContent);
    expect(msg).toEqual([{ severity: 'success', summary: 'Success Message', detail: successContent }]);
  });

  it('should return error message', () => {
    const errorContent = 'Error content';
    const msg: Message[] = messageUtil.getErrorMessage(errorContent);
    expect(msg).toEqual([{ severity: 'error', summary: 'Error Message', detail: errorContent }]);
  });
});
