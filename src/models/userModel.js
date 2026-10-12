const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'users.json');

const readAll = () => { try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); } catch { return []; } };
const writeAll = (list) => fs.writeFileSync(FILE, JSON.stringify(list, null, 2));

module.exports = {
  findByEmail: (email) => readAll().find((u) => u.email === String(email).trim().toLowerCase()),
  create(data) {
    const list = readAll();
    const user = { id: list.reduce((m, u) => Math.max(m, u.id), 0) + 1, ...data };
    list.push(user);
    writeAll(list);
    return user;
  }
};
