const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'users.json');

const readAll = () => { try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); } catch { return []; } };
const writeAll = (list) => fs.writeFileSync(FILE, JSON.stringify(list, null, 2));

module.exports = {
  findAll: () => readAll(),
  findById: (id) => readAll().find((u) => u.id === Number(id)),
  findByEmail: (email) => readAll().find((u) => u.email === String(email).trim().toLowerCase()),
  findByToken: (hash) => readAll().find((u) => u.rememberToken && u.rememberToken === hash),
  create(data) {
    const list = readAll();
    const user = { id: list.reduce((m, u) => Math.max(m, u.id), 0) + 1, ...data };
    list.push(user);
    writeAll(list);
    return user;
  },
  update(id, data) {
    const list = readAll();
    const i = list.findIndex((u) => u.id === Number(id));
    if (i === -1) return null;
    list[i] = { ...list[i], ...data, id: list[i].id };
    writeAll(list);
    return list[i];
  }
};
