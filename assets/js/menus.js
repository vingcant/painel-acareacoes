/**
 * menus — comportamento de "popover" para os <details class="menu">.
 *
 * Fecha ao clicar fora, ao apertar Esc e depois de acionar um botão de
 * dentro (para o menu não ficar pendurado na tela). Usado nas variantes
 * B e C, onde preferências, filtros e ações em massa vivem em menus.
 */
(function () {
  'use strict';

  function abertos() {
    return document.querySelectorAll('details.menu[open]');
  }

  function fecharTodos(exceto) {
    abertos().forEach(m => { if (m !== exceto) m.open = false; });
  }

  document.addEventListener('click', e => {
    const menu = e.target.closest('details.menu');

    // clique fora de qualquer menu: fecha tudo
    if (!menu) { fecharTodos(null); return; }

    // abrir um menu fecha os outros
    if (e.target.closest('summary')) { fecharTodos(menu); return; }

    // acionou um botão de dentro do painel: fecha o menu
    if (e.target.closest('.menu-painel .btn')) menu.open = false;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharTodos(null);
  });
})();
