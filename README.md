

<p align="center">Aplicação de criação e gerenciamentos de finanças feita em NodeJs com typescript seguindo os conceitos de SOLID </p> 
 <p align="center">Aplicação produzida como desafio curso IGNITE da <a href="https://www.rocketseat.com.br/">@rocketseat</a> </p>

<p align="center">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>  
</p>

## ℹ Sobre 

<p>A Aplicação consiste em uma API simples para criação e gerenciamento de finanças, com utilização de testes unitários para auxiliar o desenvolvimento
</p>


## 🚀 Tecnologias utilizadas
- [Typescript](https://www.typescriptlang.org/)
- [NodeJs](https://nodejs.org/en/)

## 👨‍💻 Rodando na sua máquina

**1:** Clone o repositório.

```
git clone https://github.com/DiegoVSouza/FinAPI.git

```

**2:** Acesse o diretório do projeto.

```
cd FinAPI
```

**3:** Instale as depedências
```
  yarn

```
**4:** Com docker instalado na sua maquina, crie um novo container e uma nova database
```
  docker run --name fin-api -e POSTGRES_DB=fin_api -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres

```
**5:** Inicie a aplicação.
```
  yarn dev
   
```

