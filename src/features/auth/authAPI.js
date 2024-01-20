// A mock function to mimic making an async request for data
export function createUser(userInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/create', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      }
      if (response.status === 401) {
        // const err = await response.text();
        // console.log(err);
        reject({ message: 'unauthorized' });
      }
    } catch (error) {
      reject(`error+catch`);
    }
  });
}
