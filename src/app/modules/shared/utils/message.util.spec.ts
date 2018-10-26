import { MessageUtil } from './message.util';
import { MessageService } from 'primeng/components/common/api';
import { TestBed } from '@angular/core/testing';

describe('MessageUtil', () => {
  let messageUtil: MessageUtil;
  let messagService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    TestBed.configureTestingModule({
      providers: [
        MessageUtil,
        { provide: MessageService, useValue: spy }
      ]
    });
    messageUtil = TestBed.get(MessageUtil);
    messagService = TestBed.get(MessageService);
  });

  it('should return success message', () => {
    messageUtil.addSuccessMessage('', '');
    expect(messagService.add).toHaveBeenCalled();
  });

  it('should return error message', () => {
    messageUtil.addErrorMessage('', '');
    expect(messagService.add).toHaveBeenCalled();
  });
});
