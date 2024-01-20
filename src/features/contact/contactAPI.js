// A mock function to mimic making an async request for data
export function createComment(commentInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/contacts', {
      method: 'POST',
      body: JSON.stringify(commentInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = response.json();
    resolve({ data });
  });
}
