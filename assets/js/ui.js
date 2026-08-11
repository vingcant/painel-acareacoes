/**
 * UI — utilidades de interface sem vínculo com o domínio: toast e cópia
 * para a área de transferência. Servem a qualquer tela.
 */
window.App = window.App || {};
window.App.UI = (function () {
  'use strict';

  const DURACAO_TOAST = 2000;
  const DURACAO_FEEDBACK_BOTAO = 2000;

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), DURACAO_TOAST);
  }

  /** Fallback para navegadores/contextos sem a Clipboard API (inclui file://). */
  function copiarViaTextarea(texto) {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  /** Marca o botão como "Copiado!" e restaura o rótulo original depois. */
  function piscarBotao(botao) {
    if (!botao) return;
    const original = botao.innerHTML;
    botao.classList.add('btn-copied');
    botao.innerHTML = '<i class="ti ti-check"></i> Copiado!';
    setTimeout(() => {
      botao.classList.remove('btn-copied');
      botao.innerHTML = original;
    }, DURACAO_FEEDBACK_BOTAO);
  }

  /**
   * @param {string} texto
   * @param {object} opcoes  { botao?: HTMLElement, mensagem?: string }
   */
  function copiar(texto, opcoes) {
    const o = opcoes || {};
    const confirmar = () => {
      toast(o.mensagem || 'Copiado!');
      piscarBotao(o.botao);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(confirmar).catch(() => {
        copiarViaTextarea(texto);
        confirmar();
      });
    } else {
      copiarViaTextarea(texto);
      confirmar();
    }
  }

  return { toast, copiar };
})();
