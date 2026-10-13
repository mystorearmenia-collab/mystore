export function normalizePhone(value: string): string | null {
  let phone = value.replace(/[\s()-]/g, "");
  if (/^0\d{8}$/.test(phone)) phone = `+374${phone.slice(1)}`;
  if (/^\d{8}$/.test(phone)) phone = `+374${phone}`;
  return /^\+[1-9]\d{7,14}$/.test(phone) ? phone : null;
}
export function validName(value: string): boolean {
  return value.trim().length <= 80 && /^[\p{L}\p{M}][\p{L}\p{M} '\u2019-]*$/u.test(value.trim());
}
