# Overview - Wallety
![Screenshot from 2023-06-06 13-26-14](https://github.com/lucasKoyama/wallety/assets/121680414/cd67a86a-08c5-4cd2-9ec4-459b95178f38)
<!--
Think of the STAR + Hero Journey description for the entire README:
1. Situation: begin with the situation, what it aims to solve, and what the common problem is.
2. Tasks: What were my responsibilities? What challenges were I responsible for?
3. Action: What did I do to solve the challenge?
4. Results: solutions developed, value brought to the company, and users.
-->
<!-- SITUATION / COMMON PROBLEM -->
<details>
  <summary>Summary</summary>

  1. [Overview](https://github.com/lucasKoyama/wallety/blob/main/README.md#overview---wallety)
  2. [Features & Challenges solved](https://github.com/lucasKoyama/wallety/blob/main/README.md#-features--challenges-solved)
  3. [Tools used](https://github.com/lucasKoyama/wallety/blob/main/README.md#%EF%B8%8F-tools-used)
  4. [Authors](https://github.com/lucasKoyama/wallety/blob/main/README.md#-features--challenges-solved)
</details>
<p>
Web app for financial control of expenses, with options to add expenses manually or through a CSV file, displays expenses through a table with filtering, sorting and search options; expenses are also displayed through a graph!
</p>

<a href="https://my-wallety.vercel.app/carteira">
🌐DEMO LIVE - Click here to check it out on the web!
</a>

## 📌 Features & Challenges solved
<!-- TASKS / CHALLENGES -->
<details>
  <summary>Responsive page</summary>

The page was developed responsively, adapting to different screen sizes and devices. This ensures a consistent and pleasant experience for users, regardless of the device they are using.
</details>

<details>
  <summary>Inputs to fill out expenses information</summary>

Field to enter the amount, currency, payment method, expense type tag and a description of the expense. Material UI was used for the fields.
</details>

<details>
  <summary>Import expenses via CSV file</summary>

  The button that imports a CSV file allows you to add several expenses that are stored in a csv file with 3 columns, as long as the column headers are "tag," "value," and "description"!
</details>

<details>
  <summary>Expenses table with advanced options</summary>

The table contains all expenses entered through the fields and the CSV import button, it has filtering options by tag, payment method and currency used, it also contains ordering for values in both ascending and descending order. It is possible to search for any item in the table using its name too! Expenses from the table can be removed and edited. You can also customize the view of the columns by "hiding" some! An external component that uses Material UI was used for the table.
</details>

<details>
  <summary>"Donut graph"</summary>

Graph that displays the distribution of expenses by "tag" in relation to the total spent. The react-chartjs-2 library was used for the chart.
</details>

## 🛠️ Tools used
<!-- ACTION -->
<!-- SKILL_BADGE/NAME: DESCRIPTION WHY IT WAS USED -->

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

## Authors
- [lucasKoyama](https://github.com/lucasKoyama)

