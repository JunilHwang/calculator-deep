export function selectElement<T = HTMLElement>(
  selector: string,
  parent: Element | Document = document
): T {
  return parent.querySelector(selector) as unknown as T;
}

export function selectElements<T = HTMLElement>(
  selector: string,
  parent: Element | Document = document
): T[] {
  return Array.from(parent.querySelectorAll(selector)) as unknown as T[];
}
