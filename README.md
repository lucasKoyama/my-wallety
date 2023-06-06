# Wallety
![Screenshot from 2023-06-06 13-26-14](https://github.com/lucasKoyama/wallety/assets/121680414/cd67a86a-08c5-4cd2-9ec4-459b95178f38)
[Wallety](https://my-wallety.vercel.app/carteira)
## :computer: Sobre
Web app para controle financeiro das despesas, com opções de adicionar despesas manualmente ou por meio de um arquivo CSV, as despesas são exibidas por meio de uma tabela
com opções de filtragem, ordenação e pesquisa, também é exibida as despesas por meio de um gráfico!

## :pushpin: Features
<details>
  <summary>Página responsiva</summary>
  A página foi desenvolvida de forma responsiva, adaptando-se a diferentes tamanhos de tela e dispositivos. Isso garante uma experiência consistente e agradável para os usuários, independentemente do dispositivo que estão utilizando.
</details>

<details>
  <summary>Campos para preencher informações da despesa</summary>
  Campo para inserir o valor, a moeda, o método de pagamento, a tag do tipo de gasto e uma descrição para o gasto. Foi usados Material UI para os campos.
</details>

<details>
  <summary>Importar despesa por CSV</summary>
  O botão que faz a importação de um arquivo CSV permite adicionar várias despesas que estão armazenadas em um arquivo csv com as 3 colunas, desde que o cabeçario das colunas sejam "tag", "valor" e "descricao"!
</details>

<details>
  <summary>Tabela com as despesas, com opções avançadas de tabela</summary>
  A tabela contém todas as despesas inseridas pelos campos e pelo botão de importar o CSV, ela tem opções de filtragem por tag, método de pagamento e moeda usada, também contém ordenação 
  para os valores tanto em ordem crescente quanto decrescente. É possível fazer uma pesquisa de qualquer item da tabela através do nome dele também! As despesas da tabela pode ser removida e editada, é
  possível também personalizar a visualização das colunas "escondendo" algumas! Foi usado um componente externo que usa Material UI para a tabela.
</details>

<details>
  <summary>Gráfico de "Donut"</summary>
  Gráfico que exibe a distribuição dos gastos por "tag" em relação ao total gasto. Foi utilizado a biblioteca react-chartjs-2 para o gráfico.
</details>

## :rocket: Tecnologias usadas
1.  Javascript
2.  Html
3.  Css
4.  Unix & bash
5.  React
6.  Redux
7.  Material UI - React Lib
8.  React CHart JS 2 - React Lib
