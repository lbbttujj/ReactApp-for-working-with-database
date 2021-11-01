const config                = require('./dbConfig'),
      sql                   = require('mssql');







const getAll = async(body)=>{
    try{
        console.log(`SELECT * from ${body.bd}  ${body.where} ${body.from}`);
        let pool = await sql.connect(config);
        let books = await pool.request().query(`SELECT * from ${body.bd}  ${body.where} ${body.from}`)
        return books
    }
    catch(error){
        console.log(error);
    }
}



const deleteRow = async(props)=>{
    try{
        let pool = await sql.connect(config);
       await pool.request()
        .query(
            `DELETE FROM ${props.bd} WHERE ${props.field}= '${props.name}' `
            )
        console.log('delete done');
    }
    catch(error){
        console.log(error);
    }
}



const createAuthor = async(Author)=>{
    try{
        let pool = await sql.connect(config);
        let author =  await pool.request()
        .query(
            `INSERT INTO Автор VALUES
            ('${Author.FIO}','${Author.Born}','${Author.Phone}','${Author.Gender}','${Author.Email}')
            `
            )
        return author
    }
    catch(error){
        console.log(error);
    }
}
const createBook = async(Book)=>{
    try{
        // console.log(Book);
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Книги VALUES
            ('${Book.Name}','${Book.Count}','${Book.State}',
            '${Book.price}','${Book.booksID}','${Book.contractNumber}')
            `
            )
        // console.log(book);
        // console.log(Book.Name);
        return book
    }
    catch(error){
        console.log(error);
    }
}
const createContract = async(Book)=>{
    try{
        // console.log(Book);
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Контракт VALUES
            ('${Book.contractNumber}','${Book.Name}','${Book.circulation}', '${Book.term}',
            '${Book.СonclusionDate}','${Book.fee}','${Book.Id_Sotr}', 
            '${Book.StatusAppl}','${Book.CountBooks}','${Book.genre}')`
            )
        // console.log(book);
        // console.log(Book.Name);
        return book
    }
    catch(error){
        console.log(error);
    }
}
const createClient = async(Book)=>{
    try{
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Клиент VALUES
            ('${Book.Id_client}','${Book.FIO}','${Book.Gender}',
             '${Book.Born}',
            '${Book.Phone}')`
            )
        return book
    }
    catch(error){
        console.log(error);
    }
}
const createAppl = async(Book)=>{
    try{
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Заявки VALUES
            ('${Book.numAppl}','${Book.FIO}','${Book.date}',
             '${Book.countBooks}',
            '${Book.genre}')`
            )
        return book
    }
    catch(error){
        console.log(error);
    }
}
const createApplBook = async(Book)=>{
    try{
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Заявки_Книги VALUES
            ('${Book.numBook}','${Book.numAppl}','${Book.nameBook}',
             '${Book.descrip}',
            '${Book.link}')`
            )
        return book
    }
    catch(error){
        console.log(error);
    }
}
const createSotr = async(Book)=>{
    try{
        let pool = await sql.connect(config);
        let book =  await pool.request()
        .query(
            `INSERT INTO Сотрудник VALUES
            ('${Book.Id_sotr}','${Book.FIO}','${Book.Gender}',
             '${Book.post}', '${Book.salary}',
            '${Book.Phone}')`
            )
        return book
    }
    catch(error){
        console.log(error);
        console.log(       `INSERT INTO Сотрудник VALUES
        ('${Book.Id_sotr}','${Book.FIO}','${Book.Gender}',
         '${Book.post}', '${Book.salary}',
        '${Book.Phone}')`);
    }
}




const updateAll = async(Author)=>{
    try{
        let pool = await sql.connect(config);

        if(Author.type == 'book')
        {
            let book =  await pool.request()
            .query(
                `UPDATE Книги SET 
                 [Название Книги] = '${Author.Name}' , 
                 Количество ='${Author.Count}' ,
                 Состояние = '${Author.State}',
                 Цена = '${Author.Price}',
                 [Номер Контракта] = '${Author.ContractNumber}'
                 
                WHERE  [Название Книги]  = '${Author.Name}' `
                )
            return book
        }
             if(Author.type == 'contract')
        {

            console.log( `UPDATE Контракт SET Тираж = '${Author.circulation}', Срок = '${Author.term}', Гонорар = '${Author.fee}' WHERE  [Номер контракта]  = '${Author.contractNumber}' `)
            let contract =  await pool.request()
            .query(
                `UPDATE Контракт SET 
                 
                 [Состояние Заявки] = '${Author.StatusAppl}',
                 Тираж = '${Author.circulation}',
                 Срок = '${Author.term}',
        
                 Гонорар = '${Author.fee}'
               
                 
                 
                 
                WHERE  [Номер контракта]  = '${Author.contractNumber}' `
                )
            return contract
        }
         if(Author.type == 'client')
        {
            let contract =  await pool.request()
            .query(
                `UPDATE Клиент SET 
                 ФИО ='${Author.FIO}' ,
                 Пол = '${Author.Gender}',
                 [Дата Рождения] = '${Author.Born}',
                 [Номер Телефонв] = '${Author.Phone}'
                 
                WHERE ID_Клиента  = '${Author.Id_client}' `
                )
            return contract
        }
        if(Author.type == 'sotr')
        {
            let sotr =  await pool.request()
            .query(
                `UPDATE Сотрудник SET 
                 ФИО ='${Author.FIO}' ,
                 Зарплата = '${Author.salary}',
                 [Номер Телефона] = '${Author.Phone}'
                 
                WHERE  ID_Сотрудника  = '${Author.Id_sotr}' `
                )
            return sotr
        }
        if(Author.type == 'author'){
   
        let author =  await pool.request()
        .query(
            `UPDATE Автор SET

            [Номер Телефона] = '${Author.Phone}',
            Email = '${Author.email}'
            
           WHERE  [ФИО Автора] = '${Author.FIO}' `
            )
        return author
        }
    }
    catch(error){
        console.log(error);
        
    }
}



module.exports = {
    deleteRow,
    createAuthor,
    createContract,
    createBook,
    createSotr,
    createClient,
    updateAll,
    createAppl,
    createApplBook,
    getAll
}
