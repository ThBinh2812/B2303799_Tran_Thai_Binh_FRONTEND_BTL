import { useNotification } from 'naive-ui';

export function useNotify() {
  const notification = useNotification();

  const messageType = {
    success: (msg) =>
      notification.success({
        title: 'Thành công',
        content: msg,
        duration: 3000,
      }),
    error: (msg) =>
      notification.error({
        title: 'Lỗi!',
        content: msg,
        duration: 3000,
      }),
    warning: (msg) =>
      notification.warning({
        title: 'Cảnh báo!',
        content: msg,
        duration: 3000,
      }),
    info: (msg) =>
      notification.info({
        title: 'Thông báo',
        content: msg,
        duration: 3000,
      }),
  };

  return messageType;
};
