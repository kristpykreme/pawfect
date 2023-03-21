// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// //middleware
// app.use(cors());
// app.use(express.json()); //req.body

// //ROUTES//

// //create a todo

// app.post("/kris", async (req, res) => {
//   try {
//     const { uname } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO Users (uname) VALUES($1) RETURNING *",
//       [uname]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get all todos

// app.get("/kris", async (req, res) => {
//   try {
//     const allTodos = await pool.query("SELECT * FROM Users");
//     res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // //get a todo

// // app.get("/kris/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
// //       id
// //     ]);

// //     res.json(todo.rows[0]);
// //   } catch (err) {
// //     console.error(err.message);
// //   }
// // });

// // //update a todo

// // app.put("/kris/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { description } = req.body;
// //     const updateTodo = await pool.query(
// //       "UPDATE todo SET description = $1 WHERE todo_id = $2",
// //       [description, id]
// //     );

// //     res.json("Todo was updated!");
// //   } catch (err) {
// //     console.error(err.message);
// //   }
// // });

// // //delete a todo

// // app.delete("/kris/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
// //       id
// //     ]);
// //     res.json("Todo was deleted!");
// //   } catch (err) {
// //     console.log(err.message);
// //   }
// // });

// app.listen(port=3003, () => {
//   console.log("server has started on port", port);
// });
