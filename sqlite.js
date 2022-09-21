 const fs        = require("fs");
 const dbFile    = "./bancodados/exercicios2.db";
 const exists    = fs.existsSync(dbFile);
 const sqlite3   = require("sqlite3").verbose();
 const dbWrapper = require("sqlite");
 const casual    = require("casual");
 let db;
 
 dbWrapper
   .open({
     filename: dbFile,
     driver: sqlite3.Database
   })
   .then(async dBase => {
     db = dBase;
 
     try {       
       if (!exists) {
         await db.run(
           "CREATE TABLE Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT,ativo integer);"           
         ); 
         console.log('Tentei'); 
         await db.run(
          "CREATE TABLE Progresso (exercicio integer);INSERT INTO Progresso (exercicio) VALUES (1)"
         );

         await db.run(
          "INSERT INTO Progresso (exercicio) values (1)"
         );

         console.log(await db.all("SELECT * FROM Messages m"));
       }       
     } catch (dbError) {
       console.error(dbError);
     }
   });
 
 module.exports = { 
    getMessage: async id => {
    try {
      return await db.all("SELECT * FROM Messages m WHERE id="+ id);
    } catch (dbError) {
      console.error(dbError);
    }
  }, 
  
  getMessages: async () => {
     try {
       return await db.all("SELECT * FROM Messages m INNER JOIN Progresso p on p.exercicio = m.id");
     } catch (dbError) {
       console.error(dbError);
     }
   },

   getAllMessages: async () => {
    try {
      return await db.all("SELECT * FROM Messages m ");
    } catch (dbError) {
      console.error(dbError);
    }
  },
 
   // Add new message
   addMessage: async message => {
     let success = false;
     try {
       console.log('Message:',message); 
       success = await db.run("INSERT INTO Messages (message,ativo) VALUES (?,0)", [
         message
       ]);

     } catch (dbError) {
       console.error(dbError);
     }
     return success.changes > 0 ? true : false;
   },

   updateExercicio:  async (id, message) => {
    let success = false;
    try {
      success = await db.run(
        "Update Messages SET message =? WHERE id = ?",
        message,
        id        
      );
      console.log("id:" + id + " - "+ message); 
    } catch (dbError) {
      console.error(dbError);
    }
    return success.changes > 0 ? true : false;
   },
   
   updateMessage: async (id, message,ativo) => {
     let success = false;
     try {
       success = await db.run(
         "Update Messages SET ativo =? WHERE id = ?",
         message,
         id,
         ativo 
       );
     } catch (dbError) {
       console.error(dbError);
     }
     return success.changes > 0 ? true : false;
   },

   updateProgresso: async (exercicio) => {
    let success = false;
    try {
      success = await db.run(
        "Update Progresso SET exercicio=?",
         exercicio
      );
    } catch (dbError) {
      console.error(dbError);
    }
    return success.changes > 0 ? true : false;
  },
 
   deleteMessage: async id => {
     let success = false;
     try {
       success = await db.run("Delete from Messages WHERE id = ?", id);
     } catch (dbError) {
       console.error(dbError);
     }
     return success.changes > 0 ? true : false;
   }
 };
 