// A mock function to mimic making an async request for data
export function fetchSubCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/subCategories');
    const data = await response.json();
    console.log(data, 'sub cat');
    resolve({ data });
  });
}
export function fetchLocation() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/location');
    const data = response.json();
    resolve({ data });
  });
}
export function fetchSalary() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/salary');
    const data = response.json();
    resolve({ data });
  });
}
export function fetchWorkExp() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/Workexperience');
    const data = response.json();
    resolve({ data });
  });
}
export function fetchJobs(filter, pagi) {
  let api = 'http://localhost:8080/jobs?';
  for (let key in pagi) {
    api += `${key}=${pagi[key]}&`;
  }
  //TODO: aikhane any where abong any experience ar modde kisu jamela ace hoyto backend e dekte hobe
  for (let key in filter) {
    if (filter[key] !== 'Any Where' && filter[key] !== 'Any experience') {
      api += `${key}=${filter[key]}&`;
    }
  }
  console.log(api);
  return new Promise(async (resolve) => {
    const response = await fetch(api);

    const data = await response.json();
    const totalItems = response.headers.get('total');

    resolve({ data: { jobItems: data, totalItems } });
    console.log(totalItems, 'totres');
  });
}

export function fetchSubCategoriesJob(subCategories) {
  let api = '';
  if (subCategories === 'All Jobs') {
    api = `http://localhost:8080/jobs?`;
  } else {
    api = `http://localhost:8080/jobs?employment_type=${subCategories}`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(api);
    const data = response.json();
    resolve({ data });
  });
}
export function fetchJobsByTitle(title) {
  let api = '';
  if (title !== '') {
    api = `http://localhost:8080/jobs?title=${title}`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(api);
    const data = response.json();
    const totalItems = response.headers.get('total');
    resolve({ data: { jobItems: data, totalItems } });
  });
}
