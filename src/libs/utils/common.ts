export function hexToAscii(str1 = '') {
  var hex = (str1 || '').toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function formatAddress(address: string) {
  if (!address) return '';
  console.log({ address });
  const first4Digits = address.slice(0, 4);
  const last4Digits = address.slice(-4);
  return first4Digits.concat('....', last4Digits);
}
