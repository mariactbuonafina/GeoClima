# 🤝 Guia de Contribuição para o Projeto GeoClima

Obrigado por querer contribuir com o **GeoClima**! Este documento orienta como colaborar com o repositório de forma padronizada e eficiente.

---

## 📋 Visão Geral

**GeoClima** é um aplicativo web desenvolvido com Angular que consome dados da API OpenWeatherMap, exibindo clima em tempo real, previsão estendida, alertas e funcionalidades de favoritos.

---

## 🧰 Pré-requisitos

Antes de começar, certifique-se de ter:

- Node.js (v18 ou superior)
- Angular CLI instalado globalmente
- Conta na OpenWeatherMap (para gerar sua API Key)
- (Opcional) Conta no Firebase para testes de autenticação
- Git instalado

---

## 📥 Como Clonar e Rodar Localmente

```bash
git clone https://github.com/seu-usuario/GeoClima.git
cd GeoClima
npm install
ng serve
```
---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça alterações e commit (`git commit -m 'feat: nova funcionalidade'`)
4. Push para sua branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request com descrição detalhada

---

## 🌿 Estratégia de Branches
- main: Código estável e pronto para produção.
- develop: Branch principal para desenvolvimento contínuo.
- feature/: Branches para novas funcionalidades, a partir de develop.
- bugfix/: Branches para correções de bugs, a partir de develop.
- release/: Branches para preparar lançamentos, a partir de develop.
- hotfix/: Branches para correções emergenciais, a partir de main.

---

## ✨ Boas Práticas
- Mantenha o código limpo, legível e consistente.
- Siga os padrões de código do projeto (estilo, nomenclatura, indentação).
- Comente partes complexas do código para facilitar a manutenção.
- Faça commits pequenos, com mensagens claras e descritivas.
- Teste suas alterações antes de enviar.
- Atualize a documentação sempre que necessário.
- Use pull requests para facilitar revisões e discussões.
- Responda aos feedbacks dos revisores de forma colaborativa.

---

## ❓ Dúvidas
- Consulte a documentação do projeto e issues abertas antes de perguntar.
- Caso não encontre a resposta, abra uma issue explicando sua dúvida.
- Use os canais oficiais de comunicação do projeto para suporte (Slack, Discord, e-mail, etc.).
- Seja claro e objetivo para receber ajuda mais rápida e eficaz.
