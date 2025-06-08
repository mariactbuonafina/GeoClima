# 🌦️ GeoClima - Web App de Monitoramento Climático

Aplicação web desenvolvida com Angular, com foco em monitoramento climático em tempo real e notificações meteorológicas inteligentes.

## 📋 Descrição do Projeto

Aplicação desenvolvida em Angular, integrando a API OpenWeatherMap para exibir clima atual, previsão estendida, busca por cidade e alertas via notificações push.

## 🎯 Objetivo

Permitir que usuários acompanhem o clima de qualquer cidade do mundo com previsões detalhadas e interativas, além de recursos de personalização e histórico.

## 👥 Equipe

| Função               | Nome                          | Responsabilidades                          |
|----------------------|-------------------------------|--------------------------------------------|
| Scrum Master         | Maria Clara T.                | Planejamento e gestão ágil                 |
| Gerente de Config    | Maria Clara T.                | Repositório, branches, padronização        |
| Documentador 1       | Maria Eduarda T.              | Casos de uso e protótipos                  |
| Documentador 2       | Luís Fernando Andrade da Silva | Diagramas UML, ER, fluxo de trabalho       |
| Desenvolvedor 1      | Maria Eduarda T.              | Integração da API e frontend responsivo    |
| Desenvolvedor 2      | Luís Fernando Andrade da Silva | Login, favoritos, armazenamento local      |

## ✨ Funcionalidades

- Consulta climática por cidade ou GPS
- Favoritos com armazenamento persistente
- Previsão por hora e por dia
- Histórico de buscas
- Notificações de alertas severos
- Interface responsiva (Mobile/Desktop)
- Cache local para navegação offline

## 🛠 Tecnologias

- Angular 17
- TypeScript
- OpenWeatherMap API
- Firebase Auth
- Capacitor Geolocation + Push
- Local Storage / IndexedDB

## 📚 Documentação de Casos de Uso

### 📑 Sumário

- [UC001 - Realizar Login no Sistema](#uc001--realizar-login-no-sistema)
- [UC002 - Realizar Cadastro de Usuário](#uc002--realizar-cadastro-de-usuário)
- [UC003 - Buscar Cidade e Verificar Clima](#uc003--buscar-cidade-e-verificar-clima)
- [UC004 - Adicionar Cidade aos Favoritos](#uc004--adicionar-cidade-aos-favoritos)
- [UC005 - Consultar Clima da Localização Atual (GPS)](#uc005--consultar-clima-da-localização-atual-gps)
- [UC006 - Receber Notificações Climáticas](#uc006--receber-notificações-climáticas)

---

### ✅ UC001 — Realizar Login no Sistema

- **Ator Principal:** Usuário  
- **Objetivo:** Permitir que o usuário entre no sistema utilizando credenciais válidas.  
- **Pré-condição:** O usuário deve possuir uma conta cadastrada.  
- **Pós-condição:** O usuário acessa as funcionalidades restritas (favoritos, histórico, notificações).  

**Fluxo Principal**
1. O usuário abre o app.
2. Insere e-mail e senha na tela de login.
3. O sistema valida as credenciais.
4. Se válidas, o usuário é autenticado e acessa a tela inicial.

**Fluxo Alternativo:**  
- O usuário clica em "Esqueci minha senha".  
- O sistema solicita o e-mail e envia um link de redefinição.  

**Tratamento de Exceções**
- E-mail ou senha inválidos.
- Conta não existente.
- Problemas de conexão com o servidor.

---

### ✅ UC002 — Realizar Cadastro de Usuário

- **Ator Principal:** Usuário  
- **Objetivo:** Permitir que novos usuários criem uma conta.  
- **Pré-condição:** Nenhuma.  
- **Pós-condição:** O usuário possui uma conta ativa no sistema.  

**Fluxo Principal**
1. O usuário seleciona “Criar Conta”.
2. Preenche nome, e-mail e senha.
3. O sistema valida os dados.
4. Cria a conta.
5. Usuário é redirecionado para a tela inicial.

**Tratamento de Exceções**
- E-mail já cadastrado.
- Senha fraca.
- Problemas na conexão.

---

### ✅ UC003 — Buscar Cidade e Verificar Clima

- **Ator Principal:** Usuário  
- **Objetivo:** Permitir que o usuário consulte o clima de qualquer cidade.  
- **Pré-condição:** Usuário autenticado ou visitante.  
- **Pós-condição:** Clima e previsão da cidade são exibidos.  

**Fluxo Principal**
1. O usuário digita o nome da cidade.
2. O sistema consulta a API OpenWeatherMap.
3. Exibe dados atuais: temperatura, clima, umidade e previsão.

**Tratamento de Exceções**
- Cidade não encontrada.
- API indisponível.
- Erro de conexão.

---

### ✅ UC004 — Adicionar Cidade aos Favoritos

- **Ator Principal:** Usuário  
- **Objetivo:** Salvar cidades favoritas para acesso rápido.  
- **Pré-condição:** Usuário autenticado.  
- **Pós-condição:** A cidade aparece na lista de favoritos.  

**Fluxo Principal**
1. O usuário acessa uma cidade.
2. Clica em “Adicionar aos Favoritos”.
3. O sistema salva a cidade no Firebase ou armazenamento local.

**Tratamento de Exceções**
- Falha no salvamento.
- Problemas de conexão.

---

### ✅ UC005 — Consultar Clima da Localização Atual (GPS)

- **Ator Principal:** Usuário  
- **Objetivo:** Permitir consulta do clima pela localização atual.  
- **Pré-condição:** Permissão de acesso ao GPS.  
- **Pós-condição:** Exibe previsão da localização atual.  

**Fluxo Principal**
1. O usuário escolhe “Usar minha localização”.
2. O app solicita acesso ao GPS.
3. O sistema obtém coordenadas e consulta a API.

**Tratamento de Exceções**
- Permissão de GPS negada.
- GPS indisponível.
- API indisponível.

---

### ✅ UC006 — Receber Notificações Climáticas

- **Ator Principal:** Usuário  
- **Objetivo:** Alertar sobre mudanças climáticas severas.  
- **Pré-condição:** Notificações ativas.  
- **Pós-condição:** Recebe push notifications com alertas.  

**Fluxo Principal**
1. O sistema verifica mudanças severas.
2. Envia notificação push ao usuário.
3. Usuário acessa o alerta via app.

**Tratamento de Exceções**
- Permissão negada.
- Falha no envio.

---

## 🚀 Como Executar

```bash
git clone https://github.com/mariactbuonafina/GeoClima.git
cd GeoClima
npm install
ng serve

---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça alterações e commit (`git commit -m 'feat: nova funcionalidade'`)
4. Push para sua branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request com descrição detalhada

---

## 📝 Licença

Este projeto está licenciado sob a [Creative Commons 1.0 Universal]
