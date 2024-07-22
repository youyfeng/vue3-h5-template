export const detectPlatform = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.match(/MicroMessenger/i)) {
    return 'wechat';
  } else if (userAgent.match(/AlipayClient/i)) {
    return 'alipay';
  } else {
    return 'other';
  }
}