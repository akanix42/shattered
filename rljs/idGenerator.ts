let nextId = 1;
export default function generateId() {
  return nextId++;
}

export function setNextId(id: number) {
  nextId = id;
}
