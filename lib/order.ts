export interface OrderLine {
    n: string; // name
    q: number; // qty
    p: number; // price (актуальная)
    img?: string;
}

// UTF-8 безопасный base64, URL-friendly
export function encodeOrder(lines: OrderLine[]): string {
    const json = JSON.stringify(lines);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeOrder(str: string): OrderLine[] {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
}