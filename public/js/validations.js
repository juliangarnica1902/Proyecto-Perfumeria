(function () {
  var EMAIL = /^\S+@\S+\.\S+$/;
  var IMG = /\.(jpe?g|png|gif)$/i;

  var rules = {
    register: {
      firstName: function (v) { return v.trim() ? (v.trim().length >= 2 || 'El nombre debe tener al menos 2 caracteres.') : 'El nombre es obligatorio.'; },
      lastName: function (v) { return v.trim() ? (v.trim().length >= 2 || 'El apellido debe tener al menos 2 caracteres.') : 'El apellido es obligatorio.'; },
      email: function (v) { return v.trim() ? (EMAIL.test(v.trim()) || 'Ingresa un correo válido, por ejemplo tucorreo@ejemplo.com.') : 'El correo es obligatorio.'; },
      image: function (v) { return !v || IMG.test(v) || 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.'; },
      password: function (v) {
        if (!v) return 'La contraseña es obligatoria.';
        if (v.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
        if (!/[a-z]/.test(v)) return 'La contraseña debe incluir una letra minúscula.';
        if (!/[A-Z]/.test(v)) return 'La contraseña debe incluir una letra mayúscula.';
        if (!/\d/.test(v)) return 'La contraseña debe incluir un número.';
        if (!/[^A-Za-z0-9]/.test(v)) return 'La contraseña debe incluir un carácter especial (por ejemplo ! # $ .).';
        return true;
      },
      password2: function (v, form) { return v === form.elements.password.value || 'Las contraseñas no coinciden.'; }
    },
    login: {
      email: function (v) { return v.trim() ? (EMAIL.test(v.trim()) || 'Ingresa un correo válido, por ejemplo tucorreo@ejemplo.com.') : 'El correo es obligatorio.'; },
      password: function (v) { return !!v || 'La contraseña es obligatoria.'; }
    },
    product: {
      name: function (v) { return v.trim() ? (v.trim().length >= 5 || 'El nombre debe tener al menos 5 caracteres.') : 'El nombre es obligatorio.'; },
      description: function (v) { return v.trim() ? (v.trim().length >= 20 || 'La descripción debe tener al menos 20 caracteres.') : 'La descripción es obligatoria.'; },
      image: function (v) { return !v || IMG.test(v) || 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.'; },
      price: function (v) { return (/^\d+$/.test(v) && Number(v) > 0) || 'Ingresa un precio válido, mayor que 0.'; }
    }
  };

  function valueOf(el) {
    if (el.type === 'file') return el.files && el.files[0] ? el.files[0].name : '';
    return el.value;
  }

  function show(el, message) {
    var field = el.closest('.field');
    if (!field) return;
    var p = field.querySelector('.msg-error');
    if (!p) { p = document.createElement('p'); p.className = 'msg-error'; field.appendChild(p); }
    if (message === true) { field.classList.remove('error'); p.textContent = ''; }
    else { field.classList.add('error'); p.textContent = message; }
  }

  function check(form, name) {
    var el = form.elements[name];
    if (!el) return true;
    var result = rules[form.dataset.validate][name](valueOf(el), form);
    show(el, result);
    return result === true;
  }

  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var set = rules[form.dataset.validate];
    if (!set) return;
    Object.keys(set).forEach(function (name) {
      var el = form.elements[name];
      if (!el) return;
      el.addEventListener('blur', function () { check(form, name); });
      el.addEventListener('change', function () { check(form, name); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('error')) check(form, name); });
    });
    form.addEventListener('submit', function (ev) {
      var firstBad = null;
      Object.keys(set).forEach(function (name) {
        if (!check(form, name) && !firstBad) firstBad = form.elements[name];
      });
      if (firstBad) { ev.preventDefault(); firstBad.focus(); }
    });
  });
})();
