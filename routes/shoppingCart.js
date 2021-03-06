const express = require('express');
const ql = require("./mydb");
var {success, fail} = require('./util')

//添加购物车 插入数据
var shoppingCart = function(req,resp){
    var userName = req.body.userName;
    var productId = req.body.productId;
    var size = req.body.size;
    var number=req.body.value;
    // console.log(userName,fruitId,quantity)
    var sql = 'insert into shoppingcart (p_id,sc_quantity,u_name,sc_size)values (?,?,?,?)'
    ql.dbConn.sqlConnect(sql,[productId,number,userName,size],function(err,data){
        if(data!='undifined'){
            resp.send(success());
        }else{
            resp.send(fail());
        }
    });
}

//渲染购物车页面
var showCart = function(req,resp){
    var userName = req.query.userName;
    console.log(userName);
    var sql = 'select sc_id,ci_name,sc_quantity,sc_size,ci_price,img_src1 from shoppingCart,goods_info where u_name = ? and p_id = ci_id ';
    ql.dbConn.sqlConnect(sql,[userName],function(err,data){
        console.log(err)
        resp.render('shoppingCart',{data:data});
    });
}

//删除购物车数据
var deleteCart = function(req,resp){
    var id = req.body.id;
    var sql = 'delete from shoppingCart where sc_id = ?';
    ql.dbConn.sqlConnect(sql,[id],function(err,data){
        if(data!=undefined){
            resp.send(success());
        }else{
            resp.send(fail());
        }
    });
}

module.exports = {
    shoppingCart,
    showCart,
    deleteCart
}