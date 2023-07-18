import { toast } from 'react-toastify';
import ToasterGlobal from '../ToasterGlobal';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('ToasterGlobal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays a success toast', () => {
    const message = 'Success message';
    const id = 'uniqueId';
    const type = 'success';

    ToasterGlobal(message, id, type);

    expect(toast.success).toHaveBeenCalledWith(message, {
      position: 'top-center',
      toastId: id,
      autoClose: 4000,
    });
  });

  it('displays an error toast', () => {
    const message = 'Error message';
    const id = 'uniqueId';
    const type = 'error';

    ToasterGlobal(message, id, type);

    expect(toast.error).toHaveBeenCalledWith(message, {
      position: 'top-center',
      toastId: id,
      autoClose: 4000,
    });
  });

  // Add more test cases for other toast types if needed
});
