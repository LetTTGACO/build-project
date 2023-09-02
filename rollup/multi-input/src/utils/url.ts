
export function parseMultiJson(text: string) {
  const regex = /{[^{}]+}/g; // 匹配以 "{" 开始，以 "}" 结束的内容
  const matches = text.match(regex);

  if (matches && matches.length > 0) {
    try {
      return matches.map((match) => JSON.parse(match));
    } catch (e) {
      console.error('parseMultiJson error', e.message);
      return null;
    }
  } else {
    return null;
  }
}
