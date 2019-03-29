export function getHeaders(): void | null {
  if (window.location.hostname === 'localhost') {
    return null;
  }
}
export function handleErrors(response: any): any {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
