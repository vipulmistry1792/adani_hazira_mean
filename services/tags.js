const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT *  FROM adani_data'
  );
  const data = helper.emptyOrRows(rows);
  //const meta = {page};

  return data;
}
async function getRTUTags(prototype = "Modbus RTU"){
  const offset = helper.getOffset(1, config.listPerPage);
  const rows = await db.query(
    'SELECT * FROM adani_data ', 
    [prototype]
  );
  const data = helper.emptyOrRows(rows);
  //const meta = {page};

  return data;
}
async function create(tag){
    //validateCreate(tag);
    console.log(tag);
    const result = await db.query(
      'INSERT INTO adani_data (t_1, t_2,t_3,t_4,t_5,t_6,t_7,t_8,t_9,t_10) VALUES (?, ?,?,?,?,?,?,?,?,?)', 
      [tag.t_1, tag.t_2,tag.t_3,tag.t_4,tag.t_5,tag.t_6,tag.t_7,tag.t_8,tag.t_9,tag.t_10]
    );
  
    let message = 'Error in creating Tag';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag created successfully';
      type    = 2;
      //datafiled(tag);
    }
  
    return {message,type};
  }
  async function DeleteTag(id,tag){
    //validateCreate(tag);
    console.log(tag);
    const result = await db.query(
      `delete from  adani_data where id=?`,[id]);
    let message = 'Error in Tag Deleteing';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag Delete successfully';
      type    = 2;
    //  datafiled(tag);
    datafiledDelete(tag) 
    }
   // 
    return {message,type};
  }
  async function insert_data(query){
    //validateCreate(tag);
    const result = await db.query(query);
  
    let message = 'Error in creating Tag';
  
    if (result.affectedRows) {
      message = 'Tag created successfully';
      datafiled(tag);
    }
  
    return {message};
  }
  async function insert_data_tags(query){
    //validateCreate(tag);
    const result = await db.query(query);
  
    let message = 'Error in creating Tag';
  
    if (result.affectedRows) {
      message = 'Tag created successfully';
      //datafiled(tag);
    }
  
    return {message};
  }
  async function update(tag){
    //validateCreate(tag);
    const result = await db.query(
      'update adani_data set t_1=?, t_2=?,t_3=?,t_4=?,t_5=?,t_6=?,t_7=?,t_8=?,t_9=?,t_10=? where id=?', 
      [tag.t_1, tag.t_2,tag.t_3,tag.t_4,tag.t_5,tag.t_6,tag.t_7,tag.t_8,tag.t_9,tag.t_10,tag.id]
    );
  
    let message = 'Error in Updating Tag';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag Updated successfully';
      type    = 2;
      //datafiled(tag);
    }
  
    return {message,type};
  }
  module.exports = {
    getMultiple,
    create,
    getRTUTags,
    insert_data,
    insert_data_tags,
    DeleteTag,
    update
  }