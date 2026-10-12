const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'products.json');

const readAll = () => JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const writeAll = (list) => fs.writeFileSync(FILE, JSON.stringify(list, null, 2));

module.exports = {
  findAll: () => readAll(),
  findById: (id) => readAll().find((p) => p.id === Number(id)),
  create(data) {
    const list = readAll();
    const product = { id: list.reduce((m, p) => Math.max(m, p.id), 0) + 1, ...data };
    list.push(product);
    writeAll(list);
    return product;
  },
  update(id, data) {
    const list = readAll();
    const i = list.findIndex((p) => p.id === Number(id));
    if (i === -1) return null;
    list[i] = { ...list[i], ...data, id: list[i].id };
    writeAll(list);
    return list[i];
  },
  delete(id) {
    const list = readAll();
    const rest = list.filter((p) => p.id !== Number(id));
    writeAll(rest);
    return rest.length !== list.length;
  }
};
